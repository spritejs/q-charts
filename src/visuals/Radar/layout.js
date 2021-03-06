import { Global } from '../../core/Global'
/**
 * 根据给定角度和长度获取圆坐标值
 * @param {Number} radian 角度
 * @param {Number} length 长度
 * @returns {Array} [x,y]
 */
const getPointCoordinate = (radian, length) => {
  let x = Math.cos(radian) * length
  let y = Math.sin(radian) * length
  return [x, y]
}

/**
 * 获取s数组中最大数除以层级后的整数
 * @param {Array} data
 * @param {Number} splitNumber
 * @returns {Number}
 */
const getMax = (data, splitNumber) => {
  const indicatorMax = Math.max(...data)
  if (indicatorMax < splitNumber * 10) {
    return Math.ceil(indicatorMax / splitNumber) * splitNumber
  } else {
    return Math.ceil(indicatorMax / 10 / splitNumber) * 10 * splitNumber
  }
}

/**
 * 根据给定的数据，返回绘制雷达图所需要的数据
 * @param {Array} dataset 数据集
 * @param {Number} radius 雷达图半径
 * @param {Number} splitNumber  雷达图背景层级
 * @param {Number} startAngle 雷达图起始轴角度
 * @param {Number} labelOffset 雷达图文字偏移值
 * @returns {Object} { sectionAttrs, borderAttrs, axisAttrs, gridAttrs }
 */
export default function layout(
  data,
  radius,
  splitNumber,
  startAngle,
  labelOffset
) {
  let bgPoints = [] // 最外层背景多边形
  let gridAttrs = [] // 蜘蛛网图背景
  let axisAttrs = [] // 坐标轴
  let sectionAttrs = [] // 多边形数据
  if (data.some(d => d.length === 0)) {
    return { sectionAttrs, axisAttrs, gridAttrs }
  }

  const allData = data
    .filter(d => !d[0].disabled)
    .reduce((t, c) => {
      const cv = c.map(d => d.__valueGetter__())
      return t.concat(cv)
    }, [])

  const max = getMax(allData, splitNumber)

  const realMax = getMax(
    allData.map(val =>
      Global.datasetReverse ? Global.datasetReverse(val) : val
    ),
    splitNumber
  )

  // 每个类别的弧度
  const dimension = data[0].length
  const perRadian = (Math.PI * 2) / dimension
  // 起始角度->转弧度
  const startRadian = (Math.PI / 180) * startAngle
  for (let i = 0; i < dimension; i++) {
    // 根据角度和半径，计算对应的坐标
    let currentRadian = i * perRadian + startRadian
    let point = getPointCoordinate(currentRadian, radius)

    bgPoints.push({
      point,
      radian: currentRadian
    })

    // 类别指示坐标
    const labelPos = getPointCoordinate(currentRadian, radius + labelOffset)
    const label = data[0][i].__textGetter__()
    const labelDisabled = data.every(d => d[0].disabled)
    // 坐标轴属性
    axisAttrs.push({
      points: [[0, 0], point],
      lineWidth: 1,
      lineDash: [3, 2],
      strokeColor: '#DDE0E5',
      label,
      labelPos,
      radian: currentRadian,
      maxScale: realMax,
      splitNumber: splitNumber,
      $elType: 'axis',
      disabled: labelDisabled
    })
  }

  data.forEach((dArray, index) => {
    const categoryPoints = dArray.map((d, i) => {
      const value = d.__valueGetter__()
      const radian = bgPoints[i].radian
      return getPointCoordinate(radian, (value / max) * radius)
    })

    const dataOrigin = dArray.map(d => d.dataOrigin)
    const disabled = dArray[0].disabled

    sectionAttrs.push({
      points: categoryPoints,
      index: index,
      dataOrigin,
      disabled,
      close: true,
      $elType: 'section'
    })
  })

  // 背景网格多边形坐标
  const gridPoints = bgPoints.map(p => p.point)
  for (let i = 0; i < splitNumber; i++) {
    let scale = 1 - i / splitNumber
    gridAttrs.push({
      scale,
      radius,
      points: gridPoints,
      index: i,
      opacity: 1,
      lineWidth: 1,
      strokeColor: '#DDE0E5',
      close: true,
      $elType: 'grid'
    })
  }

  return { sectionAttrs, axisAttrs, gridAttrs }
}
