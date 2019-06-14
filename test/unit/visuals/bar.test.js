import test from 'ava'
import qcharts from '@/index'
require('canvas-5-polyfill')

const { mount } = require('../../utils/index')

const { Chart, Bar } = qcharts

test('bar width', async t => {
  const chart = new Chart({
    container: '#test',
    size: [400, 300]
  })
  chart.source([1, 2, 3, 4])
  const bar1 = new Bar()
  const bar2 = new Bar({ barWidth: 20 })
  const bar3 = new Bar({ transpose: true })
  const bar4 = new Bar({ transpose: true, barWidth: 20 })
  chart.add(bar1)
  chart.add(bar2)
  chart.add(bar3)
  chart.add(bar4)
  chart.render()

  await (() => new Promise(r => setTimeout(r, 300)))()

  const wrapper1 = mount(bar1.$group)
  const $bars1 = wrapper1.find('sprite', 2)
  t.is($bars1[0].attr('width'), 40)
  const wrapper2 = mount(bar2.$group)
  const $bars2 = wrapper2.find('sprite', 2)
  t.is($bars2[0].attr('width'), 20)
  const wrapper3 = mount(bar3.$group)
  const $bars3 = wrapper3.find('sprite', 2)
  t.is($bars3[0].attr('height'), 30)
  const wrapper4 = mount(bar4.$group)
  const $bars4 = wrapper4.find('sprite', 2)
  t.is($bars4[0].attr('height'), 20)
  t.pass()
})

test('bar will update if data change', async t => {
  const chart = new Chart({
    container: '#test',
    size: [400, 300]
  })
  chart.source([1, 2, 3, 4])
  const bar = new Bar()
  chart.add(bar)
  chart.render()

  await (() => new Promise(r => setTimeout(r, 300)))()

  const wrapper = mount(bar.$group)
  const $bars = wrapper.find('sprite', 2)
  t.is($bars[0].attr('width'), 40)

  chart.source([1, 2, 3, 4, 5])
  await (() => new Promise(r => setTimeout(r, 500)))()

  t.is($bars[0].attr('width'), 32)

  t.pass()
})

test('bar transpose', async t => {
  const chart = new Chart({
    container: '#test',
    size: [400, 300]
  })
  chart.source([1, 2, 3, 4])
  const bar = new Bar({
    transpose: true
  })
  chart.add(bar)
  chart.render()

  await (() => new Promise(r => setTimeout(r, 300)))()

  const wrapper = mount(bar.$group)
  const $bars = wrapper.find('sprite', 2)
  t.is($bars[0].attr('height'), 30)

  t.pass()
})

test('bar stack', async t => {
  const chart = new Chart({
    container: '#test',
    size: [400, 300]
  })
  chart.source([1, 2, 3, 4])
  const bar = new Bar({
    stack: true
  })
  chart.add(bar)
  chart.render()

  await (() => new Promise(r => setTimeout(r, 300)))()

  const wrapper = mount(bar.$group)
  const $bars = wrapper.find('sprite', 2)
  t.is($bars[0].attr('width'), 160)

  const $bgBars = wrapper.find('rect', 2)
  t.is($bgBars[0].attr('width'), 320)

  t.pass()
})

test('bar text', async t => {
  const chart = new Chart({
    container: '#test',
    size: [400, 300]
  })
  chart.source([1, 2, 3, 4])
  const bar = new Bar()
  bar.style('text', { color: '#fff' })
  bar.style('text:hover', { color: 'red' })
  chart.add(bar)
  chart.render()

  await (() => new Promise(r => setTimeout(r, 300)))()
  const wrapper = mount(bar.$group)
  const $labels = wrapper.find('label', 2)
  t.is($labels[0].attr('color'), 'rgba(255,255,255,1)')
  wrapper.simulate($labels[0], 'mousemove')
  t.is($labels[0].attr('color'), 'rgba(255,0,0,1)')
  t.pass()
})

test('bar pillar', async t => {
  const chart = new Chart({
    container: '#test',
    size: [400, 300]
  })
  chart.source([1, 2, 3, 4])
  const bar = new Bar()
  bar.style('pillar', { color: 'red' })
  bar.style('pillar:hover', (attrs, data, i) => ({ color: 'blue' }))
  chart.add(bar)
  chart.render()
  await (() => new Promise(r => setTimeout(r, 300)))()
  const wrapper = mount(bar.$group)
  const $bars = wrapper.find('sprite', 2)
  t.is($bars[0].attr('color'), 'red')

  wrapper.simulate($bars[0], 'mousemove')
  t.is($bars[0].attr('color'), 'rgba(0,0,255,1)')

  t.pass()
})

test('bar backgroundpillar', async t => {
  const chart = new Chart({
    container: '#test',
    size: [400, 300]
  })
  chart.source([1, 2, 3, 4])
  const bar = new Bar()
  bar.style('backgroundpillar', true)
  bar.style('backgroundpillar:hover', (attrs, data, i) => ({ color: 'blue' }))

  chart.add(bar)
  chart.render()

  await (() => new Promise(r => setTimeout(r, 300)))()
  const wrapper = mount(bar.$group)
  const $bars = wrapper.find('rect', 2)
  t.is($bars[0].attr('opacity'), 0.00001)

  wrapper.simulate($bars[0], 'mousemove')
  t.is($bars[0].attr('opacity'), 0.1)

  t.pass()
})

test('bar mouseevent', async t => {
  const chart = new Chart({
    container: '#test',
    size: [400, 300]
  })
  chart.source([1, 2, 3, 4])
  const bar = new Bar({})
  chart.add(bar)
  chart.render()

  await (() => new Promise(r => setTimeout(r, 300)))()

  const wrapper = mount(bar.$group)
  const $bars = wrapper.find('rect', 2)
  let data

  chart.dataset.on('hover:data', d => {
    data = d
  })

  wrapper.simulate($bars[0], 'mousemove')
  t.is(typeof data, 'object')

  wrapper.simulate($bars[0], 'mouseleave')
  t.is(data, null)

  t.pass()
})
