## 极坐标系下堆叠柱状图

:::demo

```javascript
const data = [
  {
    year: '2014',
    type: '生活用品',
    value: 1088
  },
  {
    year: '2014',
    type: '医疗保健',
    value: 1685
  },
  {
    year: '2014',
    type: '教育文化',
    value: 1853
  },
  {
    year: '2014',
    type: '交通通信',
    value: 2267
  },
  {
    year: '2014',
    type: '其他',
    value: 900
  },
  {
    year: '2015',
    type: '生活用品',
    value: 1288
  },
  {
    year: '2015',
    type: '医疗保健',
    value: 1885
  },
  {
    year: '2015',
    type: '教育文化',
    value: 2053
  },
  {
    year: '2015',
    type: '交通通信',
    value: 2140
  },
  {
    year: '2015',
    type: '其他',
    value: 1036
  },
  {
    year: '2016',
    type: '生活用品',
    value: 1188
  },
  {
    year: '2016',
    type: '医疗保健',
    value: 1485
  },
  {
    year: '2016',
    type: '教育文化',
    value: 2353
  },
  {
    year: '2016',
    type: '交通通信',
    value: 2018
  },
  {
    year: '2016',
    type: '其他',
    value: 975
  }
]

const { Plot, Chart, Tooltip } = qcharts

const plot = new Plot('.block-demo .demo', {})

const chart = new Chart()

chart.setTitle('各年度生活各类开销一览', { color: 'red' })

const radial = chart
  .radialBar({
    radius: 0.6,
    innerRadius: 0.2,
    padAngle: 0
  })
  .source(data)
  .setDataFields({ x: 'year', y: 'value' })
  .useStyle('hover', { opacity: 0.5 })
chart.addPlugin(
  new Tooltip({ lineHight: 22 }).formatter(data => {
    return `\n${data.year}: ${data.type} 支出 ${data.value}`
  })
)

plot.addChart(chart)
plot.render()
```

:::

:::demo

```javascript
const data = [
  {
    year: '2014',
    type: '生活用品',
    value: 1088
  },
  {
    year: '2014',
    type: '医疗保健',
    value: 1685
  },
  {
    year: '2014',
    type: '教育文化',
    value: 1853
  },
  {
    year: '2014',
    type: '交通通信',
    value: 2267
  },
  {
    year: '2014',
    type: '其他',
    value: 900
  },
  {
    year: '2015',
    type: '生活用品',
    value: 1288
  },
  {
    year: '2015',
    type: '医疗保健',
    value: 1885
  },
  {
    year: '2015',
    type: '教育文化',
    value: 2053
  },
  {
    year: '2015',
    type: '交通通信',
    value: 2140
  },
  {
    year: '2015',
    type: '其他',
    value: 1036
  },
  {
    year: '2016',
    type: '生活用品',
    value: 1188
  },
  {
    year: '2016',
    type: '医疗保健',
    value: 1485
  },
  {
    year: '2016',
    type: '教育文化',
    value: 2353
  },
  {
    year: '2016',
    type: '交通通信',
    value: 2018
  },
  {
    year: '2016',
    type: '其他',
    value: 975
  }
]

const { Plot, Chart, Tooltip } = qcharts

const plot = new Plot('.block-demo:nth-of-type(2) .demo', {})

const chart = new Chart()

chart.setTitle('生活各类开销各年度一览', { color: 'red' })

const radial = chart
  .radialBar({
    radius: 0.6,
    innerRadius: 0.2,
    padAngle: 0
  })
  .source(data)
  .setDataFields({ x: 'type', y: 'value' })
  .useStyle('hover', { opacity: 0.5 })
chart.addPlugin(
  new Tooltip({ lineHight: 22 }).formatter(data => {
    return `\n${data.year}: ${data.type} 支出 ${data.value}`
  })
)

plot.addChart(chart)
plot.render()
```

:::
