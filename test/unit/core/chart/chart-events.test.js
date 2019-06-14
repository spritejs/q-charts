import test from 'ava'
import qcharts from '@/index'

const { Chart, Pie } = qcharts

test('chart events on', t => {
  const chart = new Chart({
    container: '#test',
    size: [400, 300]
  })
  chart.source([1, 2, 3, 4])
  let isInvoke = false
  chart.on(chart.lifecycle.rendered, () => {
    isInvoke = true
    t.truthy(isInvoke)
  })
  chart.render()
})

test('chart events once', t => {
  const chart = new Chart({
    container: '#test',
    size: [400, 300]
  })
  chart.source([1, 2, 3, 4])
  let count = 0
  const pie = new Pie()
  pie.once('hi', () => count++)

  chart.add(pie)
  chart.render()

  chart.emit('hi')
  chart.emit('hi')
  t.is(count, 1)
})

test('chart events off', t => {
  const chart = new Chart({
    container: '#test',
    size: [400, 300]
  })
  chart.source([1, 2, 3, 4])
  let count = 0
  const pie = new Pie()
  pie.on('hi', () => count++)

  chart.add(pie)
  chart.render()

  chart.emit('hi')
  pie.off('hi')
  chart.emit('hi')

  t.is(count, 1)
})
