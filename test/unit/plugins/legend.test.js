import test from 'ava'
import qcharts from '@/index'

const { Chart, Legend } = qcharts

test('legend pos', t => {
  const chart = new Chart({
    container: '#test',
    size: [400, 300]
  })
  chart.source([1, 2, 3, 4])
  const legend = new Legend({ pos: [20, 30] })
  const legend2 = new Legend({ pos: ['2%', '3%'] })
  chart.add(legend).add(legend2)
  chart.render()
  t.pass()
})

test('legend vertical', t => {
  const chart = new Chart({
    container: '#test',
    size: [400, 300]
  })
  chart.source([1, 2, 3, 4])
  const legend = new Legend({ vertical: false })
  chart.add(legend)
  chart.render()
  t.pass()
})

test('legend changePage', async t => {
  const chart = new Chart({
    container: '#test',
    size: [400, 50]
  })
  chart.source([1, 2, 3, 4, 5, 6, 7, 8, 9, 0])
  const legend = new Legend()
  chart.add(legend)
  chart.render()

  let page = legend.state.page

  await (() => new Promise(r => setTimeout(r, 100)))()

  legend.changePage()()
  legend.changePage('prev')()
  t.is(legend.state.page, page)
  t.pass()
})

test('legend layoutBy', t => {
  const chart = new Chart({
    container: '#test',
    size: [400, 300]
  })
  chart.source([1, 2, 3, 4])
  const legend = new Legend({ layoutBy: 'cols' })
  chart.add(legend)
  chart.render()

  const data = legend.handleData()
  t.deepEqual(data, ['0', '1', '2', '3'])
  t.pass()
})

test('legend changeDataSetData', t => {
  const chart = new Chart({
    container: '#test',
    size: [400, 300]
  })
  chart.source([1, 2, 3, 4])
  const legend = new Legend({ layoutBy: 'cols' })
  chart.add(legend)
  chart.render()

  legend.changeDataSetData('0', 'disabled', true)
  legend.changeDataSetData('1', 'state', 'hover')

  const ds = chart.dataset

  const ret0 = ds.selectRow('0')[0]
  const ret1 = ds.selectRow('1')[0]

  t.truthy(ret0.disabled)
  t.is(ret1.state, 'hover')
})

test('legend source data', t => {
  const chart = new Chart({
    container: '#test',
    size: [400, 300]
  })
  chart.source([1, 2, 3, 4])
  const legend = new Legend()
  legend.source(['0', '1'])
  chart.add(legend)
  chart.render()
  const data = legend.handleData()
  t.deepEqual(data, ['0', '1'])
  t.pass()
})
