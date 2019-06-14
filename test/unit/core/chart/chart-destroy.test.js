import test from 'ava'
import qcharts from '@/index'

const { Chart, Pie, Legend } = qcharts

test('chart destroy', t => {
  const chart = new Chart({
    container: '#test',
    size: [400, 300]
  })
  chart.source([
    { value: 1350, label: '直接访问' },
    { value: 2548, label: '搜索引擎' },
    { value: 3340, label: '联盟广告' },
    { value: 350, label: '视频广告' },
    { value: 2100, label: '邮件营销' }
  ])
  chart.add([new Legend(), new Pie(), null])
  let isDestroy = false
  chart.on(chart.lifecycle.destroyed, () => {
    isDestroy = true
    t.truthy(isDestroy)
  })
  chart.render()
  chart.destroy()
})
