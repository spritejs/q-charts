import { Group, Polyline, Label } from 'spritejs'
import { BaseVisual } from '../../core'
import { isArray, isNumber } from '../../util/is'
import { scaleLinear } from '../../util/q-scale'
import { hexToRgba } from '../../util/color'
import { getSymbolAndStyle } from '../../util/pointSymbol'
import layout from './layout'

export class Scatter extends BaseVisual {
  constructor(attr = {}) {
    super(attr)
    this.$scatterEl = {}
    this.$guideLineEl = []
    this._attr = attr
  }

  getDefaultAttrs() {
    return {
      labelField: null,
      areaField: null,
      areaRange: null,
      showGuideLine: false,
      layoutWay: null
    }
  }

  get name() {
    return 'Scatter'
  }

  get padding() {
    const { padding = [0, 0, 0, 0] } = this.attr()
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

  _layout() {
    const dataSet = this.getData()
    const dataAttr = this.dataset._attrs
    const { size } = this.attr()
    const layoutWay = this._attr.layoutWay
    const { data, layoutWay: newLayoutWay } = layout(dataSet, dataAttr, size, layoutWay)
    this.attr('layoutWay', { ...layoutWay, ...newLayoutWay })
    data.forEach((d, i) => {
      const color = this.color(i)
      const fillColor = hexToRgba(color, 0.3)
      d.forEach(di => {
        di.strokeColor = color
        di.fillColor = fillColor
      })
    })
    return data
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
      data: { color: attr.fillColor, ...attr.dataOrigin },
      ...evt
    })
    const { showGuideLine } = this.attr()
    if (showGuideLine) {
      const { x, y } = evt
      const { size } = this.attr()
      const [offsetX, offsetY] = this.$group.pointToOffset(x, y).map(Math.round)
      this.$guideLineEl.forEach((el, index) => {
        const style = this.style('guideline')(index)
        if (style === false) {
          return
        }
        el.attr(style)
        const points = index === 0 ? [[0, offsetY], [size[0], offsetY]] : [[offsetX, 0], [offsetX, size[1]]]
        el.attr('points', points)
      })
    }
  }

  hideTooltip() {
    this.dataset.hoverData(null)
    const { showGuideLine } = this.attr()
    if (showGuideLine) {
      this.$guideLineEl.forEach(el => el.attr('points', [[0, 0], [0, 0]]))
    }
  }

  beforeUpdate() {
    super.beforeUpdate()
    return this._layout()
  }

  beforeRender() {
    super.beforeRender()
    this.$scatterEl = {}
    return this._layout()
  }

  update() {
    this.forceUpdate()
  }

  getRealRadius(attr) {
    const { areaRange, areaField } = this.attr()
    const { radius, dataOrigin } = attr
    if (!areaField || !dataOrigin.hasOwnProperty(areaField)) {
      return radius
    }
    if (!areaRange) {
      return dataOrigin[areaField]
    }
    const allData = this.dataset.dataOrigin.map(d => d[areaField]).sort((a, b) => a - b)
    const linear = scaleLinear().domain([allData[0], allData[allData.length - 1]]).range(areaRange)
    const realArea = linear(dataOrigin[areaField])
    return realArea
  }

  renderLabel(attr, normalStyle, animation, i) {
    const { labelField } = this.attr()
    const dataOrigin = attr.dataOrigin
    const style = this.style('label')(attr, { ...attr.dataOrigin }, i)
    if (style === false) {
      return
    }
    if ((labelField && dataOrigin.hasOwnProperty(labelField)) || style) {
      const { strokeColor, ...other } = attr
      const { size, lineWidth = 0 } = normalStyle
      const text = dataOrigin[labelField]
      const renderText = (style && style.text) || text
      const ctx = this.chart.layer.context
      const textWidth = ctx.measureText(renderText).width
      let translate = [0, 0]
      if (size * 2 - lineWidth < textWidth * 1.3) {
        translate[1] = size + lineWidth + 10
      }
      return <Label
        {...{ ...other, fillColor: strokeColor, text, translate, anchor: [0.5, 0.5], fontSize: '12px' }}
        animation={this.resolveAnimation(animation)}
        {...style}
        hoverState={this.style('label:hover')(attr, attr.dataOrigin, i)}
        onMouseenter={(_, el) => {
          el.attr('state', 'hover')
        }}
        onMouseleave={(evt, el) => {
          el.attr('state', 'normal')
        }} />
    }
  }

  renderGuideLine() {
    const guildLine = []
    const attr = {
      points: [[0, 0], [0, 0]],
      strokeColor: '#ddd',
      lineWidth: 1
    }
    for (let i = 0; i < 2; i++) {
      const guideLineType = i === 0 ? 'horizontal' : 'vertical '
      guildLine.push(
        <Polyline
          ref={el => this.getEl(i, el, 'guideLine')}
          {...attr}
          guideLineType={guideLineType}
          translate={[0.5, 0.5]}
        />
      )
    }
    return guildLine
  }

  renderScatter(data) {
    const { row } = this.dataset._attrs
    const scatters = data.map((attrs, index) => {
      return attrs.map((attr, i) => {
        const rowName = row ? attr.dataOrigin[row] : '*'
        const elIndex = `${rowName}${i}`
        if (attr.disabled) {
          this.$scatterEl[elIndex] = null
          return
        }
        // 根据用户设置的面积字段获得半径
        let radius = this.getRealRadius(attr)
        let style = this.style('point')(attr, { ...attr.dataOrigin }, i)
        if (style === false) {
          return
        }
        style = { size: radius, ...style }
        let hStyle = this.style('point:hover')(attr, attr.dataOrigin, i)
        if (!hStyle) {
          hStyle = { size: attr.radius + 1 }
          if (style) {
            if (isNumber(style.scale)) {
              hStyle.scale = style.scale * 1.2
            } else if (isNumber(style.size)) {
              hStyle.size = style.size * 1.2
            } else if (isArray(style.size)) {
              hStyle.size = style.size.map(s => s * 1.2)
            }
          }
        }
        const { PointSymbol, normalStyle, hoverStyle } = getSymbolAndStyle(style, hStyle)
        const preEl = this.$scatterEl[elIndex]
        let animation = {
          from: { scale: 0 },
          to: { scale: 1 }
        }
        if (preEl) {
          const pos = preEl.attr('pos')
          if (pos.toString() !== attr.pos.toString()) {
            animation = {
              from: { pos },
              to: { pos: attr.pos }
            }
          } else {
            animation = {}
          }
        }
        return <Group clipOverflow={false}>
          <PointSymbol
            ref={el => this.getEl(elIndex, el, 'scatter')}
            animation={this.resolveAnimation(animation)}
            {...attr}
            {...normalStyle}
            hoverState={hoverStyle}
            onMouseenter={(_, el) => {
              el.attr('state', 'hover')
            }}
            onMousemove={(evt, el) => {
              this.showTooltip(evt, { ...attr }, el)
            }}
            onMouseleave={(evt, el) => {
              el.attr('state', 'normal')
              this.hideTooltip()
              this.chart.setCanvasCursor('default')
            }} />
          {this.renderLabel(attr, normalStyle, animation, index)}
        </Group>
      })
    })
    return scatters.reduce((pre, cur) => {
      return pre.concat(cur)
    }, [])
  }

  render(data) {
    const { size } = this.attr()
    const padding = this.padding
    return (
      <Group size={size} padding={padding} zIndex={100} clipOverflow={false}>
        {
          this.renderScatter(data)
        }
        {
          this.renderGuideLine()
        }
      </Group>
    )
  }
}
