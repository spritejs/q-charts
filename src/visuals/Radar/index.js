import { Group, Polyline, Label, Circle } from 'spritejs'
import { BaseVisual } from '../../core'
import { isArray, isNumber } from '../../util/is'
import { hexToRgba } from '../../util/color'
import layout from './layout'
import { getSymbolAndStyle } from '../../util/pointSymbol'

export class Radar extends BaseVisual {
  constructor(attr = {}) {
    super(attr)
    this.$areaEl = []
    this.$pointEl = []
    this.$axisEl = []
    this.$gridEl = []
    this.$labelEl = []
    this.$scaleEl = []
    this.isUpdate = false
    // 网格背景数据备份，数据全部隐藏的时候显示上一个备份的数据
    this.lastGridAttr = []
  }

  get name() {
    return 'Radar'
  }

  getDefaultAttrs() {
    return {
      size: ['100%', '100%'],
      pos: [0, 0],
      padding: [0, 0, 0, 0],
      gridType: 'polygon', // 网格类型,polygon,circle
      splitNumber: 4, // 网格层次
      startAngle: 270, // 起始角度
      radius: 0.6, // 雷达图半径
      labelOffset: 7 // 文字偏移
    }
  }

  get padding() {
    const { padding } = this.attr()
    let [top, right, bottom, left] = [0, 0, 0, 0]
    if (isNumber(padding)) {
      top = right = bottom = left = padding
    } else if (isArray(padding)) {
      if (padding.length === 2) {
        top = bottom = padding[0]
        right = left = padding[1]
      } else {
        ;[top, right, bottom, left] = [...padding, 0, 0, 0, 0]
      }
    }
    return [top, right, bottom, left]
  }

  get center() {
    const { size } = this.attr()
    const [width, height] = size
    return [width / 2, height / 2]
  }

  get len() {
    const { radius } = this.attr()
    return Math.min(...this.center) * radius
  }

  _layout() {
    const dataSet = this.getData()
    // // FIXME 数据筛选之前先按照label进行排序?是否需要？
    const len = this.len
    const { splitNumber, startAngle, labelOffset } = this.attr()
    const { sectionAttrs, axisAttrs, gridAttrs } = layout(
      dataSet,
      len,
      splitNumber,
      startAngle,
      labelOffset
    )

    sectionAttrs.forEach((s, i) => {
      const color = this.color(i)
      const fillColor = hexToRgba(color, 0.3)
      s.strokeColor = color
      s.fillColor = fillColor
    })

    const sLen = sectionAttrs.length
    for (let i = sLen; i < this.$areaEl.length; i++) {
      this.$areaEl[i] = null
    }

    return { sectionAttrs, axisAttrs, gridAttrs }
  }

  getEl(index, el, type) {
    if (!el) {
      return
    }
    this[`$${type}El`][index] = el
  }

  showTooltip(evt, attr) {
    this.chart.setCanvasCursor('pointer')
    this.dataset.hoverData({
      data: { color: attr.fillColor, data: attr.dataOrigin },
      ...evt
    })
  }

  hideTooltip() {
    this.dataset.hoverData(null)
  }

  beforeUpdate() {
    super.beforeUpdate()
    this.isUpdate = true
    return this._layout()
  }

  beforeRender() {
    super.beforeRender()
    return this._layout()
  }

  update() {
    this.forceUpdate()
  }

  _getScaleAnimation(toScale) {
    return {
      from: { scale: 0 },
      to: { scale: toScale }
    }
  }

  _getStyle(type, attr, data, index) {
    return {
      style: this.style(type)(attr, data, index),
      hoverState: this.style(`${type}:hover`)(attr, data, index),
      onMouseenter: (_, el) => el.attr('state', 'hover'),
      onMouseleave: (evt, el) => {
        el.attr('state', 'normal')
        this.chart.setCanvasCursor('default')
      }
    }
  }

  _isSamePoints(fromPts, toPts) {
    if (fromPts.toString() === toPts.toString()) {
      return true
    }
    return false
  }

  _getPolylineAnimation(attr, index) {
    let newAttr = attr
    let animation = this._getScaleAnimation(1)
    // 更新的动画
    const preEl = this.$areaEl[index]
    if (preEl) {
      const { points: toPoints, ...other } = attr
      const { points } = preEl.attr()
      if (!this._isSamePoints(points, toPoints)) {
        animation = {
          from: { points },
          to: { points: toPoints },
          useTween: true
        }
        newAttr = other
      } else {
        animation = {}
      }
    }
    return { attr: newAttr, animation }
  }

  // 控制tooltip的显示与隐藏
  createBgGridEl(attr, GridShape) {
    return <GridShape
      {...attr}
      strokeColor={'transparent'}
      onMousemove={(evt, el) => {
        Promise.resolve().then(_ => {
          const targetSprites = evt.targetSprites
          if (targetSprites) {
            const targets = targetSprites.filter(e => e.attr('$elType') === 'section')
            const topEls = targets.sort((a, b) => b.attr('zIndex') - a.attr('zIndex'))
            if (topEls.length > 0) {
              this.$areaEl.forEach(e => {
                e && e.attr('state', 'normal')
              })
              topEls[0].attr('state', 'hover')
              this.showTooltip(evt, topEls[0].attr())
            } else {
              this.$areaEl.forEach(e => {
                if (e && e.attr('state') !== 'normal') {
                  e.attr('state', 'normal')
                }
              })
              this.hideTooltip()
              this.chart.setCanvasCursor('default')
            }
          }
        })
      }}
    />
  }

  renderGrid(gridAttrs) {
    if (gridAttrs.length !== 0) {
      this.lastGridAttr = gridAttrs
    } else {
      gridAttrs = this.lastGridAttr
    }
    const { gridType } = this.attr()
    let GridShape = Polyline
    let anchor = [0, 0]
    if (gridType === 'circle') {
      GridShape = Circle
      anchor = [0.5, 0.5]
    }
    const grids = gridAttrs.map((attr, i) => {
      const animation = this.isUpdate
        ? {}
        : this._getScaleAnimation(attr.scale)
      const { style, ...other } = this._getStyle('grid', attr, null, i)
      if (style === false) {
        return
      }
      return (
        <GridShape
          ref={el => this.getEl(i, el, 'grid')}
          anchor={anchor}
          {...attr}
          {...style}
          {...other}
          animation={this.resolveAnimation(animation)}
        />
      )
    })
    const bgGrid = this.createBgGridEl(gridAttrs[0], GridShape)
    grids.push(bgGrid)
    return grids
  }

  renderAxis(axisAttrs) {
    const animation = this.isUpdate ? {} : this._getScaleAnimation(1)
    return axisAttrs.map((attr, i) => {
      if (attr.disabled) {
        return
      }
      const { style, ...other } = this._getStyle(
        'axis',
        attr,
        { text: attr.label },
        i
      )
      if (style === false) {
        return
      }
      return (
        <Group clipOverflow={false} size={[1, 1]}>
          <Polyline
            ref={el => this.getEl(i, el, 'axis')}
            {...attr}
            {...style}
            {...other}
            animation={this.resolveAnimation(animation)}
          />
          {this._renderAxisLabel(attr, i)}
          {this._renderAxisScale(attr, i)}
        </Group>
      )
    })
  }

  _renderAxisLabel(attrs, i) {
    const calcAnchor = radian => {
      const x = 0.5 - Math.cos(radian)
      const y = 0.5 - Math.sin(radian)
      return [x, y]
    }
    const { label, labelPos, radian } = attrs
    const anchor = calcAnchor(radian)
    const attr = {
      text: label,
      pos: labelPos,
      color: '#67728C',
      radian,
      anchor,
      font: '12px 宋体'
    }
    const animation = this.isUpdate ? {} : this._getScaleAnimation(1)
    const { style, ...other } = this._getStyle(
      'label',
      attr,
      { text: attr.label, radian },
      i
    )
    if (style === false) {
      return
    }
    return (
      <Label
        ref={el => this.getEl(i, el, 'label')}
        {...attr}
        {...style}
        {...other}
        animation={this.resolveAnimation(animation)}
      />
    )
  }

  _renderAxisScale(attrs, index) {
    const getPt = attrs => {
      const { points, splitNumber, maxScale } = attrs
      const [x, y] = points[1]
      const perNum = maxScale / splitNumber
      return [[x / splitNumber, y / splitNumber], perNum]
    }
    const [[perX, perY], perNum] = getPt(attrs)
    let labels = []
    const display = index === 0 ? 'block' : 'none'
    const common = {
      font: '12px "宋体"',
      anchor: [1, 0.5],
      translate: [-5, 0],
      display
    }
    for (let i = 0; i < attrs.splitNumber + 1; i++) {
      let point = [perX * i, perY * i]
      let text = perNum * i
      let attr = {
        text,
        color: '#67728C',
        pos: point,
        ...common
      }
      const { style, ...other } = this._getStyle(
        'scale',
        attr,
        { text, index },
        i
      )
      if (style === false) {
        return
      }
      if (attr.display !== 'none') {
        const elIndex = index * attrs.splitNumber + i
        const preEl = this.$scaleEl[elIndex]
        let animation = this.isUpdate ? {} : {
          from: { pos: [0, 0] },
          to: { pos: point }
        }
        if (preEl) {
          const { text: preText } = preEl.attr()
          const numText = Number(preText)
          if (numText !== text) {
            animation = {
              from: { text: numText },
              to: { text },
              attrFormatter: (attr) => {
                attr.text = attr.text.toFixed(0)
                return attr
              },
              useTween: true
            }
          }
        }
        labels.push(
          <Label
            ref={el => this.getEl(elIndex, el, 'scale')}
            {...attr}
            {...style}
            {...other}
            animation={this.resolveAnimation(animation)}
          />
        )
      }
    }
    return labels
  }

  renderSection(sectionAttrs) {
    return sectionAttrs
      .map((attr, i) => {
        if (attr.disabled) {
          this.$areaEl[i] = null
          return
        }
        const { animation } = this._getPolylineAnimation(attr, i)
        const { style, hoverState, ...other } = this._getStyle(
          'section',
          attr,
          { ...attr.dataOrigin },
          i
        )
        if (style === false) {
          return
        }
        let hoverStyle = hoverState
        if (!hoverState) {
          hoverStyle = {}
          const { lineWidth = 1 } = attr
          hoverStyle.lineWidth = lineWidth + 1
        }
        return (
          <Polyline
            ref={el => this.getEl(i, el, 'area')}
            zIndex={9 + i}
            animation={this.resolveAnimation(animation)}
            {...attr}
            {...style}
            hoverState={hoverStyle}
            {...other}
          />
        )
      })
  }

  renderPoints(sectionAttrs) {
    const allPoints = sectionAttrs.map((attrs, index) => {
      if (attrs.disabled) {
        return
      }
      const { points, dataOrigin, strokeColor } = attrs
      let prePoints
      if (this.$areaEl[index]) {
        prePoints = this.$areaEl[index].attr().points
      }
      return points.map((point, i) => {
        let attr = {
          fillColor: strokeColor,
          strokeColor,
          radius: 3,
          dataOrigin: dataOrigin[i],
          anchor: [0.5, 0.5]
        }
        let animation = {
          from: { pos: [0, 0] },
          to: { pos: point }
        }
        if (prePoints && prePoints[i]) {
          if (!this._isSamePoints(prePoints[i], point)) {
            animation.from.pos = prePoints[i]
            animation.useTween = true
          } else {
            animation = {}
            attr.pos = point
          }
        }
        const style = this.style('point')(attr, { ...attr.dataOrigin }, i)
        if (style === false) {
          return
        }
        const hStyle = this.style('point:hover')(attr, attr.dataOrigin, i)
        const { PointSymbol, normalStyle, hoverStyle } = getSymbolAndStyle(style, hStyle)
        return (
          <PointSymbol
            ref={el => this.getEl(index * sectionAttrs.length + i, el, 'point')}
            {...{ ...attr, $elType: 'point' }}
            animation={this.resolveAnimation(animation)}
            {...normalStyle}
            hoverState={hoverStyle}
            onMouseenter={(_, el) => {
              el.attr('state', 'hover')
            }}
            onMouseleave={(evt, el) => {
              el.attr('state', 'normal')
            }}
          />
        )
      })
    })

    return allPoints.reduce((pre, cur) => pre.concat(cur), [])
  }

  render({ sectionAttrs, axisAttrs, gridAttrs }) {
    const center = this.center
    const padding = this.padding
    const { size } = this.attr()
    return (
      <Group size={size} padding={padding} zIndex={100} clipOverflow={false}>
        <Group pos={center} clipOverflow={false}>
          {this.renderGrid(gridAttrs)}
          {this.renderAxis(axisAttrs)}
          {this.renderSection(sectionAttrs)}
          {this.renderPoints(sectionAttrs)}
        </Group>
      </Group >
    )
  }
}
