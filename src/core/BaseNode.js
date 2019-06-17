import { Group } from 'spritejs'
import {
  convertPercent2Number,
  invariant,
  isArray,
  isString,
  isObject,
  isEqual,
  clone
} from '../util'
import Dataset from './dataset'
import { Global } from './Global'
import { render, patch, diff } from './vnode'
import { initAttr, attrMixin } from './mixins/attr'
import { initEvents, eventsMixin } from './mixins/event'
import { initLifecycle } from './mixins/lifecycle'

let timer = null
let commonAttrs = {
  animation: true, // 默认开启，可加入配置
  size: ['80%', '80%'],
  pos: ['10%', '10%'],
  layoutBy: 'row' // 配合 dataset 使用的数据模式，可选值：rows | cols
}

class BaseNode {
  constructor(attrs = {}) {
    initAttr(this)
    initEvents(this)
    initLifecycle(this)

    this.emit(this.lifecycle.beforeCreate, this)
    const defaultAttrs = this.getDefaultAttrs()
    this.attr(Object.assign({}, commonAttrs, defaultAttrs, attrs))
    this.data = null
    this.state = Object.create(null)
    this.$group = null
    this.__data__ = null
    this.__vnode__ = null
    this.__isRendered__ = false
    this.emit(this.lifecycle.created, this)
    this._colors = []
    this.$refs = Object.create(null)
  }

  resolveRef = ref => {
    return el => {
      this.$refs[ref] = el
    }
  }

  /**
   * 动画处理
   * @param {*} animation
   */
  resolveAnimation(animation) {
    const _animation = this.attr('animation')

    if (!_animation) {
      return { ...animation, duration: 0 } // 关掉动画
    } else {
      if (isObject(_animation)) {
        return Object.assign(animation, _animation)
      } else {
        return animation
      }
    }
  }

  /**
   * 连接到图表（chart）主体
   *
   * @param {*} chart
   * @memberof BaseNode
   */
  connectedCallback(chart) {
    this.chart = chart
  }

  /**
   * 组件配色方案
   * 1. 用户主动配色，如：legend.color(['red', 'blue', 'yellow'])
   * 3. 使用当前 Theme 为当前组件设置的配色方案
   * 4. 使用当前 Theme 配置的 chart 的配色方案
   * @param {*} i
   */
  color(i) {
    if (i != null && (isArray(i) || isString(i))) {
      // 用户主动配色
      if (isString(i)) {
        i = [i]
      }

      this._colors = i
    } else {
      // 当前组件需要取配色
      if (this._colors && !this._colors.length) {
        let name = this.name
        const currentTheme = Global.CURRENT_THEME
        let { colors } = (currentTheme && currentTheme[name]) || {}
        if (!colors) {
          colors = currentTheme.colors
        }
        this._colors = colors || []
      }

      /* eslint-disable eqeqeq */
      return i == undefined
        ? this._colors
        : this._colors[i] || this._colors[0] || '#ccc'
    }
  }

  /**
   * 设置数据源
   *
   * @param {*} data Array | Dataset
   * @returns
   * @memberof BaseNode
   */
  source(data) {
    let needUpdate = this.__isRendered__
    if (data instanceof Dataset) {
      this.dataset = data
    } else {
      this.data = data
    }
    needUpdate && this.update()
    return this
  }

  /**
   * 获取自身渲染所需数据
   *
   * @returns [data]
   * @memberof BaseNode
   */
  getData() {
    let data = null

    if (!this.data) {
      let layoutBy = this.attr('layoutBy')
      const names = Object.keys(this.dataset[layoutBy])
      data = this.dataset._selectDataByNames(names, layoutBy)
    } else {
      data = this.data
    }

    this.__data__ = clone(data)
    return data
  }

  shouldUpdate() {
    const prevData = this.__data__
    const nextData = this.getData()
    return !isEqual(prevData, nextData)
  }

  /**
   * 更新 $group pos、size 属性并保存到 this.attr
   *
   * @memberof BaseNode
   */
  _recalculateLayout() {
    const chartSize = this.chart.getSize()
    const calc = prop => {
      let __prop__ = this.attr(`___${prop}___`)
      if (!__prop__) {
        __prop__ = this.attr(prop)
      }
      let ret = null
      if (__prop__) {
        this.attr(`___${prop}___`, __prop__)
        ret = chartSize.map((v, i) => convertPercent2Number(__prop__[i], v))
      }
      if (ret) {
        this.attr(prop, ret)
        this.$group.attr(prop, ret)
      }
    }
    calc('pos')
    calc('size')
    this.$group.attr({
      boxSizing: 'border-box',
      padding: 0,
      zIndex: 2,
      clipOverflow: false
    })
  }

  /**
   * 组件状态更新，默认定时 16.7ms 更新
   *
   * @param {*} patch
   * @param {boolean} [immediate=false] 为 true 则立即更新
   * @memberof BaseNode
   */
  setState(patch, immediate = false) {
    clearTimeout(timer)
    this.state = Object.assign({}, this.state, patch)
    if (immediate) {
      this.update()
    } else {
      timer = setTimeout(() => this.update(), 16.7)
    }
  }

  beforeRender() {
    this._recalculateLayout()
  }

  rendered() {}

  beforeUpdate() {
    this._recalculateLayout()
  }

  update() {
    invariant(
      this.__vnode__,
      [
        `This componnet doesn't use jsx to render`,
        'You should override the update method!'
      ].join()
    )
    const data = this.beforeUpdate()
    this.__willUpdate__ = true
    const vnode = this.render(data)
    const patches = diff(this.__vnode__, vnode)
    patch(this.$group, patches, 0, true)
    this.__vnode__ = vnode
    this.__willUpdate__ = false
    this.updated()
  }

  updated() {}

  /**
   * 强制替换 $group 重新渲染
   *
   * @memberof BaseNode
   */
  forceUpdate() {
    invariant(
      this.chart && this.chart.$group,
      `This component hasn't connect to chart now!`
    )
    const attr = JSON.parse(JSON.stringify(this.$group.attr()))
    const $group = new Group(attr)
    this.chart.$group.replaceChild($group, this.$group)
    this.$group = $group
    const data = this.beforeUpdate && this.beforeUpdate()
    const vnode = this.render && this.render(data)
    $group.attr({ ...vnode.attrs })
    this.__vnode__ = vnode
    render(vnode.children, $group)
    this.updated()
  }
}

attrMixin(BaseNode)
eventsMixin(BaseNode)

export default BaseNode
