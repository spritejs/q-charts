import test from 'ava'
import qcharts from '@/index'
require('canvas-5-polyfill')

const { mount } = require('../../utils/index')

const { Chart, Line } = qcharts

const data = [
  { product: '茶叶', year: '2016', sales: 81.2 },
  { product: '茶叶', year: '2017', sales: 121.2 },
  { product: '茶叶', year: '2018', sales: 41.2 },
  { product: '牛奶', year: '2016', sales: 89.2 },
  { product: '牛奶', year: '2017', sales: 79.6 },
  { product: '牛奶', year: '2018', sales: 60.2 },
  { product: '咖啡', year: '2016', sales: 35.2 },
  { product: '咖啡', year: '2017', sales: 79.6 },
  { product: '咖啡', year: '2018', sales: 61.2 },
  { product: '椰汁', year: '2016', sales: 35.2 },
  { product: '椰汁', year: '2017', sales: 79.6 },
  { product: '椰汁', year: '2018', sales: 21.2 }
]

const newData = [
  { product: '茶叶', year: '2016', sales: 181.2 },
  { product: '茶叶', year: '2017', sales: 51.2 },
  { product: '茶叶', year: '2018', sales: 31.2 },
  { product: '牛奶', year: '2016', sales: 59.2 },
  { product: '牛奶', year: '2017', sales: 179.6 },
  { product: '牛奶', year: '2018', sales: 130.2 },
  { product: '咖啡', year: '2016', sales: 135.2 },
  { product: '咖啡', year: '2017', sales: 69.6 },
  { product: '咖啡', year: '2018', sales: 91.2 },
  { product: '椰汁', year: '2016', sales: 85.2 },
  { product: '椰汁', year: '2017', sales: 59.6 },
  { product: '椰汁', year: '2018', sales: 31.2 }
]
test('line count1', async t => {
  const chart = new Chart({
    container: '#test',
    size: [400, 300]
  })
  chart.source(data, {
    row: 'year',
    value: 'sales',
    text: 'product'
  })
  const line = new Line({ smooth: true })
  chart.add(line)
  chart.render()

  await (() => new Promise(function(resolve) { setTimeout(resolve, 300) }))()

  const wrapper = mount(line.$group)
  const $lines = wrapper.find('polyline', 2)
  const $points = wrapper.find('Ellipse', 2)
  t.is($points.length, 12)
  t.is($lines.length, 3)
  t.pass()
})
test('line count2', async t => {
  const chart = new Chart({
    container: '#test',
    size: [400, 300]
  })
  chart.source(data, {
    row: 'product',
    value: 'sales',
    text: 'year'
  })
  const line = new Line({ smooth: true })
  chart.add(line)
  chart.render()

  await (() => new Promise(function(resolve) { setTimeout(resolve, 300) }))()

  const wrapper = mount(line.$group)
  const $lines = wrapper.find('polyline', 2)
  const $points = wrapper.find('Ellipse', 2)
  t.is($lines.length, 4)
  t.is($points.length, 12)
  t.pass()
})



test('line guideline', async t => {
  const chart = new Chart({
    container: '#test',
    size: [400, 300]
  })
  chart.source(data, {
    row: 'product',
    value: 'sales',
    text: 'year'
  })
  const line = new Line({ smooth: true })
  line.style('guideline', false)
  chart.add(line)
  chart.render()

  await (() => new Promise(function(resolve) { setTimeout(resolve, 300) }))()

  const wrapper = mount(line.$group)
  const $guideline = wrapper.find('Rect', 1)
  t.is($guideline.length, 0)
  t.pass()
})

test('line style', async t => {
  const chart = new Chart({
    container: '#test',
    size: [400, 300]
  })
  chart.source(data, {
    row: 'product',
    value: 'sales',
    text: 'year'
  })
  const line = new Line({ smooth: true })
  line.style('line', { color: '#f00' })
  chart.add(line)
  chart.render()

  await (() => new Promise(function(resolve) { setTimeout(resolve, 300) }))()

  const wrapper = mount(line.$group)
  const $lines = wrapper.find('Polyline', 2)
  t.is($lines[0].attr('color'), '#f00')
  t.pass()
})


test('line update', async t => {
  const chart = new Chart({
    container: '#test',
    size: [400, 300]
  })
  chart.source(data, {
    row: 'year',
    value: 'sales',
    text: 'product'
  })
  const line = new Line({ smooth: true })
  chart.add(line)
  chart.render()

  const wrapper = mount(line.$group)

  let $lines = wrapper.find('Polyline', 2)
  t.is($lines.length, 3)

  chart.source(newData, {
    row: 'product',
    value: 'sales',
    text: 'year'
  })

  await (() => new Promise(function(resolve) { setTimeout(resolve, 300) }))()


  $lines = wrapper.find('Polyline', 2)
  t.is($lines.length, 4)
  t.pass()
})


test('line guideline-mousemove', async t => {
  const chart = new Chart({
    container: '#test',
    size: [400, 300]
  })
  chart.source(data, {
    row: 'year',
    value: 'sales',
    text: 'product'
  })
  const line = new Line({ smooth: true, axisGap: true })
  chart.add(line)
  chart.render()



  await (() => new Promise(function(resolve) { setTimeout(resolve, 300) }))()
  const wrapper = mount(line.$group)
  const $guideline = wrapper.find('Rect', 1)
  line.bgMove({ offsetX: 200 }, null) // 鼠标滑入 guideline 显示
  t.is($guideline[0].attr('opacity'), 1)

  line.bgLeave({ offsetX: 0 }, null)// 鼠标滑出 guideline 隐藏
  t.is($guideline[0].attr('opacity'), 0)

  t.pass()
})
