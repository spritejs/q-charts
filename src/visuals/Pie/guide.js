import { Group, Polyline, Label } from 'spritejs'
import { isBoolean } from '../../util'

const LINES_MAP = new WeakMap()
const LABELS_MAP = new WeakMap()

export const withGuide = (visual, attrs) => {
  if (attrs.disabled) {
    return null
  }

  const lineStyle = visual.style('guideLine')(
    attrs,
    attrs.dataOrigin,
    attrs.index
  )
  const textStyle = visual.style('guideText')(
    attrs,
    attrs.dataOrigin,
    attrs.index
  )

  if (!lineStyle && !textStyle) {
    return null
  }

  const { points, anchor, labelPos } = linePoints(attrs)

  let line = Object.assign(
    {
      points: points,
      strokeColor: attrs.fillColor // 默认采用扇形的填充色
    },
    isBoolean(lineStyle) ? {} : lineStyle
  )
  let label = Object.assign(
    {
      color: '#67728C',
      fontSize: '12px',
      text: attrs.__textGetter__(),
      pos: labelPos,
      anchor
      // anchor: [direction === 'right' ? 0 : 1, 0.5]
    },
    isBoolean(textStyle) ? {} : textStyle
  )

  const getPolyline = el => {
    if (LINES_MAP.get(el)) {
      el.animate([LINES_MAP.get(el), line], {
        duration: 300,
        fill: 'forwards'
      }).finished.then(() => el.attr(line) && LINES_MAP.set(el, line))
    } else {
      el.attr(line)
      LINES_MAP.set(el, line)
    }
  }

  const getLabel = el => {
    if (LABELS_MAP.get(el)) {
      el.animate([LABELS_MAP.get(el), label], {
        duration: 300,
        fill: 'forwards'
      }).finished.then(() => el.attr(label) && LABELS_MAP.set(el, label))
    } else {
      el.attr(label)
      LABELS_MAP.set(el, label)
    }
  }

  return (
    <Group clipOverflow={false} size={[1, 1]}>
      {lineStyle ? (
        <Polyline
          ref={getPolyline}
          onMousemove={(_, el) => {
            el.attr('state', 'hover')
          }}
          onMouseleave={(_, el) => {
            el.attr('state', 'normal')
          }}
          hoverState={visual.style('guideLine:hover')(
            attrs,
            attrs.dataOrigin,
            attrs.index
          )}
        />
      ) : null}
      {textStyle ? (
        <Label
          ref={getLabel}
          onMousemove={(_, el) => {
            el.attr('state', 'hover')
          }}
          onMouseleave={(_, el) => {
            el.attr('state', 'normal')
          }}
          hoverState={visual.style('guideText:hover')(
            attrs,
            attrs.dataOrigin,
            attrs.index
          )}
        />
      ) : null}
    </Group>
  )
}

function linePoints(attrs) {
  const {
    startAngle,
    endAngle,
    pos: center,
    outerRadius: radius,
    maxRadius
  } = attrs

  // const minAngle = Math.PI / 6
  let angle = (startAngle + endAngle) / 2
  const [centerX, centerY] = center
  const offset = 0 // 相对父组件外围的偏移量
  const offsetRadius = maxRadius - radius
  const length = 20 // 起点到中点的距离
  // const length2 = 10 // 中点到终点的距离

  // 绘制所需的3个点坐标
  // 起点
  const [x, y] = [
    Math.cos(angle) * (radius + offset) + radius + offsetRadius + centerX,
    Math.sin(angle) * (radius + offset) + radius + offsetRadius + centerY
  ]

  // 中点
  // FIXME: 文字重叠问题
  const [cX0, cY0] = [
    x + length * Math.cos(angle),
    y + length * Math.sin(angle)
  ]

  const labelPos = [
    x + (length + 5) * Math.cos(angle),
    y + (length + 5) * Math.sin(angle)
  ]

  let anchorX = -Math.cos(angle)
  let anchorY = -Math.sin(angle)
  let anchor = [0.5, 0.5]
  if (Math.abs(anchorX) > Math.abs(anchorY)) {
    anchor[0] = anchorX < 0 ? 0 : anchorX
  } else {
    anchor[1] = anchorY > 0 ? anchorY : 0
  }

  return { points: [[x, y], [cX0, cY0]], labelPos, anchor }
}
