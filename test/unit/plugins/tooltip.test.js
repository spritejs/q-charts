import test from 'ava'
import qcharts from '@/index'

require('canvas-5-polyfill') // Path2D polyfill

const { Chart, Tooltip } = qcharts

test('tooltip', async t => {
  const chart = new Chart({
    container: '#test',
    size: [400, 300]
  })
  chart.source([1, 2, 3, 4])
  const tooltip = new Tooltip()
  chart.add(tooltip)
  chart.render()

  chart.dataset.dispatch('hover:data', null)
  t.truthy(tooltip.state.hide)

  await (() => new Promise(r => setTimeout(r, 300)))()

  chart.dataset.dispatch('hover:data', {
    layerX: 0,
    layerY: 0,
    offsetX: 0,
    offsetY: 0,
    data: { color: 'blue', text: 'red' }
  })
  t.falsy(tooltip.state.hide)

  t.pass()
})

test('tooltip pos 0', t => {
  const chart = new Chart({
    container: '#test',
    size: [400, 300]
  })
  chart.source([1, 2, 3, 4])
  const tooltip = new Tooltip()
  chart.add(tooltip)
  chart.render()

  chart.dataset.dispatch('hover:data', {
    layerX: 160,
    layerY: 240,
    offsetX: 160,
    offsetY: 240,
    data: { color: 'blue', text: 'red' }
  })
  t.falsy(tooltip.state.hide)
  t.pass()
})

test('tooltip pos 1', t => {
  const chart = new Chart({
    container: '#test',
    size: [400, 300]
  })
  chart.source([1, 2, 3, 4])
  const tooltip = new Tooltip()
  chart.add(tooltip)
  chart.render()

  chart.dataset.dispatch('hover:data', {
    layerX: 10,
    layerY: 260,
    offsetX: 10,
    offsetY: 260,
    data: { color: 'blue', text: 'red' }
  })
  t.falsy(tooltip.state.hide)
  t.pass()
})

test('tooltip pos 2', t => {
  const chart = new Chart({
    container: '#test',
    size: [400, 300]
  })
  chart.source([1, 2, 3, 4])
  const tooltip = new Tooltip()
  chart.add(tooltip)
  chart.render()

  chart.dataset.dispatch('hover:data', {
    layerX: 10,
    layerY: 150,
    offsetX: 10,
    offsetY: 150,
    data: { color: 'blue', text: 'red' }
  })
  t.falsy(tooltip.state.hide)
  t.pass()
})

test('tooltip pos 3', t => {
  const chart = new Chart({
    container: '#test',
    size: [400, 300]
  })
  chart.source([1, 2, 3, 4])
  const tooltip = new Tooltip()
  chart.add(tooltip)
  chart.render()

  chart.dataset.dispatch('hover:data', {
    layerX: 200,
    layerY: 280,
    offsetX: 200,
    offsetY: 280,
    data: { color: 'blue', text: 'red' }
  })
  t.falsy(tooltip.state.hide)
  t.pass()
})

test('tooltip pos 4', t => {
  const chart = new Chart({
    container: '#test',
    size: [400, 300]
  })
  chart.source([1, 2, 3, 4])
  const tooltip = new Tooltip()
  chart.add(tooltip)
  chart.render()

  chart.dataset.dispatch('hover:data', {
    layerX: 260,
    layerY: 80,
    offsetX: 260,
    offsetY: 80,
    data: { color: 'blue', text: 'this is a long text' }
  })
  t.falsy(tooltip.state.hide)
  t.pass()
})

test('tooltip pos 5', t => {
  const chart = new Chart({
    container: '#test',
    size: [400, 300]
  })
  chart.source([1, 2, 3, 4])
  const tooltip = new Tooltip()
  chart.add(tooltip)
  chart.render()

  chart.dataset.dispatch('hover:data', {
    layerX: -50,
    layerY: 80,
    offsetX: -50,
    offsetY: 80,
    data: { color: 'blue', text: 'this is a long text' }
  })
  t.falsy(tooltip.state.hide)
  t.pass()
})
