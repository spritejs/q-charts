import { Group, Sprite, Rect } from 'spritejs'
import { clone } from '../../util'
import { BaseVisual } from '../../core'
import layout from './layout'
import { withText } from './text'

export class Bar extends BaseVisual {
  constructor(attrs = {}) {
    super(attrs)
    this.$pillars = []
    this.chartSize = []
  }

  getDefaultAttrs() {
    return {
      type: 'Bar',
      stack: false,
      transpose: false,
      barWidth: 0,
      mouseDisabled: false
    }
  }

  get name() {
    return this.attr('type')
  }
  transform(data) {
    if (!data || data.length === 0) {
      return { barData: [], groupData: [] }
    }
    const dataLength = data.length > 1 ? data.length : data[0].length
    this.legendArr = Array.from({ length: data.length }, () => {
      return 1
    })
    const dataInfoObj = {
      data: data,
      barSize: this.attr('size'),
      barWidth: this.attr('barWidth'),
      stack: this.attr('stack'),
      transpose: this.attr('transpose')
    }
    const result = layout()(dataInfoObj)
    result.barData.forEach((bar, i) => {
      bar.fillColor = bar.fillColor || this.color(i % dataLength)
      bar.dataOrigin =
        data.length > 1
          ? clone(data[i % dataLength][Math.floor(i / dataLength)])
          : clone(data[Math.floor(i / dataLength)][i % dataLength])
      bar.index = i
      const normalState = this.style('pillar')(bar, bar.dataOrigin, bar.index)
      Object.assign(bar, normalState)
      bar.color = bar.fillColor
    })
    result.groupData.forEach((bar, i) => {
      bar.index = i
    })
    return result
  }

  beforeRender() {
    super.beforeRender()
    let data = this.getData()
    const result = this.transform(data)
    this.pillars = result.barData
    this.fromTos = this.pillars.map((pillar, i) => {
      return {
        from: {
          size: this.attr('transpose')
            ? [0, pillar.size[1]]
            : [pillar.size[0], 0]
        },
        to: {
          size: pillar.size
        }
      }
    })
    return result
  }

  beforeUpdate() {
    super.beforeUpdate()
    let data = this.getData()
    const pillars = this.pillars
    const newRenderData = this.transform(data)
    this.fromTos = newRenderData.barData.map((nextPillar, i) => {
      let prev = pillars[i] ? pillars[i] : newRenderData.barData[i - 1]
      if (!prev) {
        prev = {
          size: [0, 0],
          pos: nextPillar.pos,
          labelAttrs: null
        }
      }
      return {
        from: {
          size: prev.disable
            ? this.attr('transpose')
              ? [0, prev.size[1]]
              : [prev.size[0], 0]
            : prev.size,
          pos: prev.pos
        },
        to: {
          size: nextPillar.size,
          pos: nextPillar.pos
        },
        textFrom: {
          pos:
            prev.labelAttrs && prev.labelAttrs.pos
              ? prev.labelAttrs.pos
              : nextPillar.labelAttrs.pos
        },
        textTo: {
          pos: nextPillar.labelAttrs.pos
        }
      }
    })
    this.pillars = newRenderData.barData
    return newRenderData
  }

  showTooltip(evt, data) {
    evt.data = data
    this.dataset.hoverData({ ...evt, data: data })
  }

  hideTooltip() {
    this.dataset.hoverData(null)
  }

  render(data) {
    return (
      <Group zIndex={100}>
        {data.groupData.map((pillar, i) => {
          const normalState = this.style('backgroundPillar')(
            pillar,
            pillar.dataOrigin,
            pillar.index
          )
          if (normalState === false) {
            return
          }
          return (
            <Group>
              <Sprite
                {...pillar}
                {...normalState}
                hoverState={Object.assign(
                  { opacity: 0.05 },
                  this.style('backgroundpillar:hover')(
                    pillar,
                    pillar.dataOrigin,
                    pillar.index
                  )
                )}
                onMouseenter={(_, el) =>
                  !this.attr('mouseDisabled') && el.attr('state', 'hover')
                }
                onMousemove={(evt, el) => {
                  !this.attr('mouseDisabled') &&
                    this.showTooltip(evt, pillar.rects)
                }}
                onMouseleave={(evt, el) => {
                  if (!this.attr('mouseDisabled')) {
                    this.hideTooltip()
                    el.attr('state', 'normal')
                  }
                }}
              />
            </Group>
          )
        })}
        {data.barData.map((pillar, i) => {
          const { from, to } = this.fromTos[i]
          return (
            <Group>
              <Rect
                {...pillar}
                {...from}
                animation={this.resolveAnimation({
                  from,
                  to,
                  duration: 300,
                  delay: 0,
                  attrFormatter: attr => {
                    return Object.assign(attr, {
                      size: [Math.round(attr.size[0]), Math.round(attr.size[1])]
                    })
                  },
                  useTween: true
                })}
                hoverState={this.style('pillar:hover')(
                  pillar,
                  pillar.dataOrigin,
                  pillar.index
                )}
                onMouseenter={(_, el) =>
                  !this.attr('mouseDisabled') && el.attr('state', 'hover')
                }
                onMouseleave={(evt, el) => {
                  !this.attr('mouseDisabled') && el.attr('state', 'normal')
                }}
              />
              {withText(this, pillar)}
            </Group>
          )
        })}
      </Group>
    )
  }
}
