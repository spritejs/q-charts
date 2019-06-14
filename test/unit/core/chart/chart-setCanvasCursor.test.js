import test from 'ava'
import qcharts from '@/index'

const { Chart } = qcharts

test('chart set canvas cursor', t => {
  const chart = new Chart({
    container: '#test',
    size: [400, 300],
    pos: [10, 10]
  })
  chart.setCanvasCursor('pointer')
  t.is(chart.canvas.style.cursor, 'pointer')
})
