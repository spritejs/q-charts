import test from 'ava'
import qcharts from '@/index'
require('canvas-5-polyfill')



const { mount } = require('../../utils/index')

const { Chart, Pie } = qcharts

test('pie radius', async t => {
  const chart = new Chart({
    container: '#test',
    size: [400, 300]
  })
  chart.source([1, 2, 3, 4])
  const pie = new Pie({
    radius: 0.6,
    innerRadius: 0.4,
    startAngle: 0,
    endAngle: Math.PI * 2
  })
  chart.add(pie)
  chart.render()

  await (() => new Promise(r => setTimeout(r, 300)))()

  const wrapper = mount(pie.$group)
  const $pies = wrapper.find('ring', 2)
  t.is($pies[0].attr('endAngle'), (Math.PI * 2 * 1) / 10)
  t.pass()
})

test("sector's lineWidth would be 0 if sectors number <= 1", async t => {
  const chart = new Chart({
    container: '#test',
    size: [400, 300]
  })
  chart.source([1])
  const pie = new Pie({
    radius: 0.6,
    innerRadius: 0.4
  })
  pie.style('sector', { lineWidth: 2 })
  chart.add(pie)
  chart.render()

  await (() => new Promise(r => setTimeout(r, 300)))()

  const wrapper = mount(pie.$group)
  const $pies = wrapper.find('ring', 2)
  t.is($pies[0].attr('lineWidth'), 0)
  t.pass()
})

test('pie rose', t => {
  const chart = new Chart({
    container: '#test',
    size: [400, 300]
  })
  chart.source([1, 2, 3, 4])
  const pie = new Pie({
    rose: true,
    startAngle: Math.PI * 1,
    endAngle: Math.PI * 1.5
  })
  chart.add(pie)
  chart.render()
  t.pass()
})

test('pie padAngle', t => {
  const chart = new Chart({
    container: '#test',
    size: [400, 300]
  })
  chart.source([1, 2, 3, 4])
  const pie = new Pie({
    padAngle: 0.1
  })
  chart.add(pie)
  chart.render()
  t.pass()
})

test('pie text', t => {
  const chart = new Chart({
    container: '#test',
    size: [400, 300]
  })
  chart.source([1, 2, 3, 4])
  const pie = new Pie()
  pie.style('text', { color: '#fff' })
  pie.style('text:hover', { color: 'red' })
  chart.add(pie)
  chart.render()
  t.pass()
})

test('pie guideLine', t => {
  const chart = new Chart({
    container: '#test',
    size: [400, 300]
  })
  chart.source([1, 2, 3, 4])
  const pie = new Pie()
  pie.style('guideLine', { color: 'red' })
  pie.style('guideLine:hover', (attrs, data, i) => ({ color: 'blue' }))
  chart.add(pie)
  chart.render()
  t.pass()
})

test('pie guideText', t => {
  const chart = new Chart({
    container: '#test',
    size: [400, 300]
  })
  chart.source([1, 2, 3, 4])
  const pie = new Pie()
  pie.style('guideText', true)
  pie.style('guideText:hover', (attrs, data, i) => ({ color: 'blue' }))

  chart.add(pie)
  chart.render()
  t.pass()
})

test('pie mouseevent', async t => {
  const chart = new Chart({
    container: '#test',
    size: [400, 300]
  })
  chart.source([1, 2, 3, 4])
  const pie = new Pie({
    radius: 0.6,
    innerRadius: 0.4,
    startAngle: 0,
    endAngle: Math.PI * 2
  })
  chart.add(pie)
  chart.render()

  await (() => new Promise(r => setTimeout(r, 300)))()

  const wrapper = mount(pie.$group)
  const $pies = wrapper.find('ring', 2)
  let data

  chart.dataset.on('hover:data', d => {
    data = d
  })

  wrapper.simulate($pies[0], 'mousemove')
  t.is(chart.canvas.style.cursor, 'pointer')
  t.is(typeof data, 'object')

  wrapper.simulate($pies[0], 'mouseleave')
  t.is(chart.canvas.style.cursor, 'default')
  t.is(data, null)

  t.pass()
})

test('pie click event', async t => {
  const chart = new Chart({
    container: '#test',
    size: [400, 300]
  })
  chart.source([1, 2, 3, 4])
  const pie = new Pie({
    radius: 0.6,
    innerRadius: 0.4,
    startAngle: 0,
    endAngle: Math.PI * 2
  })
  chart.add(pie)
  chart.render()

  await (() => new Promise(r => setTimeout(r, 300)))()

  const wrapper = mount(pie.$group)
  const $pies = wrapper.find('ring', 2)

  wrapper.simulate($pies[0], 'click')
  t.truthy($pies[0].isTranslated)
  t.pass()
})

test("pie won't transalte if set pie.attr('translateOnClick', false) ", async t => {
  const chart = new Chart({
    container: '#test',
    size: [400, 300]
  })
  chart.source([1, 2, 3, 4])
  const pie = new Pie({
    translateOnClick: false
  })
  chart.add(pie)
  chart.render()

  await (() => new Promise(r => setTimeout(r, 300)))()

  const wrapper = mount(pie.$group)
  const $pies = wrapper.find('ring', 2)

  wrapper.simulate($pies[0], 'click')
  t.falsy($pies[0].isTranslated)
  t.pass()
})

test('pie will update if data change', t => {
  const chart = new Chart({
    container: '#test',
    size: [400, 300]
  })
  chart.source([1, 2, 3, 4])
  const pie = new Pie({
    rose: true,
    startAngle: Math.PI * 1,
    endAngle: Math.PI * 1.5
  })
  chart.add(pie)

  chart.render()
  chart.source([1, 2, 3, 4, 5])
  t.pass()
})
