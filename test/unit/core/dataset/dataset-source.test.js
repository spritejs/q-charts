import test from 'ava'
import qcharts from '@/index'

const { Dataset } = qcharts

test('Dataset source array of number', t => {
  const ds = new Dataset()
  const data = [1, 2, 3, 4, 5]
  ds.source(data)
  t.deepEqual(ds.dataOrigin, data)
  t.is(typeof ds.data[0], 'object')
})

test('Dataset source [[data]] will be flatterned', t => {
  const ds = new Dataset()
  const data = [[1, 2, 3, 4], 2, 3, 4, 5]
  ds.source(data)
  t.is(ds.data.length, 8)
})

test('Dataset source data<object> will be reactive', t => {
  const ds = new Dataset()
  const data = [
    ({ value: 1350, label: '直接访问' },
    { value: 2548, label: '搜索引擎' },
    { value: 3340, label: '联盟广告' },
    { value: 350, label: '视频广告' },
    { value: 2100, label: '邮件营销' })
  ]
  ds.source(data)

  const target = ds.data[0]
  target.value = 2900
  t.is(target.dataOrigin.value, 2900)
})

test('Dataset source data<number> will be reactive', t => {
  const ds = new Dataset()
  const data = [1, 2, 3]
  ds.source(data)
  const target = ds.data[0]
  target.value = 4
  t.deepEqual(target.dataOrigin, { value: 4 })
})

test('Dataset could source another dataset', t => {
  const ds = new Dataset()
  const ds2 = new Dataset()
  const data = [
    ({ value: 1350, label: '直接访问' },
    { value: 2548, label: '搜索引擎' },
    { value: 3340, label: '联盟广告' },
    { value: 350, label: '视频广告' },
    { value: 2100, label: '邮件营销' })
  ]
  ds.source(data)
  ds2.source(ds)
  t.deepEqual(ds2.dataOrigin, data)
})

test('Dataset source null will throw error', t => {
  const ds = new Dataset()
  t.throws(() => ds.source(null))
})
