/**
 * 饼图的布局算法
 */
/**
 * 为 扇形 设置 padAngle
 * @param {*} arr
 * @param {*} padAngle
 */
const attachPadAngleOfArr = (arr, padAngle = 0) => {
  // 设置 padAngle
  const maxPadAngle = Math.min.apply(
    null,
    arr.map(a => a.endAngle - a.startAngle)
  )

  if (padAngle > 0) {
    padAngle = padAngle > maxPadAngle ? maxPadAngle / 2 : padAngle

    arr.forEach(a => {
      a.startAngle += padAngle / 2
      a.endAngle -= padAngle / 2
    })
  }
}

const TAU = Math.PI * 2

export default function pieLayout() {
  let value = v => v
  let startAngle = 0
  let endAngle = TAU
  let padAngle = 0

  function divide(num, total) {
    if (total <= 0) {
      return 0
    }

    return num / total
  }

  function pie(data) {
    let i = 0
    let len = data.length
    let sum = 0
    let arcs = new Array(len)

    while (i < len) {
      if (!data[i].disabled) {
        sum += value(data[i])
      }

      i++
    }

    i = 0

    while (i < len) {
      const sa = i >= 1 ? arcs[i - 1].endAngle : startAngle // 起始角度
      const proportion = divide(value(data[i]), sum) // 占比
      const ea = data[i].disabled
        ? sa
        : sa + proportion * (endAngle - startAngle) // 结束角度

      arcs[i] = Object.assign({}, data[i], {
        index: i,
        startAngle: sa,
        endAngle: ea,
        padAngle: padAngle,
        proportion
      })

      i++
    }

    attachPadAngleOfArr(arcs, padAngle)

    return arcs
  }

  pie.value = val => {
    value = val
    return pie
  }

  pie.startAngle = angle => {
    startAngle = angle
    return pie
  }

  pie.endAngle = angle => {
    endAngle = angle
    return pie
  }

  pie.padAngle = angle => {
    padAngle = angle
    return pie
  }

  return pie
}
