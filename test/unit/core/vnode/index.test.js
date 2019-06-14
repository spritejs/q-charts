import test from 'ava'
import qcharts from '@/index'

const { Chart, Pie } = qcharts

test('chart render & update', t => {
  const data = [
    {
      value: 3350,
      label: '直接访问',
      disabled: true
    },
    {
      value: 1548,
      label: '搜索引擎',
      selected: true
    },
    {
      value: 2340,
      label: '联盟广告'
    },
    {
      value: 1350,
      label: '视频广告'
    },
    {
      value: 3100,
      label: '邮件营销'
    }
  ]

  const data2 = [
    {
      value: 1350,
      label: '直接访问'
    },

    {
      value: 3340,
      label: '联盟广告'
    },
    {
      value: 2548,
      label: '搜索引擎'
    },
    {
      value: 350,
      label: '视频广告'
    },
    {
      value: 2100,
      label: '邮件营销'
    },

    {
      value: 2900,
      label: '邮件营销2'
    }
  ]

  const chart = new Chart({
    container: '#app',
    size: [400, 300]
  })

  chart.source(data, {
    row: 'label',
    col: 'value',
    value: 'value'
  })

  const pie = new Pie()
  pie
    .style('sector', { lineWidth: 2 })
    .style('sector:hover', { fillColor: 'blue' })

  chart.add([pie])
  chart.render()
  chart.source(data2)
  chart.source(data)
  t.pass()
})
