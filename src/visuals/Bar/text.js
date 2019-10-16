import { Label } from 'spritejs'
import { isBoolean } from '../../util'

export const withText = (visual, attrs) => {
  let { labelAttrs, dataOrigin, index } = attrs
  if (attrs.disabled) {
    return null
  }
  const textStyle = visual.style('text')(
    attrs,
    dataOrigin,
    index,
    visual.$group
  )
  if (!textStyle) {
    return
  }
  let { textFrom, textTo } = visual.fromTos[attrs.index]
  if (textStyle.pos) {
    visual.pillars[attrs.index].labelAttrs.pos = textStyle.pos
    if (textTo && textTo.pos) {
      textTo.pos = textStyle.pos
    }
  }
  return (
    <Label
      {...labelAttrs}
      {...(isBoolean(textStyle) ? {} : textStyle)}
      {...textFrom}
      animation={visual.resolveAnimation({
        from: textFrom,
        to: textTo,
        duration: 300,
        delay: 0,
        useTween: true
      })}
      onMousemove={(evt, el) =>
        !visual.attr('mouseDisabled') && el.attr('state', 'hover')
      }
      onMouseleave={(evt, el) =>
        !visual.attr('mouseDisabled') && el.attr('state', 'normal')
      }
      hoverState={visual.style('text:hover')(
        attrs,
        attrs.dataOrigin,
        attrs.index
      )}
    />
  )
}
