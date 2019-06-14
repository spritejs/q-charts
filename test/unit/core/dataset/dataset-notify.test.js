import test from 'ava'
import qcharts from '@/index'

const { Dataset } = qcharts

test('Dataset notify', t => {
  const data = [
    { value: 1350, label: '直接访问' },
    { value: 2548, label: '搜索引擎' },
    { value: 3340, label: '联盟广告' },
    { value: 350, label: '视频广告' },
    { value: 2100, label: '邮件营销' }
  ]

  const ds = new Dataset()
  ds.source(data)
  let isUpdate = false
  const dep = {
    update() {
      isUpdate = true
    }
  }
  ds.addDep(dep)
  ds.notify()
  t.pass()
})
