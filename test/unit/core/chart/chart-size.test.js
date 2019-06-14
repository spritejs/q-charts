import test from 'ava'
import qcharts from '@/index'

const { Chart } = qcharts

test('chart size', t => {
  const chart = new Chart({
    container: '#test',
    size: [400, 300]
  })
  const size = chart.getSize()
  t.deepEqual(size, [400, 300])
})
