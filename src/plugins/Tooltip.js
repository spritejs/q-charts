import { Group, Label, Rect } from 'spritejs'
import { isArray, throttle, isFunction } from '../util'
import { BasePlugin } from '../core'

// function refixTooltipPosition(x, y, width, height, vw, vh, gap = 20) {
//   x += gap
//   y += gap
//   let pos = [x, y]

//   if (width > vw) {
//     console.warn('宽度溢出，考虑折行！')
//   } else {
//     if (x + width > vw) {
//       pos[0] = vw - width // x - ((x + width) - vw)
//     }
//   }

//   if (height > vw) {
//     console.warn('高度溢出！')
//   } else {
//     if (y + height > vh) {
//       pos[1] = vh - height // y - ((y + height) - vh)
//     }
//   }

//   pos.forEach((d, i) => {
//     if (d <= 0) {
//       pos[i] = gap
//     }
//   })

//   return pos
// }

function refixTooltipPosition(x, y, w, h, vw, vh, gap = 10) {
  // 极坐标等坐标系
  if (x < vw / 2) {
    // 左边
    if (w + 2 * gap < x) {
      x -= w + gap
    } else {
      x += gap
    }
  } else {
    // 右边
    if (x + w + 2 * gap < vw) {
      x += gap
    } else {
      x -= w + gap
    }
  }

  if (x < 0) {
    x = gap
  }

  if (y < vh / 2) {
    // 上边
    if (h + 2 * gap < y) {
      y -= gap
    }
  } else {
    // 下边
    if (y + h + 2 * gap < vh) {
      y += gap
    } else {
      y -= h + gap
    }
  }

  return [x, y]
}

export class Tooltip extends BasePlugin {
  constructor(attrs) {
    super(attrs)
    this.$group = null
    this.prevPos = [0, 0]
    this.state = { hide: true }
    // this.init()
    return this
  }

  getDefaultAttrs() {
    return {
      throttleTime: 300,
      formatter: k => k.value || k,
      title: null,
      pos: null, // 一旦设置了此值，tooltip 的位置将固定
      _pos: null // 更新 pos 属性计算出的值，因为 pos 属性可以设置为 百分比
    }
  }

  beforeRender() {
    // super.beforeRender()
    const pos = this.attr('pos')

    this.dataset.on(
      'hover:data',
      throttle(d => {
        if (!d) {
          !pos && this.setState({ hide: true }, true)
        } else {
          let { layerX: x, layerY: y, data } = d
          data = isArray(data) ? data : [data]
          let [width, height] = this.$group.contentSize
          const [t, r, b, l] = this.$group.attr('padding')
          const { width: borderWidth } = this.$group.attr('border')
          width += r + l + 2 * borderWidth
          height += t + b + 2 * borderWidth

          const [chartWidth, chartHieght] = this.chart.getSize()
          this.setState(
            {
              pos:
                pos ||
                refixTooltipPosition(
                  x,
                  y,
                  width,
                  height,
                  chartWidth,
                  chartHieght
                ),
              data: data,
              hide: false
            },
            true
          )
        }
      }, 300)
    )
  }

  beforeUpdate() {}

  getTheme() {
    return this.chart.resolveTheme('Tooltip')
  }

  render() {
    const {
      title: titleStyle = {},
      group = {},
      icon = {},
      text = {},
      ...root
    } = this.getTheme()
    const { hide, data = [] } = this.state
    const titleGetter = this.attr('title')
    const title =
      typeof titleGetter === 'undefined'
        ? null
        : isFunction(titleGetter)
          ? data && data.length
            ? titleGetter(data)
            : null
          : titleGetter

    const rootPaddingBottom = root.padding
      ? isArray(root.padding)
        ? root.padding[0]
        : root.padding
      : root.paddingBottom || 0
    return (
      <Group
        {...{
          clipOverflow: false,
          flexDirection: 'column',
          zIndex: 9999,
          ...(this.chart.style('Tooltip')() || {}),
          ...root,
          ...(this.style('background')() || {})
        }}
        display={hide ? 'none' : 'flex'}
        opacity={hide ? 0 : 1}
      >
        {title ? (
          <Label
            text={title}
            {...titleStyle}
            {...(this.style('title')() || {})}
          />
        ) : null}
        {data.map((d, i) => {
          return (
            <Group
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
              enableCache={false}
              {...group}
              {...(i === 0 ? { paddingTop: rootPaddingBottom } : {})}
            >
              <Rect
                {...icon}
                {...(this.style('icon')() || {})}
                bgcolor={d.color}
              />
              <Label
                enableCache={false}
                {...text}
                text={this.attr('formatter')(d)}
                {...(this.style('text')() || {})}
              />
            </Group>
          )
        })}
      </Group>
    )
  }
  updated() {
    const pos = this.state.pos
    if (pos && pos.length) {
      let width = this.$group['boundingRect'][2]
      this.$group.attr({ width: width + 0.1 })
      this.$group.transition(0.2).attr('pos', this.state.pos)
      setTimeout(_ => {
        // 触发reflow
        this.$group.attr({ width: '' })
      })
    }
  }
}
