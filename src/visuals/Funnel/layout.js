export default function funnelLayout() {
  function funnel(dataInfo) {
    // 输入
    const data = dataInfo.data
    const size = dataInfo.size
    const align = dataInfo.align
    const pyramid = dataInfo.pyramid
    // 输出
    const polygons = []

    const max = data[0][0].__valueGetter__()
    const widthFactory = size[0] / max
    const POLYGON_NUM = computerLegend(data) // 图例显示个数
    let flag = 0 // 计算当前polygon前面有几个被隐藏
    for (let i = 0, len = data.length; i < len; i++) {
      let polygon = { strokeColor: 'transparent', points: [] }
      const value = data[i][0].__valueGetter__()
      let offset = 0
      let textAnchor = [0, 0.5]
      if (align === 'center') {
        textAnchor = [0.5, 0.5]
        offset = 0.5
      } else if (align === 'right') {
        offset = 1
        textAnchor = [1, 0.5]
      }
      polygon.points.push([
        (max - value) * offset * widthFactory,
        (size[1] * (i - flag)) / POLYGON_NUM
      ])
      polygon.points.push([
        (max * offset + value * (1 - offset)) * widthFactory,
        (size[1] * (i - flag)) / POLYGON_NUM
      ])
      if (i - flag + 1 < POLYGON_NUM) {
        let counter = 1

        while (data[i + counter][0].disabled === true) {
          counter++
        }
        const nextValue = data[i + counter][0].__valueGetter__()

        polygon.points.push([
          (max * offset + nextValue * (1 - offset)) * widthFactory,
          (size[1] * (i - flag + 1)) / POLYGON_NUM
        ])
        polygon.points.push([
          (max - nextValue) * offset * widthFactory,
          (size[1] * (i - flag + 1)) / POLYGON_NUM
        ])
      } else {
        if (pyramid) {
          polygon.points.push([offset * size[0], size[1]])
        } else {
          polygon.points.push([
            (max * offset + value * (1 - offset)) * widthFactory,
            (size[1] * (i - flag + 1)) / POLYGON_NUM
          ])
          polygon.points.push([
            (max - value) * offset * widthFactory,
            (size[1] * (i - flag + 1)) / POLYGON_NUM
          ])
        }
      }
      polygon.opacity = 1
      if (data[i][0].disabled === true) {
        polygon.points[3] = polygon.points[0]
        polygon.points[2] = polygon.points[1]
        polygon.opacity = 0
        flag++
      }
      polygon.labelAttrs = {
        opacity: !data[i][0].disabled ? 1 : 0,
        text: Math.round((100 * value) / max) + '%',
        anchor: textAnchor,
        pos: [
          size[0] * offset + (0.5 - offset) * 10,
          ((i - flag + 0.5) * size[1]) / POLYGON_NUM
        ],
        fillColor: '#FFF',
        fontSize: '12px'
      }
      polygons.push(polygon)
    }

    return polygons
  }

  function computerLegend(data) {
    let flag = 0
    for (let i = 0, len = data.length; i < len; i++) {
      if (data[i][0].disabled !== true) {
        flag++
      }
    }
    if (flag === 0) {
      console.warn('data invalid!')
    }
    return flag || 1
  }
  return funnel
}
