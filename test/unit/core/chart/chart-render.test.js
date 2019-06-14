import test from 'ava'
import qcharts from '@/index'

const { Chart, Pie, Legend } = qcharts

test("chart cant' render child without render method", t => {
  const chart = new Chart({
    container: '#test',
    size: [400, 300]
  })
  chart.add({
    update() {}
  })
  t.throws(() => chart.render())
})

test('chart can not render without source data', t => {
  const chart = new Chart({
    container: '#test',
    size: [400, 300]
  })
  chart.add([new Legend(), new Pie(), null])
  t.throws(() => chart.render())
})

test('chart render', t => {
  const chart = new Chart({
    container: '#test',
    size: [400, 300]
  })
  chart.source([1, 2, 3, 4])
  chart.add([new Legend(), new Pie(), null])
  let isRender = false
  chart.on(chart.lifecycle.rendered, () => {
    isRender = true
    t.truthy(isRender)
  })
  chart.render()
})
