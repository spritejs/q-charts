import { Group, Ring } from 'spritejs'
import { BaseVisual } from '../../core'
import layout from './layout'
import { withGuide } from './guide'
import { withText } from './text'
import { flattern, axis, scaleLinear } from '../../util'

export class Pie extends BaseVisual {
  constructor(attrs = {}) {
    super(attrs)
    this.$rings = []
    this.sectors = []
  }

  get name() {
    const isRose = this.attr('rose')
    return isRose ? 'Rose' : 'Pie'
  }

  getDefaultAttrs() {
    return {
      radius: 0.8,
      innerRadius: 0,
      startAngle: Math.PI * -0.5,
      endAngle: Math.PI * 1.5,
      padAngle: 0,
      rose: false,
      translateOnClick: true
    }
  }

  get maxOuterRadius() {
    const { startAngle, endAngle, radius, size } = this.attr()
    const [width, height] = size

    if (endAngle - startAngle === Math.PI / 2) {
      return Math.min(width, height) * radius
    } else {
      return (Math.min(width, height) / 2) * radius
    }
  }

  get innerRadius() {
    let { radius, innerRadius } = this.attr()
    return innerRadius <= 0 ? 0 : (this.maxOuterRadius / radius) * innerRadius
  }

  get pos() {
    const { startAngle, endAngle, radius, size } = this.attr()
    const angle = (endAngle + startAngle) / 2
    const [width, height] = size
    const maxRadius = this.maxOuterRadius
    let [x, y] = [width / 2 - maxRadius, height / 2 - maxRadius]

    if (endAngle - startAngle === Math.PI / 2) {
      // 区分象限
      const cos = Math.cos(angle)
      const sin = Math.sin(angle)
      const maxWidth = radius * width
      const maxHeight = radius * height
      x += cos < 0 ? maxWidth / 2 : -(maxWidth / 2)
      y += sin < 0 ? maxHeight / 2 : -(maxHeight / 2)
    }

    return [x, y]
  }

  transform(data, nestData) {
    const { startAngle, endAngle, padAngle } = this.attr()

    const rings = (this.sectors = layout()
      .startAngle(startAngle)
      .endAngle(endAngle)
      .padAngle(padAngle)
      .value(d => +d.__valueGetter__())(data))

    const pos = this.pos
    const maxOuterRadius = this.maxOuterRadius
    const innerRadius = this.innerRadius
    const isRose = this.attr('rose')
    let outerRadiuses = [] // 分配给各个扇形的外半径

    if (isRose) {
      const ticks = axis({
        dataSet: nestData
      })

      const scale = scaleLinear()
        .domain([0, ticks[ticks.length - 1]])
        .range([innerRadius, maxOuterRadius])

      outerRadiuses = data.map(d =>
        scale(d.disabled ? 0 : +d.__valueGetter__())
      )
    } else {
      outerRadiuses = rings.map(() => maxOuterRadius)
    }

    rings.forEach((ring, i) => {
      ring.index = i
      ring.maxRadius = maxOuterRadius
      ring.outerRadius = outerRadiuses[i]
      ring.innerRadius = innerRadius
      ring.pos = pos
      ring.fillColor = this.color(i)
      ring.lineWidth = 0

      // ring.__patchParent__({ visual: 'pie', color: ring.fillColor })

      const normalState = this.style('sector')(
        ring,
        ring.dataOrigin,
        ring.index
      )

      Object.assign(ring, normalState)

      if (ring.disabled) {
        ring.lineWidth = 0
      }

      if (ring.lineWidth && ring.lineWidth >= 1) {
        // 避免只展示一个扇形时出现边框
        const { startAngle, endAngle } = ring
        const angle = (startAngle + endAngle) % (Math.PI * 1)

        if (angle <= 0 && rings.filter(ring => !ring.disabled).length <= 1) {
          ring.lineWidth = 0
        }
      }
    })

    return rings
  }

  beforeRender() {
    super.beforeRender()
    const nestData = this.getData()
    const data = flattern(nestData)

    const rings = (this.rings = this.transform(data, nestData))
    this.fromTos = rings.map((ring, i) => {
      return {
        from: {
          startAngle: ring.startAngle,
          endAngle: ring.startAngle
        },
        to: {
          startAngle: ring.startAngle,
          endAngle: ring.endAngle
        }
      }
    })

    return rings
  }

  beforeUpdate() {
    super.beforeUpdate()
    const nestData = this.getData()
    const data = flattern(nestData)
    const rings = this.rings
    const nextRings = this.transform(data, nestData)
    this.fromTos = nextRings.map((nextRing, i) => {
      let prev = rings[i] ? rings[i] : nextRings[i - 1]

      if (!prev) {
        prev = {
          startAngle: this.attr('startAngle'),
          endAngle: this.attr('startAngle')
        }
      }

      return {
        from: {
          startAngle: prev.disabled ? prev.endAngle : prev.startAngle,
          endAngle: prev.endAngle
        },
        to: {
          startAngle: nextRing.startAngle,
          endAngle: nextRing.endAngle
        }
      }
    })

    this.rings = nextRings
    return nextRings
  }

  getRing = (ring, i, el) => {
    if (!el) {
      return
    }

    this.$rings[i] = el

    if (el.isTranslatedByInitiativeClick) {
      // 主动点击导致扇形移动，将不会自动移回
      return
    }

    if (ring.selected && ring.endAngle > ring.startAngle) {
      if (!el.parentNode) {
        el.on('append', () => this.toggleTranslate(ring, null, el))
      } else {
        const isTranslated = el.isTranslated

        if (isTranslated) {
          el.isTranslated = false
        }

        this.toggleTranslate(ring, null, el)
      }
    } else if (!ring.selected && el.isTranslated) {
      this.toggleTranslate(ring, null, el)
    }
  }

  toggleTranslate = (attrs, evt, el) => {
    let isTranslated = el.isTranslated
    const offset = Math.max(20, attrs.maxRadius * 0.1)
    const { startAngle, endAngle } = attrs
    const angle = (startAngle + endAngle) / 2
    const translate = [offset * Math.cos(angle), offset * Math.sin(angle)]

    let target = el.parentNode

    if (target.attr('name') === 'pieRoot') {
      target = el
    }

    if (isTranslated) {
      target.transition(0.3).attr('translate', [0, 0])
      el.isTranslated = false
    } else {
      target.transition(0.3).attr('translate', translate)
      el.isTranslated = true
    }
  }

  render(rings = []) {
    const translateOnClick = this.attr('translateOnClick')
    const needChildren =
      this.style('guideLine')() ||
      this.style('guideText')() ||
      this.style('text')()

    const renderRing = (ring, i, from, to) => {
      return (
        <Ring
          ref={el => this.getRing(ring, i, el)}
          {...ring}
          animation={this.resolveAnimation({
            from,
            to,
            duration: 300,
            delay: 0
          })}
          actions={[
            {
              both: ['normal', 'hover'],
              action: {
                duration: 300
              }
            }
          ]}
          hoverState={this.style('sector:hover')(
            ring,
            ring.dataOrigin,
            ring.index
          )}
          onMouseenter={(evt, el) => {
            evt.stopDispatch()

            el.attr('state', 'hover')
          }}
          onMousemove={(evt, el) => {
            evt.stopDispatch()

            this.chart.setCanvasCursor('pointer')
            this.dataset.hoverData({
              data: {
                color: ring.fillColor,
                ...ring.dataOrigin
              },
              ...evt
            })
          }}
          onMouseleave={(evt, el) => {
            evt.stopDispatch()

            this.dataset.hoverData(null)
            el.attr('state', 'normal')
            this.chart.setCanvasCursor('default')
          }}
          onClick={(evt, el) => {
            evt.stopDispatch()
            if (translateOnClick) {
              el.isTranslatedByInitiativeClick = true // 主动点击
              this.toggleTranslate(ring, evt, el)
            }
          }}
        />
      )
    }

    return (
      <Group zIndex={100} enableCache={false} name="pieRoot">
        {rings.map((ring, i) => {
          const { from, to } = this.fromTos[i]
          return needChildren ? (
            <Group enableCache={false} clipOverflow={false} size={[1, 1]}>
              {renderRing(ring, i, from, to)}
              {withText(this, ring)}
              {withGuide(this, ring)}
            </Group>
          ) : (
            renderRing(ring, i, from, to)
          )
        })}
      </Group>
    )
  }
}
