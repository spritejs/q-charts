import test from 'ava'
import qcharts from '@/index'

const { Chart } = qcharts

test('chart pos number', t => {
  const chart = new Chart({
    container: '#test',
    size: [400, 300],
    pos: [10, 10]
  })
  const pos = chart.getPos()
  t.deepEqual(pos, [10, 10])
})

test('chart pos percent', t => {
  const chart = new Chart({
    container: '#test',
    size: [400, 300],
    pos: ['2%', '10%']
  })
  const pos = chart.getPos()
  t.deepEqual(pos, [8, 30])
})
