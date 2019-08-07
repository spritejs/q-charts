import { Group, Arc, Label } from 'spritejs'
import { Pie } from '../Pie'
import { isFunction } from '../../util'

export class ArcPie extends Pie {
  getDefaultAttrs() {
    return Object.assign({}, super.getDefaultAttrs(), {
      lineWidth: 10,
      title: null,
      subTitle: null
    })
  }

  transform(data) {
    let ret = super.transform(data)
    const { lineWidth, startAngle, endAngle } = this.attr()

    ret = ret.map((d, i) => ({
      pos: d.pos,
      disabled: d.disabled,
      startAngle: d.startAngle,
      endAngle: d.endAngle,
      padAngle: d.padAngle,
      innerRadius: d.innerRadius,
      radius: d.outerRadius,
      strokeColor: d.fillColor,
      lineWidth: lineWidth,
      dataOrigin: d.dataOrigin,
      ...this.style('arc')(d, d.dataOrigin, i)
    }))

    ret.forEach(d => {
      d.lineCap = !d.disabled ? d.lineCap : 'butt' // round 会导致禁用后显示成一个原点

      if (d.lineCap && (d.lineCap === 'round' || d.lineCap === 'square')) {
        let r =
          (lineWidth / 2 / (2 * Math.PI * d.radius)) * (endAngle - startAngle)
        let se = d.endAngle - d.startAngle

        if (se > r * 2) {
          d.oriStartAngle = d.startAngle
          d.oriEndAngle = d.endAngle

          d.startAngle += r
          d.endAngle -= r
        } else {
          if (se <= r) {
            d.lineCap = 'butt' // 无法绘制 round | square 线帽
          } else {
            d.startAngle += r / 2
            d.endAngle -= r / 2
          }
        }
      }
    })

    return ret
  }

  render(data = []) {
    const { title, subTitle } = this.attr()

    console.log(data)

    return (
      <Group clipOverflow={false}>
        {data.map((d, i) => {
          return (
            <Group>
              <Arc
                {...d}
                animation={this.resolveAnimation({
                  ...this.fromTos[i],
                  duration: 300,
                  delay: 0
                })}
                hoverState={this.style('arc:hover')(d, d.dataOrigin, d.index)}
              />
            </Group>
          )
        })}
        {title ? (
          <Label
            text={isFunction(title) ? title(data) : title}
            pos={this.center}
            textAlign="center"
            zIndex={10}
            padding={5}
            anchor={subTitle ? [0.5, 0.75] : [0.5, 0.5]}
            {...this.style('title')(data, null, null)}
          />
        ) : null}
        {subTitle ? (
          <Label
            text={isFunction(subTitle) ? subTitle(data) : subTitle}
            pos={this.center}
            textAlign="center"
            zIndex={10}
            padding={5}
            anchor={[0.5, -0.25]}
            {...this.style('subTitle')(data, null, null)}
          />
        ) : null}
      </Group>
    )
  }
}
