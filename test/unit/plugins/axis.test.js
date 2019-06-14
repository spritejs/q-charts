import test from 'ava'
import qcharts from '@/index'
require('canvas-5-polyfill')

const { mount } = require('../../utils/index')

const { Chart, Axis, Bar } = qcharts

const data = [
  { month: 'Jan', city: 'London', value: 3.9 },
  { month: 'Feb', city: 'London', value: 4.2 },
  { month: 'Mar', city: 'London', value: 5.7 },
  { month: 'Apr', city: 'London', value: 8.5 },
  { month: 'May', city: 'London', value: 11.9 },
  { month: 'Jun', city: 'London', value: 15.2 }
]

const newData = [
  { month: 'Jan', city: 'London', value: 6 },
  { month: 'Feb', city: 'London', value: 4.2 },
  { month: 'Mar', city: 'London', value: 5.7 },
  { month: 'Apr', city: 'London', value: 80 },
  { month: 'May', city: 'London', value: 30.9 },
  { month: 'Jun', city: 'London', value: 15.2 }
]

test('axis render', async t => {
  const chart = new Chart({
    container: '#test',
    size: [400, 300]
  })
  chart.source(data, {
    row: 'city',
    value: 'value',
    text: 'month'
  })
  const bar = new Bar({ transpose: true })
  const axis = new Axis({ orient: 'bottom' })
  // const axisLeft = new Axis({ orient: 'left' })
  const axisRight = new Axis({ orient: 'right', type: 'category' })
  const axisTop = new Axis({ orient: 'top' })
  chart.add([bar, axis, axisRight, axisTop])
  chart.render()

  await (() => new Promise(function(resolve) { setTimeout(resolve, 300) }))()

  const wrapper = mount(axis.$group)
  const $axis = wrapper.find('rect', 1)
  const $labels = wrapper.find('label', 2)
  t.is($axis.length, 1)
  t.is($labels.length, 5)

  const wrapper1 = mount(axisRight.$group)
  const $labels1 = wrapper1.find('label', 2)
  t.is($labels1.length, 6)


  t.pass()
})


test('axis update', async t => {
  const chart = new Chart({
    container: '#test',
    size: [400, 300]
  })
  chart.source(data, {
    row: 'city',
    value: 'value',
    text: 'month'
  })
  const axis = new Axis({ orient: 'left' })
  chart.add(axis)
  chart.render()
  const wrapper = mount(axis.$group)

  await (() => new Promise(function(resolve) { setTimeout(resolve, 100) }))()

  let $axis = wrapper.find('rect', 1)
  let $labels = wrapper.find('label', 2)
  t.is($axis.length, 1)
  t.is($labels.length, 5)


  chart.source(newData, {
    row: 'city',
    value: 'value',
    text: 'month'
  })

  await (() => new Promise(function(resolve) { setTimeout(resolve, 100) }))()

  $axis = wrapper.find('rect', 1)
  $labels = wrapper.find('label', 2)
  t.is($axis.length, 1)
  t.is($labels.length, 6)
  t.pass()
})

test('axis axisgap', async t => {
  const chart = new Chart({
    container: '#test',
    size: [400, 300]
  })
  chart.source(data, {
    row: 'city',
    value: 'value',
    text: 'month'
  })
  const axis = new Axis({ orient: 'left', axisGap: true })
  chart.add(axis)
  chart.render()
  const wrapper = mount(axis.$group)

  await (() => new Promise(function(resolve) { setTimeout(resolve, 100) }))()

  let $axis = wrapper.find('rect', 1)
  let $labels = wrapper.find('label', 2)
  t.is($axis.length, 1)
  t.is($labels.length, 5)
  t.not($labels[4].attr('translate')[1], 0)

  t.pass()
})
