import { Group } from 'spritejs'
import { isArray, getGlobal, invariant } from '../../util'
import BaseNode from '../BaseNode'
import { BaseVisual } from '../BaseVisual'
import { render } from '../vnode'
import Dataset from '../dataset'
import { Plot } from './Plot'
import { Global } from '../Global'

const global = getGlobal()
const defaultTheme = 'default'
const _plot = Symbol('plot')
const _initPlot = Symbol('initPlot')
const _mountToPlot = Symbol('mountToPlot')
const _addChild = Symbol('addChild')
const _renderChild = Symbol('renderChild')

export class Chart extends BaseNode {
  constructor(attrs = {}) {
    super(attrs)
    this.emit(this.lifecycle.beforeCreate)
    this[_plot] = null
    this[_initPlot](this.attr())
    this[_mountToPlot]()
    this.setTheme(defaultTheme) // defaultTheme
    this.dataset = null
    this.visuals = []
    this.plugins = []
    this.children = []
    this.Global = Global
    delete this.state
    delete this.__vnode__
    this.emit(this.lifecycle.created)
  }

  getDefaultAttrs() {
    return {
      pos: [0, 0],
      size: ['100%', '100%'],
      forceFit: true,
      zoomable: false
    }
  }

  [_initPlot](attrs) {
    const $ = node =>
      typeof node === 'string'
        ? global.document
          ? global.document.querySelector(node)
          : node
        : node
    this.domElement = $(attrs.container)
    invariant(this.domElement, `Need a domNode to render chart!`)
    let plot = Global.PLOT_INSTANCES.get(this.domElement)

    if (!plot) {
      plot = new Plot({ ...attrs, container: this.domElement })
      Global.PLOT_INSTANCES.set(this.domElement, plot)
    }

    this[_plot] = plot
    this[_plot].addChart(this)
    this.canvas = plot.canvas
  }

  [_mountToPlot]() {
    const pos = this.attr('pos')
    const size = this.attr('size')
    const group = this[_plot].subPlot(pos, size)
    this.$group = group
    this.attr('size', this.$group.attr('size'))
    this.attr('pos', this.$group.attr('pos'))
  }

  setTheme(name) {
    const target = Global.THEMES.get(name)
    invariant(target, `Unknown theme type! Register it first!`)
    // Object.keys(target).forEach(key => this.style(key, target[key]))
    Global.useTheme(name)
    this.__isRendered__ && this.emit('theme:change', target)
    if (this.$group) {
      this.$group.attr(this.style('Chart')() || {})
    }
  }

  resolveTheme(name) {
    return Global.CURRENT_THEME[name] || this.style(name)()
  }

  setCanvasCursor(type = 'default') {
    this.canvas.style.cursor = type
  }

  getSize() {
    return this.$group.attr('size')
  }

  getPos() {
    return this.$group.attr('pos')
  }

  source(data, options = {}) {
    if (this.dataset) {
      this.dataset.source(data, options)
      this.update()
    } else {
      let dataset = null
      if (!(data instanceof Dataset)) {
        dataset = new Dataset()
        dataset.source(data, options)
      } else {
        dataset = data
      }
      this.dataset = dataset
    }
    return this
  }

  [_addChild](instance) {
    if (!instance) {
      return
    }

    instance.connectedCallback && instance.connectedCallback(this)

    if (instance instanceof BaseVisual) {
      this.visuals.push(instance)
    } else {
      this.plugins.push(instance)
    }

    this.children.push(instance)

    return this
  }

  add(instance) {
    if (isArray(instance)) {
      instance.map(this[_addChild].bind(this))
    } else {
      this[_addChild](instance)
    }

    return this
  }

  getChildren() {
    return [].concat(this.plugins, this.visuals)
  }

  [_renderChild](child) {
    invariant(child.render, `Chart need a instance which has render method!`)
    invariant(
      this.dataset,
      `The chart can't render because havn't source data!`
    )

    if (!child.dataset) {
      child.dataset = this.dataset
    }

    this.dataset.addDep(child)
    const $group = new Group()
    this.$group.appendChild($group)
    child.$group = $group

    const data = child.beforeRender && child.beforeRender()
    const vnode = child.render && child.render(data)

    $group.attr({ ...vnode.attrs })

    child.__vnode__ = vnode
    render(vnode.children, $group)
    child.__isRendered__ = true
    child.rendered()
  }

  render() {
    invariant(
      !this.__isRendered__,
      `The chart is rendered! Do not invoke chart.render many a time!`
    )
    this.emit(this.lifecycle.beforeRender, this)
    void this.children.map(this[_renderChild].bind(this))
    this.emit(this.lifecycle.rendered, this)
    this.__isRendered__ = true
  }

  update() {
    this.attr('size', this.$group.attr('size'))
    this.attr('pos', this.$group.attr('pos'))
    this.emit(this.lifecycle.beforeUpdate, this)
    void this.children.map(child => child.update())
    this.emit(this.lifecycle.updated, this)
  }

  destroy() {
    this.emit(this.lifecycle.beforeDestroy, this)
    this[_plot].plots.pop()
    this.$group.parentNode.removeChild(this.$group)
    this.emit(this.lifecycle.destroyed, this)
  }

  save(fileName = 'qcharts', type = 'image/png') {
    invariant(
      !!global.document,
      `In current platform, the chart can't save to a image!`
    )

    const dataURL = this.canvas
      .toDataURL(type)
      .replace(type, 'image/octet-stream')

    const aLink = document.createElement('a')
    aLink.style.position = 'fixed'
    aLink.style.zIndex = -9999
    document.body.appendChild(aLink)
    const evt = document.createEvent('HTMLEvents')
    evt.initEvent('click', false, false)
    aLink.download = /\.\w+/.test(fileName)
      ? fileName
      : fileName + '.' + type.split('/')[1]
    aLink.href = dataURL

    aLink.dispatchEvent(evt)
    aLink.click()
    document.body.removeChild(aLink)
  }
}
