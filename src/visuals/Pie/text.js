import { Label } from 'spritejs'
import { isBoolean } from '../../util'

export const withText = (visual, attrs) => {
  let {
    startAngle,
    endAngle,
    pos: center,
    maxRadius: outerRadius,
    innerRadius,
    dataOrigin,
    index
  } = attrs

  if (attrs.disabled) {
    return null
  }

  const textStyle = visual.style('text')(attrs, dataOrigin, index)

  if (!textStyle) {
    return
  }

  const angle = (startAngle + endAngle) / 2
  const pos = [
    outerRadius * (1 + Math.cos(angle)) +
      center[0] -
      ((outerRadius - innerRadius) / 2) * Math.cos(angle),
    outerRadius * (1 + Math.sin(angle)) +
      center[1] -
      ((outerRadius - innerRadius) / 2) * Math.sin(angle)
  ]

  return (
    <Label
      {...{
        color: '#fff',
        fontSize: '12px',
        text: attrs.__valueGetter__(),
        pos,
        zIndex: 1000,
        anchor: [0.5, 0.5]
        // rotate: (angle / Math.PI) * 180
      }}
      {...(isBoolean(textStyle) ? {} : textStyle)}
      onMousemove={(_, el) => el.attr('state', 'hover')}
      onMouseleave={(_, el) => el.attr('state', 'normal')}
      hoverState={visual.style('text:hover')(
        attrs,
        attrs.dataOrigin,
        attrs.index
      )}
    />
  )
}
