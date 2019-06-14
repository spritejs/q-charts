import test from 'ava'
import qcharts from '@/index'

const { Dataset } = qcharts

test('Dataset hoverData', t => {
  const data = [
    { value: 1350, label: '直接访问' },
    { value: 2548, label: '搜索引擎' },
    { value: 3340, label: '联盟广告' },
    { value: 350, label: '视频广告' },
    { value: 2100, label: '邮件营销' }
  ]

  const ds = new Dataset()
  ds.source(data, { row: 'label', value: 'sales' })
  let target = { value: 1350, label: '直接访问' }
  ds.on('hover:data', d => {
    t.deepEqual(d, target)
  })
  ds.hoverData(target)
})
