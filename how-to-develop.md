## 生命周期

- `beforeRender`: 初始渲染之前调用
- `rendered`: 渲染之后调用
- `beforeUpdate`: 每次更新之前调用
- `updated`: 每次更新之后调用

其中 `beforeRender` 和 `beforeUpdate` 的返回值会传给 `render` 方法

## 渲染相关

- `render`: 具体渲染方法
- `update`: 主动更新方法，会调用 `render` 得出最新 `vnode` 进行 `diff` 以及 `patch`

## `ref` 实例获取

只支持函数式调用，例如: `ref={el => this.getRing(el)}`

## 元素动画

```javascript
animation={{
  from,
  to,
  duration: 300,
  delay: 0
}}
```

## 状态切换

```
hoverStyle={this.style('sector:hover')(
  ring,
  ring.dataOrigin,
  ring.index
)}
```

## `Pie` 组件的开发

```javascript
import { Group, Ring } from 'spritejs'
import { BaseVisual } from '../../core'
import layout from './layout'
import { withGuide } from './guide'
import { withText } from './text'
import { flattern } from '../../util'

export class Pie extends BaseVisual {
  constructor(attrs = {}) {
    super(attrs)
    this.$rings = []
  }

  getDefaultAttrs() {
    return {
      scale: 1,
      radius: 0.9,
      innerRadius: 0,
      startAngle: Math.PI * -0.5,
      endAngle: Math.PI * 1.5,
      padAngle: 0,
      size: ['100%', '100%'],
      pos: ['0%', '0%']
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
    let [x, y] = [width / 2 - maxRadius - 10, height / 2 - maxRadius - 10]

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

  transform(data) {
    const { startAngle, endAngle, padAngle } = this.attr()

    const rings = layout()
      .startAngle(startAngle)
      .endAngle(endAngle)
      .padAngle(padAngle)
      .value(d => +d.__valueGetter__())(data)

    const pos = this.pos
    const maxOuterRadius = this.maxOuterRadius
    const innerRadius = this.innerRadius
    const isRose = this.attr('rose')
    let outerRadiuses = [] // 分配给各个扇形的外半径

    if (isRose) {
      outerRadiuses = rings.map(arc => maxOuterRadius * arc.proportion)
      let ratio = ~~(
        maxOuterRadius /
        Math.max.apply(outerRadiuses, outerRadiuses.map(d => Math.ceil(d)))
      ) // max / max(outerRadiuses) 生成最大放大比例

      if (ratio <= 1) {
        // 不能为0
        ratio = this.attr('radius')
      }

      outerRadiuses = outerRadiuses.map(r => r * ratio)
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

      ring.__patchParent__({ visual: 'pie', color: ring.fillColor })

      const normalState = this.style('sector')(
        ring,
        ring.dataOrigin,
        ring.index
      )

      Object.assign(ring, normalState)

      if (ring.disabled) {
        ring.lineWidth = 0
      }

      if (ring.lineWidth && ring.lineWidth > 1) {
        // 避免只展示一个扇形时出现边框
        const { startAngle, endAngle } = ring
        const angle = ((startAngle + endAngle) % Math.PI) * 2

        if (angle <= 0 && rings.filter(ring => !ring.disabled).length <= 1) {
          ring.lineWidth = 0
        }
      }
    })

    return rings
  }

  beforeRender() {
    super.beforeRender()
    const data = flattern(this.dataset.getData(this))

    const rings = (this.rings = this.transform(data))
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
    const data = flattern(this.dataset.getData(this))

    const rings = this.rings
    const nextRings = this.transform(data)
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
    const offset = 20
    const { startAngle, endAngle } = attrs
    const angle = (startAngle + endAngle) / 2
    const translate = [offset * Math.cos(angle), offset * Math.sin(angle)]

    if (isTranslated) {
      el.parentNode.transition(0.3).attr('translate', [0, 0])
      el.isTranslated = false
    } else {
      el.parentNode.transition(0.3).attr('translate', translate)
      el.isTranslated = true
    }

    evt && evt.stopDispatch()
  }

  showTooltip(evt, data) {
    evt.data = { color: data.fillColor, ...data.dataOrigin }
    this.emit('tooltip:show', evt)
    this.chart.setCanvasCursor('pointer')
  }

  hideTooltip() {
    this.emit('tooltip:hide') && this.chart.setCanvasCursor()
  }

  render(rings = []) {
    return (
      <Group pos={[10, 10]}>
        {rings.map((ring, i) => {
          const { from, to } = this.fromTos[i]

          return (
            <Group>
              <Ring
                ref={el => this.getRing(ring, i, el)}
                {...ring}
                animation={{
                  from,
                  to,
                  duration: 300,
                  delay: 0
                }}
                hoverStyle={this.style('sector:hover')(
                  ring,
                  ring.dataOrigin,
                  ring.index
                )}
                onMouseenter={(_, el) => el.attr('state', 'hover')}
                onMousemove={(evt, el) => {
                  this.showTooltip(evt, ring)
                }}
                onMouseleave={(evt, el) => {
                  this.hideTooltip()
                  el.attr('state', 'normal')
                }}
                onClick={(evt, el) => this.toggleTranslate(ring, evt, el)}
              />
              {withText(this, ring)}
              {withGuide(this, ring)}
            </Group>
          )
        })}
      </Group>
    )
  }
}
```
