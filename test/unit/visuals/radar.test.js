import test from 'ava'
import qcharts from '@/index'
require('canvas-5-polyfill')

const { Chart, Radar } = qcharts

const { mount } = require('../../utils/index')

const data = [
  { label: '客服', category: '节能减排', value: 100 },
  { label: '研发', category: '节能减排', value: 47 },
  { label: '市场', category: '节能减排', value: 73 },
  { label: '扯淡', category: '节能减排', value: 48 },
  { label: '销售', category: '节能减排', value: 10 }
]

const initRadarChart = (initOpt, styleOpt) => {
  const chart = new Chart({
    container: '#test',
    size: [400, 300]
  })
  chart.source(data, {
    row: 'category',
    col: 'label',
    value: 'value',
    text: 'label'
  })
  const radar = new Radar({ ...initOpt, animation: { duration: 0 } })
  if (styleOpt) {
    Object.keys(styleOpt).forEach(style => {
      radar.style(style, styleOpt[style])
    })
  }
  chart.add(radar)
  chart.render()
  return radar
}

const findEl = (radar, elType) => {
  const node = radar.$group.childNodes[0].childNodes
  const allNode = node.reduce((pre, cur) => {
    if (cur.tagName === 'GROUP') {
      return pre.concat(cur.childNodes)
    } else {
      return pre.concat(cur)
    }
  }, [])
  return allNode.filter(n => n.attr('$elType') === elType)
}

test('radar gridType can be set correctly', t => {
  const radar = initRadarChart({ gridType: 'circle' })
  const gridEl = findEl(radar, 'grid')
  t.is(gridEl.every(e => e.tagName === 'CIRCLE'), true)
  t.pass()
})

test('radar splitNumber can be set correctly', t => {
  const radar = initRadarChart({ splitNumber: 6 })
  const gridEl = findEl(radar, 'grid')
  t.is(gridEl.length, 6)
  t.pass()
})

test('radar startAngle can be set correctly', t => {
  const radar = initRadarChart({ startAngle: 60 })
  const axisEl = findEl(radar, 'axis')
  const pt = axisEl[0].attr('points')
  const [x, y] = pt[1]
  t.is(Math.tan(60 / 180 * Math.PI).toFixed(10), (y / x).toFixed(10))
  t.pass()
})

test('radar padding can be set correctly', t => {
  const radar = initRadarChart({ padding: 50 })
  const padding = radar.$group.attr('padding')
  t.is(padding.every(p => p === 50), true)
  t.pass()
})

test('radar radius can be set correctly', t => {
  const radar = initRadarChart({ radius: 0.5 })
  const padding = radar.$group.attr('padding')
  t.is(padding.every(p => p === 50), true)
  t.pass()
})
