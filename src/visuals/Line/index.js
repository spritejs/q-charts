import { Group, Polyline, Rect, Polygon, Label } from 'spritejs'
import { BaseVisual } from '../../core'
import { layout } from './layout'
import { mergeStyle } from '../../util/merge-style'
import { getSymbolAndStyle } from '../../util/pointSymbol'
import { hexToRgba } from '../../util/index'
export class Line extends BaseVisual {
  constructor(attrs = {}) {
    super(attrs)
    this.renderData = []
    this.$refs = Object.create(null) // 独立的一些元素
    this.$symbols = [] // symbols
    this.$lines = [] // lines
    this.__guideLineIndex = -1;
  }
  get name() {
    return 'Line'
  }
  getDefaultAttrs() {
    return {
      type: 'line', // type 为line 或area
      stack: false, // 是否堆叠处理
      smooth: false,
      axisGap: false // 是否到两端
    }
  }

  beforeRender() {
    super.beforeRender()
    const lines = getLines(this.getData(), this.attr(), this.chart.dataset.attr())
    lines.forEach((line, i) => {
      let points = getPointXY(line.points)
      updateLineAttr(line, { points, opacity: 1 }, { points, opacity: 0 })
    })
    this.renderData = lines
    return lines
  }

  beforeUpdate() {
    super.beforeUpdate()
    const lines = getLines(this.getData(), this.attr(), this.chart.dataset.attr())
    let oldLines = this.renderData
    lines.forEach((line, i) => {
      let newPoints = getPointXY(line.points)
      if (oldLines[i]) {
        let oldPoints = getPointXY(oldLines[i].points)
        if (oldLines[i].disabled === true && line.disabled !== true) { // 点击legend
          updateLineAttr(line, { points: newPoints, opacity: 1 }, { points: oldPoints, opacity: 0 })
        } else if (oldLines[i].disabled !== true && line.disabled === true) {
          updateLineAttr(line, { points: newPoints, opacity: 0 }, { points: oldPoints, opacity: 1 })
        } else if (oldLines[i].disabled !== true && line.disabled !== true) { // 默认更新
          updateLineAttr(
            line,
            { points: newPoints, opacity: 1 },
            { points: oldPoints, opacity: 1 }
          )
        }
      } else { // 新增
        updateLineAttr(line, { points: newPoints, opacity: 1 }, { points: newPoints, opacity: 0 })
      }
    })
    this.renderData = lines
    this.$lines = []
    this.$symbols = []
    return lines
  }

  ref(name, el) {
    this.$refs[name] = el
  }
  bgMove(evt, el) {
    if (evt === undefined) return;
    const { offsetX: x } = evt
    const pointsX = getPointX(this.renderData);
    let tarX = pointsX[0]
    let tarIndex = 0
    let dis = Math.abs(tarX - x)
    let $guideline = this.$refs['guideline'];
    for (let i = 1; i < pointsX.length; i++) {
      if (Math.abs(pointsX[i] - x) < dis) {
        dis = Math.abs(pointsX[i] - x)
        tarX = pointsX[i]
        tarIndex = i
      }
    }
    if ($guideline && tarIndex !== this.__guideLineIndex) {
      $guideline.attr({ opacity: 1, x: tarX })
      this.$symbols.forEach(line => {
        line.forEach((symbol, j) => {
          if (j !== tarIndex) {
            symbol.attr('state', 'normal')
          } else {
            symbol.attr('state', 'hover')
          }
        })
      })
      let hoverData = []
      this.renderData.forEach(line => {
        line.data.forEach((data, i) => {
          if (i === tarIndex && line.disabled !== true) {
            hoverData.push({
              ...data.dataOrigin,
              color: data.color,
              _value: data.__valueGetter__()
            })
          }
        })
      })
      if (this.attr('stack') === true) {
        hoverData.reverse()
      } else {
        hoverData.sort((a, b) => {
          return b._value - a._value
        })
      }
      this.dataset.hoverData({ ...evt, data: hoverData })
      this.__guideLineIndex = tarIndex;
    }
  }
  bgLeave(evt, el) {
    let $guideline = this.$refs['guideline'];
    if ($guideline) {
      $guideline.attr({ opacity: 0 })
      this.$symbols.forEach(line => {
        line.forEach((symbol, j) => {
          symbol.attr('state', 'normal')
        })
      });
      this.dataset.hoverData()
      this.__guideLineIndex = -1;
    }
  }
  setSymbol(i, j, el) {
    if (!this.$symbols[i]) {
      this.$symbols[i] = []
    }
    this.$symbols[i][j] = el
  }
  _getSymbol(attr, item, data, i, j) {
    const style = mergeStyle(this.style('point'), [attr, data, i, j], attr);
    const hStyle = mergeStyle(this.style('point:hover'), [attr, data, i, j], { scale: [1.4] });
    const { PointSymbol, normalStyle, hoverStyle } = getSymbolAndStyle(style, hStyle)
    return style === false ? null : (
      <PointSymbol
        animation={this.resolveAnimation({
          from: item.from,
          to: item.to,
          duration: 200,
          useTween: true
        })}
        hoverState={hoverStyle}
        onMouseenter={(_, el) => {
          el.attr('state', 'hover')
        }}
        onMousemove={(evt, el) => {
          // console.log(el.attr('states'));
        }}
        onMouseleave={(evt, el) => {
          el.attr('state', 'normal')
          this.chart.setCanvasCursor('default')
        }}
        actions={[
          {
            both: ['normal', 'hover'],
            action: { duration: 100 },
            reversable: false
          }
        ]}
        opacity={item.opacity}
        {...normalStyle}
        ref={el => this.setSymbol(i, j, el)}
      />
    )
  }
  render(lines = []) {
    let guideLineAttrs = { size: [1, this.attr('size')[1]], fillColor: '#ccc', strokeColor: 'transparent', opacity: 0 }
    let guideStyle = mergeStyle(this.style('guideline'), [guideLineAttrs]);
    lines = lines.filter(line => line.points && line.points.length);
    return (
      <Group zIndex={100} enableCache={false}>
        {guideStyle === false ? (null) : (
          <Rect ref={el => this.ref('guideline', el)} {...guideStyle} />
        )}
        <Group enableCache={false}>
          {lines.map((line, i) => {
            let { size, type, smooth, stack } = this.attr();
            let color = line.data[0].color || this.color(i)
            let areaAttrs = { fillColor: hexToRgba(color, 0.5), strokeColor: 'transparent' }
            let cusAttrs = this.style('area')(areaAttrs, line.data.map(item => item.dataOrigin), i)
            Object.assign(areaAttrs, cusAttrs)
            if (type === 'area') {
              return (
                <Polygon animation={this.resolveAnimation({
                  from: getAreaPoints(lines, i, { size, smooth, stack }, 'from'),
                  to: getAreaPoints(lines, i, { size, smooth, stack }, 'to'),
                  duration: 200,
                  useTween: true
                })} {...areaAttrs}
                onMouseleave={(evt, el) => {
                  el.attr('state', 'normal')
                }}
                actions={[
                  {
                    both: ['normal', 'hover'],
                    action: { duration: 100 },
                    reversable: false
                  }
                ]}
                onMouseenter={(_, el) => el.attr('state', 'hover')}
                hoverState={this.style('area:hover')(
                  areaAttrs,
                  line.data.map(item => item.dataOrigin),
                  i
                )}
                />
              )
            }
          })}
        </Group>
        <Group clipOverflow={false} enableCache={false}>
          {lines.map((line, i) => {
            let color = line.data[0].color || this.color(i)
            let lineAttrs = { strokeColor: color, lineWidth: 2 }
            let cusAttrs = this.style('line')(lineAttrs, line.data.map(item => item.dataOrigin), i)
            let smybolAttrs = { fillColor: color }
            let { smooth } = this.attr();
            Object.assign(lineAttrs, cusAttrs)
            return (
              <Group
                size={this.attr('size')}
                clipOverflow={false}
                onMousemove={this.bgMove.bind(this)}
                onMouseleave={this.bgLeave.bind(this)}
                enableCache={false}
              >
                <Polyline
                  ref={el => this.$lines.push(el)}
                  {...lineAttrs}
                  hoverState={this.style('line:hover')(
                    lineAttrs,
                    line.data.map(item => item.dataOrigin),
                    i
                  )}
                  onMouseenter={(_, el) => el.attr('state', 'hover')}
                  smooth={smooth}
                  onMouseleave={(evt, el) => {
                    el.attr('state', 'normal')
                  }}
                  actions={[
                    {
                      both: ['normal', 'hover'],
                      action: { duration: 100 },
                      reversable: false
                    }
                  ]}
                  animation={this.resolveAnimation({
                    from: line.from,
                    to: line.to,
                    duration: 200,
                    useTween: true
                  })}
                />
                {line.points.map((item, j) => {
                  line.data[j].color = color
                  return (
                    this._getSymbol(smybolAttrs, item, line.data[j].dataOrigin, i, j)
                  )
                })}
                {line.points.map((item, j) => {
                  let labelAttrs = { color }
                  let cusAttrs = this.style('label')(labelAttrs, line.data.map(item => item.dataOrigin), j)
                  if (cusAttrs) {
                    return (
                      <Label pos={item.point} {...cusAttrs}/>
                    )
                  }
                })}
              </Group>
            )
          })}
        </Group>
      </Group>
    )
  }
}
function getLines(data, attrs, fields) {
  const { pos, size, stack, axisGap } = attrs;
  return layout({ pos, size, stack, axisGap, data, fields })
}
function updateLineAttr(line, newObj, oldObj) {
  line.from = oldObj
  line.to = newObj
  line.points.forEach((point, i) => {
    let from = {}
    let to = {}
    if (newObj.points !== undefined) {
      from.pos = oldObj.points[i]
      to.pos = newObj.points[i]
    }
    if (newObj.opacity !== undefined) {
      point.opacity = from.opacity = oldObj.opacity
      to.opacity = newObj.opacity
    }
    if (to.pos === undefined) {
      // 如果不存在坐标信息，补上坐标信息
      from.pos = to.pos = point.point
    }
    point.from = from
    point.to = to
  })
}
function getPointXY(items) {
  return items.map(item => {
    return item.point
  })
}
function getPointX(items) {
  let points = []
  for (let i = 0; i < items.length; i++) {
    if (items[i].disabled !== true) {
      points = items[i].points
      break;
    }
  }
  return points.map(point => point.point && point.point[0])
}
function getAreaPoints(lines, i, attrs, name) {
  let startIndex = 0;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].disabled !== true) {
      startIndex = i;
      break;
    }
  }
  const { size, smooth, stack } = attrs;
  let res = Object.create(null);
  let points = getLinePoints(lines, i, name);
  res.points = [].concat(points)
  if (points.length === 0) return res
  if (i === startIndex || stack === false) { // 不堆叠添加面积坐标都是到坐标轴
    if (smooth === true) {
      res.smooth = [1, points.length];
    }
    let y0 = size[1]
    res.points.unshift([points[0][ 0 ], y0]);
    res.points.push([points[ points.length - 1 ][ 0 ], y0]);
  } else {
    let nextPoints = getLinePoints(lines, i - 1, name);
    if (smooth === true) {
      res.smooth = [[0, points.length - 1], [points.length, points.length + nextPoints.length - 1]];
    }
    res.points = points.concat(nextPoints.reverse())
  }
  return res;
}
function getLinePoints(lines, i, name) {
  let line = lines[i];
  if (line === undefined) {
    return []
  }
  if (line.disabled === true) {
    return getLinePoints(lines, i - 1, name)
  }
  return line.points.map(point => {
    return point[name].pos || point.point
  })
}
