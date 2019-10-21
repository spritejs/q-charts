import { Group, Polyline, Label } from 'spritejs'
import { isBoolean } from '../../util'

const LINES_MAP = new WeakMap()
const LABELS_MAP = new WeakMap()

export const withGuide = (visual, attrs, formatter) => {
  if (attrs.dataOrigin.disabled === true) {
    return null
  }

  const lineStyle = visual.style('guideline')(
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
  const right = attrs.align !== 'right'
  const { points } = linePoints(attrs, right, lineStyle && lineStyle.length)

  let line = Object.assign(
    {
      points,
      color: '#EDEFF1'
    },
    isBoolean(lineStyle) ? {} : lineStyle
  )
  let label = Object.assign(
    {
      color: '#000',
      fontSize: '12px',
      text:
        formatter(attrs.dataOrigin) ||
        attrs.dataOrigin.__textGetter__() + attrs.dataOrigin.__valueGetter__(),
      pos: [points[1][0] + (right ? 10 : -10), points[1][1]],
      anchor: [right ? 0 : 1, 0.5]
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
          hoverState={visual.style('guideline:hover')(
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

function linePoints(attrs, right, length) {
  const { points } = attrs
  // 起点
  let x, y
  if (right) {
    ;[x, y] = [
      (points[1][0] + points[2][0]) / 2 + 10,
      (points[1][1] + points[2][1]) / 2
    ]
  } else {
    ;[x, y] = [
      (points[0][0] + (points.length === 3 ? points[2][0] : points[3][0])) / 2 -
        10,
      (points[0][1] + (points.length === 3 ? points[2][1] : points[3][1])) / 2
    ]
  }
  // 终点
  const [cX, cY] = [right ? x + (length || 40) : x - (length || 40), y]
  return { points: [[x, y], [cX, cY]] }
}
