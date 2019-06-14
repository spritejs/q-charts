## Nested Pie Chart 嵌套饼图

:::demo

```javascript
const data = [
  { value: 204, name: '百度' },
  { value: 451, name: '谷歌' },
  { value: 347, name: '必应' },
  { value: 256, name: '搜狗' },

  { value: 6790, name: '营销广告' },
  { value: 4548, name: '搜索引擎' },
  { value: 3350, name: '直接访问' },
  { value: 3100, name: '邮件营销' },
  { value: 2340, name: '联盟广告' },
  { value: 1350, name: '视频广告' }
]

const { Chart, Pie, Legend, Tooltip } = qcharts

const chart = new Chart({
  container: '#app'
})

chart.source(data, {
  row: 'name',
  value: 'value'
})

const ds = chart.dataset

const pie = new Pie({
  radius: 0.5
}).source(ds.selectRows(data.slice(0, 4).map(d => d.name)))
pie.color(['#5982F6', '#59CB74', '#DA65CC', '#FC6980'])
pie.style('text', { color: '#fff' })

const pie2 = new Pie({
  innerRadius: 0.6,
  radius: 0.8
}).source(ds.selectRows(data.slice(4).map(d => d.name)))

pie2.style('guideLine', true)
pie2.style('guideText', { fontSize: '12px' })

const legend = new Legend({ orient: 'vertical', align: ['right', 'center'] })
legend.color([].concat(pie.color(), pie2.color()))

chart.add([pie, pie2, legend])

chart.render()
```

:::
