import { Group, Arc, Polyline, Label } from 'spritejs'
import { BaseVisual } from '../../core'
import { flattern, isFunction } from '../../util'

/**
 *            vct
 *     -----------------
 *     |       |       |
 *     |   tL  |  tR   |
 *     |       |       |
 * hcl |-------|-------| hcr
 *     |       |       |
 *     |   bL  |  bR   |
 *     |       |       |
 *     -----------------
 *            vcb
 */
function location(angle) {
  const PI = Math.PI
  const TAU = PI * 2
  let n = angle < 0 ? Math.abs(Math.floor(angle / TAU)) : 0
  let v = (angle + Math.PI * 2 * n) % (Math.PI * 2)

  if (0 * PI === v || 1 * PI === v) {
    if (0 * PI === v) {
      return 'horizontalCenterRight'
    }
    // 水平居中
    return 'horizontalCenterLeft'
  } else if (0.5 * PI === v || 1.5 * PI === v) {
    if (0.5 * PI === v) {
      return 'verticalCenterBottom'
    }
    // 垂直居中
    return 'verticalCenterTop'
  } else if (0 * PI < v && v < 0.5 * PI) {
    // 右下
    return 'bottomRight'
  } else if (0.5 * PI < v && v < 1 * PI) {
    // 左下
    return 'bottomLeft'
  } else if (1 * PI < v && v < 1.5 * PI) {
    // 左上
    return 'topLeft'
  } else {
    return 'topRight'
  }
}

export class Gauge extends BaseVisual {
  constructor(attrs = {}) {
    super(attrs)
    this.animations = []
    this.style('tickText', true)
    this.style('tickLine', true)
  }

  get name() {
    return 'Gauge'
  }

  getDefaultAttrs() {
    return {
      min: 0,
      max: 1,
      lineCap: 'round',
      lineWidth: 8,
      startAngle: Math.PI * 0.8,
      endAngle: Math.PI * 2.2,
      strokeBgcolor: '#dde3ea',
      hoverBg: '#f8f8f8',
      title: d => d,
      subTitle: d => d,

      tickStep: 0.1, // tick 步进，生成 tick 的数量为 (max - min) / tickStep
      tickLength: 5, // 刻度长度，为负值时向外绘制
      labelOffset: 5,
      tickFormatter: d => d // 刻度文本格式化
    }
  }

  get radius() {
    const size = this.attr('size')
    const lw = this.attr('lineWidth')
    const len = this.getData().length
    return ~~(
      (Math.min.apply(size, size.map(v => v / 2)) - lw * (len - 1) * 2) /
      len
    )
  }

  get center() {
    const { lineWidth } = this.attr()
    const radius = this.radius
    return [radius + lineWidth / 2, radius + lineWidth / 2]
  }

  get ticks() {
    let {
      min,
      max,
      startAngle,
      endAngle,
      lineWidth,
      tickStep,
      tickLength,
      labelOffset,
      tickFormatter
    } = this.attr()
    const count = Math.abs(max - min) / tickStep

    let total = endAngle - startAngle
    if (total > Math.PI * 2) {
      endAngle = startAngle + Math.PI * 2
      total = endAngle - startAngle
    }

    const isInner = tickLength > 0
    const perAngle = total / count
    const center = this.center
    const ticks = []
    let i = -1

    while (++i <= count) {
      const angle = i * perAngle + startAngle
      const cos = Math.cos(angle)
      const sin = Math.sin(angle)

      ticks.push({
        angle,
        points: isInner
          ? [
            [
              cos * (center[0] - lineWidth - tickLength),
              sin * (center[0] - lineWidth - tickLength)
            ],
            [cos * (center[0] - lineWidth), sin * (center[0] - lineWidth)]
          ]
          : [
            [cos * (center[0] - tickLength), sin * (center[0] - tickLength)],
            [cos * center[0], sin * center[0]]
          ],

        label: {
          isInner,
          location: location(angle),
          text: tickFormatter(i * tickStep),
          pos: isInner
            ? [
              cos * (center[0] - lineWidth - tickLength - labelOffset),
              sin * (center[0] - lineWidth - tickLength - labelOffset)
            ]
            : [
              cos * (center[0] - tickLength + labelOffset),
              sin * (center[0] - tickLength + labelOffset)
            ]
        }
      })
    }

    if (
      (ticks[0].angle + ticks[ticks.length - 1].angle) % (Math.PI * 2) ===
      0
    ) {
      ticks.pop()
    }

    return ticks
  }

  transform(data) {
    const { startAngle, endAngle, min, max } = this.attr()
    const total = Math.abs(max - min)
    const radius = this.radius

    return data.reduce((a, d, i) => {
      const value = d.__valueGetter__()
      const arc = {
        dataOrigin: d.dataOrigin,
        startAngle,
        radius,
        endAngle: d.disabled
          ? startAngle
          : ((endAngle - startAngle) * value) / total + startAngle,
        color: this.color(i)
      }
      a.push(arc)
      return a
    }, [])
  }

  beforeRender() {
    super.beforeRender()
    const data = flattern(this.getData())
    const arcs = this.transform(data)
    this.animations = arcs.reduce((a, c, i) => {
      a.push({
        from: { startAngle: c.startAngle, endAngle: c.startAngle },
        to: { startAngle: c.startAngle, endAngle: c.endAngle }
      })
      return a
    }, [])
    return arcs
  }

  beforeUpdate() {
    super.beforeUpdate()
    const data = flattern(this.getData())
    const arcs = this.transform(data)
    this.animations = arcs.map((arc, i) => {
      const animation = this.animations[i]
      if (animation) {
        return {
          from: animation.to,
          to: { startAngle: arc.startAngle, endAngle: arc.endAngle }
        }
      } else {
        return {
          from: { startAngle: arc.startAngle, endAngle: arc.startAngle },
          to: { startAngle: arc.startAngle, endAngle: arc.endAngle }
        }
      }
    })
    return arcs
  }

  pullLabel = (el, isInner = false, location = 'center') => {
    const translate = () => {
      const [w, h] = el.contentSize

      let translate = [0, 0]

      if (isInner) {
        switch (location) {
          case 'bottomLeft':
            translate = [0, -h / 2]
            break

          case 'topLeft':
            translate = [0, -h / 2]
            break

          case 'horizontalCenterRight':
            translate = [-w, -h / 2]
            break

          case 'horizontalCenterLeft':
            translate = [0, -h / 2]
            break

          case 'verticalCenterTop':
            translate = [-w / 2, 0]
            break

          case 'verticalCenterBottom':
            translate = [-w / 2, -h / 2]
            break

          case 'bottomRight':
            translate = [-w, -h / 2]
            break

          case 'topRight':
            translate = [-w, -h / 2]
            break

          default:
            translate = [-w / 2, -h / 2]
            break
        }
      } else {
        switch (location) {
          case 'bottomLeft':
          case 'topLeft':
            translate = [-w, -h / 2]
            break

          case 'horizontalCenterRight':
            translate = [w / 2, -h / 2]
            break

          case 'horizontalCenterLeft':
            translate = [-w, -h / 2]
            break

          case 'verticalCenterTop':
            translate = [-w / 2, -h / 2]
            break

          case 'verticalCenterBottom':
            translate = [-w / 2, 0]
            break

          case 'bottomRight':
          case 'topRight':
            translate = [0, -h / 2]
            break

          default:
            translate = [-w / 2, -h / 2]
            break
        }
      }

      el.attr('translate', translate)
    }
    this.chart.layer.prepareRender().then(() => translate())
  }

  render(data = []) {
    const {
      title,
      subTitle,
      startAngle,
      endAngle,
      lineWidth,
      lineCap,
      strokeBgcolor,
      hoverBg
    } = this.attr()
    const center = this.center
    const ticks = this.ticks
    const colors = this.color().reverse()
    const tickLine = this.isStyleExist('tickLine')
    const tickText = this.isStyleExist('tickText')

    return (
      <Group
        display="flex"
        justifyContent={data.length === 1 ? 'center' : 'space-between'}
        alignItems={'center'}
        clipOverflow={false}
      >
        {data.map((d, i) => (
          <Group
            bgcolor="transparent"
            clipOverflow={false}
            hoverState={{ bgcolor: hoverBg }}
          >
            <Arc
              lineWidth={lineWidth}
              lineCap={lineCap}
              startAngle={startAngle}
              endAngle={endAngle}
              color={strokeBgcolor}
              radius={this.radius}
              zIndex={10}
            />
            <Arc
              lineCap={lineCap}
              lineWidth={lineWidth}
              {...d}
              zIndex={10}
              animation={this.resolveAnimation({
                ...this.animations[i],
                duration: 300
              })}
              color={{
                vector: [0, 0, center[0] * 2, center[1] * 2],
                colors: [
                  { color: colors[0], offset: 0 },
                  { color: colors[1], offset: 0.3 },
                  { color: colors[2], offset: 1 }
                ]
              }}
              {...this.style('arc')(d, d.dataOrigin, i)}
            />
            {title ? (
              <Label
                text={isFunction(title) ? title(d.dataOrigin) : title}
                pos={center}
                textAlign="center"
                zIndex={10}
                anchor={subTitle ? [0, 0.5] : [0, 0]}
                {...this.style('title')(d, d.dataOrigin, i)}
                ref={el => this.pullLabel(el, true)}
              />
            ) : null}
            {subTitle ? (
              <Label
                text={isFunction(subTitle) ? subTitle(d.dataOrigin) : subTitle}
                pos={center}
                textAlign="center"
                zIndex={10}
                color={strokeBgcolor}
                {...this.style('subTitle')(d, d.dataOrigin, i)}
                ref={el => this.pullLabel(el, false, 'verticalCenterBottom')}
              />
            ) : null}

            {tickLine !== false || tickText !== false
              ? ticks.map((tick, j) => (
                <Group
                  pos={center}
                  zIndex={1010}
                  size={[1, 1]}
                  clipOverflow={false}
                >
                  {tickLine !== false ? (
                    <Polyline
                      points={tick.points}
                      color={strokeBgcolor}
                      {...this.style('tickLine')(d, d.dataOrigin, j)}
                    />
                  ) : (
                    false
                  )}

                  {tickText !== false ? (
                    <Label
                      {...tick.label}
                      ref={el =>
                        this.pullLabel(
                          el,
                          tick.label.isInner,
                          tick.label.location
                        )
                      }
                      {...this.style('tickText')(d, d.dataOrigin, j)}
                    />
                  ) : null}
                </Group>
              ))
              : null}
          </Group>
        ))}
      </Group>
    )
  }

  rendered() {
    this.on('resize', () => this.forceUpdate())
  }
}
