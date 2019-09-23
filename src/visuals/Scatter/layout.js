import { axis } from '../../util'
import { scaleLinear } from '../../util/q-scale'
import { isNumber, isString } from '../../util/is'

const getDataRange = data => {
  if (data.length === 0) {
    return [0, 1]
  }
  const min = Math.min(...data)
  const max = Math.max(...data)
  return [min, max]
}

const getBigRange = data => {
  if (data.length === 0) {
    return [0, 1]
  }
  const [min, max] = getDataRange(data)
  const n = Math.round(min / 10) - 1
  const m = Math.round(max / 10) + 1
  return [n * 10, m * 10]
}

const updateSectionVal = (section, newSection) => {
  const { min, max } = newSection
  if (isNumber(min)) {
    section[0] = min
  }
  if (isNumber(max)) {
    section[1] = max
  }
}

export default function layout(data, dataAttr, size, layoutWay) {
  const [width, height] = size

  const { text: textField, value: valueField } = dataAttr
  const allData = data.reduce((pre, cur) => {
    return pre.concat(cur.filter(d => !d.disabled))
  }, [])

  // 如果X轴是文本框，则进行均分
  const maxLen = getDataRange(data.map(d => d.length))[1]
  let xDomain = [0, maxLen - 1]
  let xSection = [0, maxLen - 1]
  const xIsTextData = allData.some(d => isString(d[textField]))
  if (!xIsTextData) {
    xSection = getBigRange(allData.map(d => d[textField]))
    const xScales = axis({
      dataSet: data,
      stack: false,
      field: textField,
      section: xSection
    })
    xDomain = getDataRange(xScales)
  }

  const yIsTextData = allData.some(d => isString(d[valueField]))
  if (yIsTextData) {
    throw new Error("Scatter's value category data should be Number!")
  }
  let ySection = getBigRange(allData.map(d => d[valueField]))
  const yScales = axis({
    dataSet: data,
    stack: false,
    field: valueField,
    section: ySection
  })
  const yDomain = getDataRange(yScales)

  if (layoutWay) {
    if (layoutWay[textField]) {
      updateSectionVal(xSection, layoutWay[textField])
    }
    if (layoutWay[valueField]) {
      updateSectionVal(ySection, layoutWay[valueField])
    }
  }

  const newLayoutWay = {}
  newLayoutWay[textField] = { min: xSection[0], max: xSection[1] }
  newLayoutWay[valueField] = { min: ySection[0], max: ySection[1] }

  const xLinear = scaleLinear()
    .domain(xDomain)
    .range([0, width])
  const yLinear = scaleLinear()
    .domain(yDomain)
    .range([0, height])

  const attrs = data.map(dArry => {
    return dArry.map((d, i) => {
      const x = xIsTextData ? i : d.__textGetter__()
      const y = d.__valueGetter__()
      const pos = [xLinear(x), height - yLinear(y)]
      return {
        pos,
        radius: 4,
        anchor: [1, 1],
        dataOrigin: d.dataOrigin,
        disabled: d.disabled
      }
    })
  })
  return { data: attrs, layoutWay: newLayoutWay }
}
