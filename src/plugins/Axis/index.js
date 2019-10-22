import { Group, Label, Polyline, Circle } from 'spritejs'
import { BasePlugin } from '../../core'
import { layout } from './layout'
import pieLayout from '../../visuals/Pie/layout'
import { Bar, Scatter, Pie } from '../../visuals/index'
import { mergeStyle } from '../../util/merge-style'
// import { convertPercent2Number as transPx } from '../../util/'
export class Axis extends BasePlugin {
  constructor(attrs = {}) {
    super(attrs)
    this.$lines = []
    this.optionAttrs = attrs
    this.renderData = []
  }

  getDefaultAttrs() {
    const dObj = {
      orient: 'bottom', // ['top','left','right','bottom']
      axisGap: undefined, // 绘制图形是否从0位置开始
      type: undefined, // ['value','category']
      target: undefined,
      stack: undefined,
      field: undefined,
      range: undefined, // 刻度范围
      coord: 'cartesian2d', // [cartesian2d,polar]
      coordPos: ['50%', '50%'],
      formatter: function(str, data) {
        // 格式化坐标轴文字显示
        return str
      }
    }
    return dObj
  }

  beforeRender() {
    super.beforeRender()
    const data = this.getData()
    this.prepareAttrs(this.chart.dataset.attr())
    this.renderData = layout({ ...this.attr(), data })
    this.renderData.scales.forEach(scale => {
      scale.from = scale.to = { pos: scale.pos }
      scale.labelFrom = scale.labelTo = {
        text: getNumberText(scale.text, this.attr())
      }
    })
    return this.renderData
  }

  beforeUpdate() {
    super.beforeRender()
    const data = this.getData()
    this.prepareAttrs(this.chart.dataset.attr())
    let oldRenderData = this.renderData
    this.renderData = layout({ ...this.attr(), data })
    this.renderData.scales.forEach((scale, i) => {
      let from = { pos: scale.pos }
      let labelFrom = { text: getNumberText(scale.text, this.attr()) }
      if (oldRenderData.scales[i]) {
        from = { pos: oldRenderData.scales[i].pos }
        labelFrom = {
          text: getNumberText(oldRenderData.scales[i].text, this.attr())
        }
      }
      scale.from = from
      scale.to = { pos: scale.pos }
      scale.labelFrom = labelFrom
      scale.labelTo = { text: getNumberText(scale.text, this.attr()) }
    })
    return this.renderData
  }
  prepareAttrs(fields) {
    // 处理默认属性，部分属性会默认从对应visula继承过来
    let { target: $target, orient, axisGap } = this.attr()
    let optionAttrs = this.optionAttrs
    let type = 'category' // 默认按照category分类进行
    let field = fields.text
    if (this.chart.visuals.length >= 1 && $target === undefined) {
      // 如果visual大于等于一个
      $target = this.chart.visuals[0]
      this.attr({ target: $target })
    }
    if ($target && $target.attr('transpose')) {
      if (orient === 'top' || orient === 'bottom') {
        type = 'value'
      }
    } else if (orient === 'left' || orient === 'right') {
      type = 'value'
    }

    this.attr({ type, field })

    this.mergeAttr($target, ['stack', 'axisGap', 'size', 'pos']) // 合并来自对应visual的属性

    if (type === 'value') {
      // 如果为value类型，axisGap强制为false
      this.attr({ axisGap: false, field: fields.value })
    }
    if ($target instanceof Scatter) {
      this.attr({ type: 'value' })
      if (orient === 'bottom' || orient === 'top') {
        this.attr({ field: fields.text })
      }
    }

    if (optionAttrs.field !== undefined) {
      this.attr({ field: optionAttrs.field })
    }

    if ($target && $target.attr('layoutWay')) {
      let layoutWay = $target.attr('layoutWay')
      let field = this.attr('field')
      let curLayout = layoutWay[field]
      this.attr({ range: [curLayout.min, curLayout.max] })
    }

    if (optionAttrs.type !== undefined) {
      this.attr({ type: optionAttrs.type })
    }

    if (
      axisGap === undefined &&
      $target instanceof Bar &&
      type === 'category'
    ) {
      // 特殊情况Bar特殊处理
      this.attr({ axisGap: true })
    }
  }
  mergeAttr($target, arr) {
    if ($target) {
      arr.forEach(name => {
        let tarVal = $target.attr(name)
        let myVal = this.attr(name)
        if (
          (this.optionAttrs[name] === undefined || myVal === undefined) &&
          tarVal !== undefined
        ) {
          if (name === 'size' || name === 'pos') {
            this.attr('__' + name + '__', tarVal)
          }
          this.attr(name, tarVal)
        }
      })
    }
  }
  mergeTheme(name, args) {
    let themes = this.chart.resolveTheme('Axis')[this.attr('orient')]
    return mergeStyle(this.style(name), args, themes[name])
  }
  render(renderData = {}) {
    let axisStyle = this.mergeTheme('axis', [renderData.axisAttrs])
    let rings = []
    const { axisGap, formatter, pos, coord, size, coordPos } = this.attr()
    let $target = this.attr('target')
    if ($target instanceof Pie && coord === 'polar') {
      const { startAngle, endAngle, padAngle } = $target.attr()
      rings = pieLayout()
        .startAngle(startAngle)
        .endAngle(endAngle)
        .padAngle(padAngle)
        .value(d => +d[0].__valueGetter__())(
          this.getData().filter(d => !d[0].disabled)
        )
    }
    return (
      <Group pos={pos}>
        <Group clipOverflow={false}>
          {renderData.scales.map((scale, i) => {
            let labelStyle = this.mergeTheme('label', [
              renderData.labelAttrs,
              scale,
              i
            ])
            let scaleStyle = this.mergeTheme('scale', [
              renderData.scaleAttrs,
              scale,
              i
            ])
            let gridStyle = this.mergeTheme('grid', [
              renderData.gridAttrs,
              scale,
              i
            ])
            let labelAnimation = {
              from: scale.labelFrom,
              to: scale.labelTo,
              duration: 200,
              attrFormatter: attr => {
                if (typeof attr.text === 'number') {
                  let text = formatter(
                    formatNumber(
                      attr.text,
                      scale.labelFrom.text,
                      scale.labelTo.text
                    )
                  )
                  let resAttr = Object.assign(attr, {
                    text: text
                  })
                  return resAttr
                }
                return attr
              },
              useTween: true
            }
            if (
              typeof scale.labelTo.text !== 'number' ||
              typeof scale.labelFrom.text !== 'number'
            ) {
              labelAnimation = {}
            }
            if (
              this.attr('orient') === 'left' ||
              this.attr('orient') === 'right'
            ) {
              return (
                <Group
                  size={[1, 1]}
                  pos={scale.from.pos}
                  clipOverflow={false}
                  animation={this.resolveAnimation({
                    from: scale.from,
                    to: scale.to,
                    duration: 200,
                    useTween: true
                  })}
                >
                  {labelStyle === false ? null : (
                    <Label
                      {...labelStyle}
                      clipOverflow={false}
                      text={formatter(scale.labelTo.text)}
                      animation={this.resolveAnimation(labelAnimation)}
                    ></Label>
                  )}
                  {scaleStyle === false ? null : <Polyline {...scaleStyle} />}
                  {coord === 'polar' ||
                  gridStyle === false ||
                  (scale.offset === 0 && !axisGap) ? null : (
                      <Polyline {...gridStyle} />
                    )}
                </Group>
              )
            }
          })}
        </Group>
        <Group size={size}>
          {renderData.scales.map((scale, i) => {
            let gridStyle = this.mergeTheme('grid', [
              renderData.gridAttrs,
              scale,
              i
            ])
            return coord !== 'polar' ||
              gridStyle === false ||
              (scale.offset === 0 && !axisGap) ? null : (
                <Circle
                  pos={coordPos}
                  radius={scale.offset}
                  {...gridStyle}
                  anchor={[0.5]}
                />
              )
          })}
        </Group>
        <Group clipOverflow={false}>
          {rings.map(ring => {
            // 绘制射线
            let angle = (ring.startAngle + ring.endAngle) / 2
            let maxRadius = this.attr('target').maxOuterRadius
            let txt = ring['0'].__textGetter__()
            let anchorX = -Math.cos(angle)
            let anchorY = -Math.sin(angle)
            let anchor = [0.5, 0.5]
            if (Math.abs(anchorX) > Math.abs(anchorY)) {
              anchor[0] = anchorX < 0 ? 0 : anchorX
            } else {
              anchor[1] = anchorY > 0 ? anchorY : 0
            }
            let ang = Math.abs(((angle / Math.PI) * 180) % 90) // 角度转换为[0-90];
            let k = Math.abs(45 - Math.abs(ang - 45)) / 45 // 相关数据转化为[0-1]
            let labelDis = maxRadius * (1.01 + k / 18) // 18为影响因子 1.01为基准距离
            let pos = transPx(coordPos, size)
            let newPoint = [
              pos[0] + maxRadius * Math.cos(angle),
              pos[1] + maxRadius * Math.sin(angle)
            ]
            let labelPoint = [
              pos[0] + labelDis * Math.cos(angle),
              pos[1] + labelDis * Math.sin(angle)
            ]
            return (
              <Group clipOverflow={false} size={['100%', '100%']}>
                <Polyline
                  points={[pos, newPoint]}
                  color={'#dde0e5'}
                  lineDash={[3, 4]}
                />
                <Label
                  pos={labelPoint}
                  color={'#67728C'}
                  text={formatter(txt)}
                  fontSize={12}
                  anchor={anchor}
                />
              </Group>
            )
          })}
        </Group>
        {axisStyle === false ? null : (
          <Polyline {...axisStyle} pos={renderData.originalPoint} />
        )}
      </Group>
    )
  }
}
function transPx(point, size) {
  return point.map((num, i) => {
    let ind = String(num).indexOf('%')
    if (ind !== -1) {
      return (size[i] * num.substr(0, ind)) / 100
    }
    return num
  })
}
function formatNumber(str, fromStr, toStr) {
  if (
    typeof str === 'number' &&
    typeof fromStr === 'number' &&
    typeof toStr === 'number'
  ) {
    let len = getDigit(toStr)
    return str.toFixed(len)
  }
  return toStr
}
function getDigit(num) {
  let arrNum = String(num).split('.')
  if (arrNum.length > 1) {
    return arrNum[1].length
  }
  return 0
}
function getNumberText(str, attrs) {
  if (!isNaN(str) && attrs.type === 'value') {
    return Number(str)
  }
  return str
}
