import test from 'ava'
import qcharts from '@/index'
import BaseNode from '@/core/BaseNode'

const { Dataset } = qcharts

test("BaseNode setState won't update immediate unless set immediate true", t => {
  const node = new BaseNode()
  node.updata = () => {}
  t.throws(() => node.setState({ updateNow: false }, true))
})

test('BaseNode can receive data to render', t => {
  const node = new BaseNode()
  node.source([
    { value: 1350, label: '直接访问' },
    { value: 2548, label: '搜索引擎' },
    { value: 3340, label: '联盟广告' },
    { value: 350, label: '视频广告' },
    { value: 2100, label: '邮件营销' }
  ])
  t.pass()
})

test('BaseNode can receive a dataset', t => {
  const node = new BaseNode()
  node.updata = () => {}

  const ds = new Dataset()
  ds.source([
    { value: 1350, label: '直接访问' },
    { value: 2548, label: '搜索引擎' },
    { value: 3340, label: '联盟广告' },
    { value: 350, label: '视频广告' },
    { value: 2100, label: '邮件营销' }
  ])
  node.source(ds)
  t.pass()
})
