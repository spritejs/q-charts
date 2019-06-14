import test from 'ava'
import qcharts from '@/index'

const { Chart } = qcharts

test("chart cant' save in node", t => {
  const chart = new Chart({
    container: '#test',
    size: [400, 300]
  })
  t.throws(() => chart.save())
})
