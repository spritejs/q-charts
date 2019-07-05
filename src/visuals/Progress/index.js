import { Group, Arc, Wave, Label } from 'spritejs'
import { BaseVisual } from '../../core'
import { flattern, isArray, requestAnimationFrame, cancelAnimationFrame } from '../../util'

export class Progress extends BaseVisual {
  constructor(attrs = {}) {
    super(attrs)
    this.$label = null
    this.animations = []
    this.timers = []
    this.__hasFixRadiusByLabel = false
  }

  getDefaultAttrs() {
    return {
      min: 0,
      max: 1,
      hoverBg: '#f8f8f8',
      offset: 10,

      type: 'pie',
      startAngle: 0,
      endAngle: Math.PI * 2,
      strokeBgcolor: '#ccc',

      lineWidth: 10,
      padding: 5,

      label: true,
      labelPosition: 'bottom',
      formatter: d => d
    }
  }

  transform(data) {
    let {
      min,
      max,
      padding,
      offset,
      lineWidth,
      size,
      labelPosition,
      startAngle,
      endAngle,
      type
    } = this.attr()
    const total = max - min

    // 需要注意的是：文字会占去一部分宽高，所以需要根据文字宽高进行一次修正
    // 而文字只有渲染以后才能获取到宽高
    const labelSize = (this.$label && this.$label.contentSize) || [0, 0]
    let width = Math.min(size[0], size[1])

    if (labelPosition === 'top' || labelPosition === 'bottom') {
      width -= Math.ceil(labelSize[1])
    } else {
      width -= Math.ceil(labelSize[0])
    }

    this.chart.layer.prepareRender().then(() => {
      if (this.$label && !this.__hasFixRadiusByLabel) {
        this.update()
        this.__hasFixRadiusByLabel = this.$label.contentSize.every(v => v > 0)
      }
    })

    const margin = padding + lineWidth + offset // wave 内部圆环外边距
    const len = data.length
    let radius = (width / len - margin * 2) / 2

    if (radius <= 0) {
      radius = offset + 1
    }

    let innerRadius = radius - offset

    return data.map((d, i) => {
      const value = d.__valueGetter__()
      const color = this.color(i)
      const percent = d.disabled
        ? 0
        : isArray(value)
          ? value.map(v => v / total)
          : value / total

      const attrs = {
        ...d,
        anchor: [0.5, 0.5],
        color,
        radius,
        maxRadius: radius,
        outerRadius: radius,
        innerRadius,
        offset,
        lineWidth
      }

      return type === 'pie'
        ? isArray(percent)
          ? percent.reduce((a, c, i) => {
            let sa = i === 0 ? startAngle : a[i - 1].endAngle
            let ea = sa + (endAngle - startAngle) * c + startAngle
            a.push(
              Object.assign({ startAngle: sa, endAngle: ea }, attrs, {
                color: this.color(i),
                fillColor: this.color(i)
              })
            )
            return a
          }, [])
          : {
            startAngle,
            endAngle: (endAngle - startAngle) * percent + startAngle,
            ...attrs
          }
        : {
          ...attrs,
          percent,
          wavesColor: isArray(value)
            ? value.map((_, j) => this.color(j))
            : color,
          outlineColor: color
        }
    })
  }

  handleData() {
    const type = this.attr('type')
    const data = flattern(this.getData())
    const ret = this.transform(data)

    this.animations = ret.map((d, i) => ({
      from:
        (this.animations[i] && this.animations[i].to) ||
        (type !== 'pie'
          ? {
            percent: isArray(d.percent) ? d.percent.map(_ => 0) : 0
          }
          : isArray(d)
            ? d.map((t, i) =>
              i === 0
                ? { startAngle: t.startAngle, endAngle: t.startAngle }
                : { startAngle: d[i - 1].endAngle, endAngle: t.startAngle }
            )
            : {
              startAngle: d.startAngle,
              endAngle: d.startAngle
            }),
      to:
        type !== 'pie'
          ? { percent: d.percent }
          : isArray(d)
            ? d.map(t => ({ startAngle: t.startAngle, endAngle: t.endAngle }))
            : { startAngle: d.startAngle, endAngle: d.endAngle }
    }))

    return ret
  }

  beforeRender() {
    super.beforeRender()
    return this.handleData()
  }

  beforeUpdate() {
    super.beforeUpdate()
    return this.handleData()
  }

  renderWave(d, i) {
    const animate = el => {
      if (!d.disabled) {
        cancelAnimationFrame(this.timers[i])
        let speed = 0
        const step = () => {
          speed += 0.1
          el.attr('speed', speed)
          this.timers[i] = requestAnimationFrame(step)
        }
        this.timers[i] = requestAnimationFrame(step)
      } else {
        this.timers[i] = requestAnimationFrame(() => {
          cancelAnimationFrame(this.timers[i])
        })
      }
    }

    return (
      <Wave
        {...d}
        {...this.style('normal')(d, d.dataOrigin, i)}
        {...(d.disabled
          ? {
            wavesColor: isArray(d.percent)
              ? d.percent.map(_ => '#ccc')
              : '#ccc',
            outlineColor: '#ccc'
          }
          : {})}
        hoverState={this.style('hover')(d, d.dataOrigin, i)}
        anchor={[0.5, 0.5]}
        percent={d.percent}
        ref={el => animate(el)}
        animation={{ ...this.animations[i], duration: 300 }}
      />
    )
  }

  renderPies(d, i, data) {
    const { startAngle, endAngle, strokeBgcolor } = this.attr()

    let onlyOne = false

    if (!isArray(d)) {
      d = [d]
      onlyOne = true
    }

    const radius = d[0].radius

    return (
      <Group border={[1, 'transparent']} clipOverflow={false}>
        <Arc
          {...d[0]}
          startAngle={startAngle}
          endAngle={endAngle}
          color={strokeBgcolor}
          pos={[radius, radius]}
        />
        {d.map((t, j) => (
          <Arc
            {...t}
            {...this.style('normal')(d[0], d[0].dataOrigin, i)}
            pos={[radius, radius]}
            zIndex={j + 1}
            endAngle={t.endAngle}
            animation={{
              ...(onlyOne
                ? isArray(this.animations[i])
                  ? this.animations[i][0]
                  : this.animations[i]
                : this.animations[i][j]),
              duration: 300
            }}
          />
        ))}
      </Group>
    )
  }

  renderChildren(d, i, data, labelPosition) {
    const type = this.attr('type')
    const components = [].concat(
      type === 'pie'
        ? [this.renderPies(d, i, data)]
        : [this.renderWave(d, i, data)],
      [
        this.attr('label') ? (
          <Label
            ref={el => (this.$label = el)}
            {...this.style('label')(d, d.dataOrigin, i)}
            hoverState={this.style('label:hover')(d, d.dataOrigin, i)}
            text={this.attr('formatter')(d.dataOrigin || d)}
            margin={5}
          />
        ) : null
      ]
    )

    return labelPosition === 'top' || labelPosition === 'left'
      ? components.reverse()
      : components
  }

  render(data) {
    const { hoverBg, labelPosition, size } = this.attr()
    const len = data.length

    return (
      <Group zIndex={-1}>
        {data.map((d, i) => {
          return (
            <Group
              size={[size[0] / len, size[1]]}
              clipOverflow={false}
              x={(i * size[0]) / len}
              height={size[1]}
              flex={1}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              flexDirection={
                labelPosition === 'top' || labelPosition === 'bottom'
                  ? 'column'
                  : 'row'
              }
              bgcolor={'transparent'}
              hoverState={{ bgcolor: hoverBg }}
              onMouseenter={(_, el) => {
                this.chart.setCanvasCursor('pointer')
                el.attr('state', 'hover')
              }}
              onMousemove={evt =>
                this.dataset.hoverData({
                  ...evt,
                  data: { ...d.dataOrigin, color: d.color }
                })
              }
              onMouseleave={(_, el) => {
                this.chart.setCanvasCursor('default')
                this.dataset.hoverData(null)
                el.attr('state', 'normal')
              }}
            >
              {this.renderChildren(d, i, data, labelPosition)}
            </Group>
          )
        })}
      </Group>
    )
  }

  // update() {
  //   this.forceUpdate()
  // }
  rendered() {
    this.on('resize', () => this.forceUpdate())
  }
}
