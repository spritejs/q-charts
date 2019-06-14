import { Group, Polygon, Label } from 'spritejs'
import { clone, isBoolean } from '../../util'
import { BaseVisual } from '../../core'
import layout from './layout'
import { withGuide } from './guide'

export class Funnel extends BaseVisual {
  constructor(attrs = {}) {
    super(attrs)
    this.$polygons = []
  }

  getDefaultAttrs() {
    return {
      formatter: k => k.__textGetter__() || k,
      type: 'Funnel',
      align: 'center',
      pyramid: false
    }
  }
  get name() {
    return this.attr('type')
  }
  transform(data) {
    const dataLength = data && data.length > 1 ? data.length : data[0].length
    this.legendArr = Array.from({ length: data.length }, () => {
      return 1
    })
    const dataInfoObj = {
      data: data,
      size: this.attr('size'),
      align: this.attr('align'),
      pyramid: this.attr('pyramid')
    }
    const result = layout()(dataInfoObj)
    result.forEach((plg, i) => {
      plg.align = this.attr('align')
      plg.pyramid = this.attr('pyramid')
      plg.fillColor = plg.bgcolor || this.color(i % dataLength)
      plg.dataOrigin =
        data.length > 1
          ? clone(data[i % dataLength][Math.floor(i / dataLength)])
          : clone(data[Math.floor(i / dataLength)][i % dataLength])
      plg.index = i
      const normalState = this.style('polygon')(plg, plg.dataOrigin, plg.index)
      Object.assign(plg, normalState)
    })
    return result
  }

  beforeRender() {
    super.beforeRender()
    let data = this.getData()
    const result = this.transform(data)
    this.polygons = result
    this.fromTos = this.polygons.map((plg, i) => {
      return {
        from: {
          points:
            plg.points.length === 4
              ? [plg.points[3], plg.points[2], plg.points[2], plg.points[3]]
              : [plg.points[2], plg.points[2], plg.points[2]]
        },
        to: {
          points: plg.points
        }
      }
    })
    return result
  }

  beforeUpdate() {
    super.beforeUpdate()
    let data = this.getData()
    const polygons = this.polygons
    const newRenderData = this.transform(data)
    this.fromTos = newRenderData.map((nextPolygon, i) => {
      let prev = polygons[i] ? polygons[i] : newRenderData[i - 1]
      if (!prev) {
        prev = {
          points: nextPolygon.points,
          labelAttrs: null
        }
      }
      return {
        from: {
          points: prev.points
        },
        to: {
          points: nextPolygon.points
        },
        textFrom: {
          pos:
            prev.labelAttrs && prev.labelAttrs.pos
              ? prev.labelAttrs.pos
              : nextPolygon.labelAttrs.pos
        },
        textTo: {
          pos: nextPolygon.labelAttrs.pos
        }
      }
    })
    this.polygons = newRenderData
    return newRenderData
  }

  showTooltip(evt, data) {
    evt.data = data
    this.dataset.hoverData({ ...evt, data: data })
  }

  hideTooltip() {
    this.dataset.hoverData(null)
  }

  withText(attrs) {
    let { labelAttrs, dataOrigin, index } = attrs
    if (attrs.disabled) {
      return
    }
    const textStyle = this.style('text')(attrs, dataOrigin, index)
    if (textStyle === false) {
      return
    }
    let { textFrom, textTo } = this.fromTos[index]
    return (
      <Label
        {...labelAttrs}
        {...(isBoolean(textStyle) ? {} : textStyle)}
        {...textFrom}
        animation={this.resolveAnimation({
          from: textFrom,
          to: textTo,
          duration: 300,
          delay: 0,
          useTween: true
        })}
        onMousemove={(evt, el) =>
          !this.attr('mouseDisable') && el.attr('state', 'hover')
        }
        onMouseleave={(evt, el) =>
          !this.attr('mouseDisable') && el.attr('state', 'normal')
        }
        hoverState={this.style('text:hover')(
          attrs,
          attrs.dataOrigin,
          attrs.index
        )}
      />
    )
  }

  render(data) {
    return (
      <Group>
        {data.map((polygon, i) => {
          const { from, to } = this.fromTos[i]
          return (
            <Group clipOverflow={false}>
              <Polygon
                {...polygon}
                {...from}
                animation={this.resolveAnimation({
                  from,
                  to,
                  duration: 300,
                  delay: 0,
                  useTween: true
                })}
                hoverState={Object.assign(
                  {},
                  this.style('polygon:hover')(
                    polygon,
                    polygon.dataOrigin,
                    polygon.index
                  )
                )}
                onMouseenter={(_, el) =>
                  !this.attr('mouseDisable') && el.attr('state', 'hover')
                }
                onMousemove={(evt, el) => {
                  !this.attr('mouseDisable') &&
                    this.showTooltip(
                      evt,
                      Object.assign(
                        { color: polygon.fillColor },
                        polygon.dataOrigin
                      )
                    )
                }}
                onMouseleave={(evt, el) => {
                  if (!this.attr('mouseDisable')) {
                    this.hideTooltip()
                    el.attr('state', 'normal')
                  }
                }}
              />
              {this.withText(polygon)}
              {withGuide(this, polygon, this.attr('formatter'))}
            </Group>
          )
        })}
      </Group>
    )
  }
}
