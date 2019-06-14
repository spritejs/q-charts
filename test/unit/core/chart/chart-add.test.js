import test from 'ava'
import qcharts from '@/index'

const { Chart, Pie, Legend } = qcharts

test('chart add visual', t => {
  const chart = new Chart({
    container: '#test',
    size: [400, 300]
  })
  chart.add(new Pie())
  t.is(chart.visuals.length, 1)
})

test('chart add plugin', t => {
  const chart = new Chart({
    container: '#test',
    size: [400, 300]
  })
  chart.add(new Legend())
  t.is(chart.plugins.length, 1)
})

test('chart add visual & plugin', t => {
  const chart = new Chart({
    container: '#test',
    size: [400, 300]
  })
  chart.add([new Legend(), new Pie(), null])
  t.is(chart.getChildren().length, 2)
})
