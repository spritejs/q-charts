/**
 * 折线图的布局算法
 */
import { scaleLinear } from '../../util/q-scale'
import { axis } from '../../util/axis'

let layoutKeys = ['_x', '_y'] // 表示x,y轴数据
export function layout(obj) {
  const { size, stack, data, axisGap } = obj
  data.forEach(lines => {
    lines.forEach(point => {
      point._x = point.__textGetter__()
      point._y = point.__valueGetter__()
    })
  })
  let arrObject = []
  data.forEach(line => {
    let lineDisabled = true
    line.forEach(point => {
      if (!point.disabled) {
        lineDisabled = false
      }
    })
    if (lineDisabled === true) {
      line.disabled = true
    }
    arrObject.push(line)
  })
  let resArr = []

  let baseValues = {} // 如果stack为true
  arrObject.forEach(line => {
    let currentLine = layoutLine(line, arrObject, stack)
    currentLine.data = line
    if (line.disabled === true) {
      currentLine.disabled = line.disabled
      delete line.disabled
    }
    resArr.push(currentLine)
  })
  return resArr

  function layoutLine(oData, arrObject, stack) {
    let res = Object.create(null)
    let data = oData.filter(item => item.disabled !== true) // 过滤disabled的数据
    layoutKeys.forEach(key => {
      let scales = data.map(item => {
        return item[key]
      })
      baseValues[key] = baseValues[key] || []
      let baseArr = baseValues[key]
      let type = 'category' // 默认按照category分类进行
      let lengthPx = key === '_x' ? size[0] : size[1]

      let scaleF = scaleLinear()
        .domain([0, data.length - 1])
        .range([0, lengthPx])
      if (axisGap !== false) {
        scaleF = scaleLinear()
          .domain([0, data.length])
          .range([0, lengthPx])
      }
      if (key === '_y') {
        type = 'value'
      }
      if (type === 'value') {
        scales = axis({ dataSet: arrObject, stack })
        if (stack === true) {
          // 如果为堆叠，处理对应key叠加
          data.forEach((item, ind) => {
            item[key] = item[key] + (baseArr[ind] || 0)
            baseArr[ind] = item[key]
          })
        }
        const maxValue = Math.max.apply(this, scales)
        const minValue = Math.min.apply(this, scales)
        scaleF = scaleLinear()
          .domain([minValue, maxValue])
          .range([0, lengthPx])
      }
      let resData = data.map((item, index) => {
        let targetPx = scaleF(type === 'value' ? item[key] : index)
        if (axisGap !== false) {
          if (type === 'category') {
            let pDx
            if (key === '_x') {
              pDx = size[0] / data.length
            } else if (key === '_y') {
              pDx = size[1] / data.length
            }
            targetPx = targetPx + pDx / 2
          }
        }
        if (key === '_x') {
        } else if (key === '_y') {
          targetPx = size[1] - targetPx
        }
        return {
          item: item,
          text: String(item[key]),
          offset: targetPx
        }
      })
      res[key] = {
        data: resData,
        scales,
        scaleF,
        type
      }
    })
    const { _x: objX, _y: ObjY } = res
    res.points = []
    objX.data.forEach((item, index) => {
      res.points.push({
        point: [objX.data[index].offset, ObjY.data[index].offset]
      })
    })
    delete res['_x']
    delete res['_y']
    return res
  }
}
