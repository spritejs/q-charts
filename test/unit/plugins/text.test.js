import test from 'ava'
import qcharts from '@/index'

const { Chart, Text } = qcharts

test('text', t => {
  const chart = new Chart({
    container: '#test',
    size: [400, 300]
  })
  chart.source([1, 2, 3, 4])
  const text = new Text({ pos: [10, 10] })
  chart.add(text)
  chart.render()

  t.pass()
})
