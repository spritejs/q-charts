import test from 'ava'
import qcharts from '@/index'

const { Chart, Dataset } = qcharts

test('chart source data', t => {
  const data = [
    { value: 1350, label: '直接访问' },
    { value: 2548, label: '搜索引擎' },
    { value: 3340, label: '联盟广告' },
    { value: 350, label: '视频广告' },
    { value: 2100, label: '邮件营销' }
  ]
  const chart = new Chart({
    container: '#test',
    size: [400, 300]
  })
  chart.source(data)
  t.truthy(chart.dataset)
})

test('chart source another dataset', t => {
  const data = [
    { value: 1350, label: '直接访问' },
    { value: 2548, label: '搜索引擎' },
    { value: 3340, label: '联盟广告' },
    { value: 350, label: '视频广告' },
    { value: 2100, label: '邮件营销' }
  ]
  const ds = new Dataset()
  ds.source(data)
  const chart = new Chart({
    container: '#test',
    size: [400, 300]
  })
  chart.source(ds)
  t.truthy(chart.dataset)
})

test('chart source update', t => {
  const data = [
    { value: 1350, label: '直接访问' },
    { value: 2548, label: '搜索引擎' },
    { value: 3340, label: '联盟广告' },
    { value: 350, label: '视频广告' },
    { value: 2100, label: '邮件营销' }
  ]
  const data2 = [
    { value: 3350, label: '直接访问', disabled: true },
    { value: 1548, label: '搜索引擎', selected: true },
    { value: 2340, label: '联盟广告' },
    { value: 1350, label: '视频广告' },
    { value: 3100, label: '邮件营销' }
  ]
  const ds = new Dataset()
  ds.source(data)
  const chart = new Chart({
    container: '#test',
    size: [400, 300]
  })
  let isUpdate = false
  chart.on(chart.lifecycle.updated, () => {
    isUpdate = true
    t.truthy(isUpdate)
  })
  chart.source(ds)
  chart.source(data2)
})
