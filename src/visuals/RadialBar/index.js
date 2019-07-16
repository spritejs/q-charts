import { Group, Arc } from 'spritejs'
import { BaseVisual } from '../../core'
import { flattern } from '../../util'

export class RadialBar extends BaseVisual {
  constructor(attrs = {}) {
    super(attrs)
    this.animators = []
  }

  get name() {
    return 'RadialBar'
  }

  getDefaultAttrs() {
    return {
      min: 0,
      max: 2,
      radius: 0.8,
      innerRadius: 0,
      startAngle: Math.PI * -0.5,
      endAngle: Math.PI * 1.5,
      lineWidth: 5,
      strokeBgcolor: '#f5f5f5'
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

  get center() {
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

  get innerRadius() {
    let { radius, innerRadius } = this.attr()
    return innerRadius <= 0 ? 0 : (this.maxOuterRadius / radius) * innerRadius
  }

  transform(data) {
    const { startAngle, endAngle, max, min, lineWidth } = this.attr()
    const total = max - min
    const angle = endAngle - startAngle
    const innerRadius = this.innerRadius
    const outerRadius = this.maxOuterRadius
    const arcOffset = 0.5
    const len = data.length
    const perRadius =
      ((outerRadius - innerRadius) * 2 -
        lineWidth * (lineWidth >= 5 ? 1 : len - 1)) /
      ((len * 2 - 1) * (1 + arcOffset))
    let value = null

    data.forEach((d, i) => {
      value = +d.__valueGetter__()

      d.pos = [outerRadius, outerRadius]
      d.anchor = [0.5, 0.5]
      d.lineWidth = lineWidth
      d.startAngle = startAngle
      d.endAngle = d.disabled
        ? startAngle
        : startAngle + (angle * value) / total
      d.innerRadius = innerRadius + i * (1 + arcOffset) * perRadius
      d.radius = d.innerRadius + 1 * perRadius
      d.strokeColor = this.color(i)

      const normalStyle = this.style('arc')(d, d.dataOrigin, d.index)

      Object.assign(d, normalStyle)
      d.lineCap = !d.disabled ? d.lineCap : 'butt' // round 会导致禁用后显示成一个原点
    })
    return data
  }

  beforeRender() {
    super.beforeRender()
    const startAngle = this.attr('startAngle')
    let data = flattern(this.getData())
    data = this.transform(data)
    this.animators = data.map(d => ({
      from: {
        startAngle,
        endAngle: startAngle
      },
      to: {
        startAngle,
        endAngle: d.endAngle
      }
    }))
    return data
  }

  beforeUpdate() {
    super.beforeUpdate()
    const { startAngle } = this.attr('')
    let data = flattern(this.getData())
    data = this.transform(data)
    this.animators = data.map((d, i) => {
      let prev = this.animators[i] ? this.animators[i].to : data[i - 1]

      if (!prev) {
        prev = {
          startAngle: startAngle,
          endAngle: startAngle
        }
      }

      return {
        from: {
          startAngle: prev.startAngle,
          endAngle: prev.endAngle
        },
        to: {
          startAngle: d.startAngle,
          endAngle: d.endAngle
        }
      }
    })
    return data
  }

  render(data = []) {
    const { strokeBgcolor } = this.attr('')

    return (
      <Group clipOverflow={false}>
        {data.map((d, i) => {
          return (
            <Group
              pos={this.center}
              size={[this.maxOuterRadius * 2, this.maxOuterRadius * 2]}
              clipOverflow={false}
            >
              <Arc
                {...d}
                startAngle={0}
                endAngle={Math.PI * 2}
                strokeColor={strokeBgcolor}
              />
              <Arc
                {...d}
                animation={this.resolveAnimation({
                  ...this.animators[i],
                  duration: 300,
                  delay: 0
                })}
                hoverState={this.style('arc:hover')(d, d.dataOrigin, d.index)}
              />
            </Group>
          )
        })}
      </Group>
    )
  }
}
