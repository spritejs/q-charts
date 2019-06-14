## 样式调整

:::demo

```javascript
const data = [
  { value: 3350, label: '直接访问' },
  { value: 1548, label: '搜索引擎' },
  { value: 2340, label: '联盟广告' },
  { value: 1350, label: '视频广告' },
  { value: 3100, label: '邮件营销' }
]

const { Chart, Bar, Tooltip, Axis } = qcharts

const chart = new Chart({
  container: '#app'
})

chart.source(data, {
  row: '*',
  value: 'value',
  text: 'label'
})

const bar = new Bar()
  .style('pillar', (attrs, d, i) => {
    if (i % 2 === 0) {
      return {
        border: { width: 1 },
        borderRadius: 20,
        fillColor: {
          vector: [0, 0, 0, 100],
          colors: [
            { color: '#9861E5', offset: 0 },
            { color: '#ADDF84', offset: 1 }
          ]
        }
      }
    }
    return {
      border: { width: 1 },
      opacity: 1.0,
      fillColor: {
        vector: [0, 0, 0, 100],
        colors: [
          { color: '#84E0BE', offset: 0 },
          { color: '#FBD54A', offset: 1 }
        ]
      },
      borderRadius: 20
    }
  })
  .style('pillar:hover', (attrs, data, i) => {
    if (i % 2 === 0) {
      return {
        borderRadius: 10
      }
    }
    return { opacity: 0.5, fillColor: '#FC6980' }
  })
  .style('text', (attrs, data, i) => {
    let anchor = attrs.anchor || [0, 0]
    let size = attrs.size
    let pos = attrs.pos
    return {
      rotate: 0,
      text: data.value,
      anchor: [0.5, 1],
      pos: [pos[0] + size[0] / 2, pos[1] - size[1]]
    }
  })
  .style('text:hover', (attrs, data, i) => {
    let anchor = attrs.anchor || [0, 0]
    let size = attrs.size
    let pos = attrs.pos
    return {
      font: '22px "宋体"',
      rotate: 0,
      text: data.value,
      anchor: [0.5, 1],
      pos: [pos[0] + size[0] / 2, pos[1] - size[1]]
    }
  })
  .style('backgroundpillar', { borderRadius: 10 })
  .style('backgroundpillar:hover', { borderRadius: 20 })

const tooltip = new Tooltip({
  formatter: d => `${d.label}: ${d.value}`
})

const axisBottom = new Axis()
const axisLeft = new Axis({ orient: 'left' })

chart.add([bar, tooltip, axisBottom, axisLeft])
chart.render()
```

:::

## 负值柱状图

:::demo

```javascript
const data = [
  {
    product: '茶叶',
    year: '2016',
    sales: -81.2
  },
  {
    product: '茶叶',
    year: '2017',
    sales: 121.2
  },
  {
    product: '茶叶',
    year: '2018',
    sales: -41.2
  },
  {
    product: '牛奶',
    year: '2016',
    sales: 85.2
  },
  {
    product: '牛奶',
    year: '2017',
    sales: 79.6
  },
  {
    product: '牛奶',
    year: '2018',
    sales: 81.2
  },
  {
    product: '咖啡',
    year: '2016',
    sales: -65.2
  },
  {
    product: '咖啡',
    year: '2017',
    sales: -59.6
  },
  {
    product: '咖啡',
    year: '2018',
    sales: -61.2
  },
  {
    product: '椰汁',
    year: '2016',
    sales: 35.2
  },
  {
    product: '椰汁',
    year: '2017',
    sales: 79.6
  },
  {
    product: '椰汁',
    year: '2018',
    sales: 21.2
  }
]
const { Chart, Bar, Tooltip, Axis, Legend } = qcharts
const chart = new Chart({
  container: '#app'
})
chart.source(data, {
  row: 'year',
  col: 'product',
  value: 'sales',
  text: 'product'
})
const bar = new Bar({
  transpose: false,
  barWidth: 20
})
const tooltip = new Tooltip({
  formatter: d => `${d.product} - ${d.year} - ${d.sales}`
})
const legend = new Legend({ align: ['center', 'bottom'] })
const axisBottom = new Axis()
const axisLeft = new Axis({ orient: 'left' })
chart.add([bar, tooltip, legend, axisBottom, axisLeft])
chart.render()
```

:::

## Data Update 数据更新

:::demo

```javascript
const data = [
  {
    product: '茶叶',
    year: '2016',
    sales: 81.2
  },
  {
    product: '茶叶',
    year: '2017',
    sales: 121.2
  },
  {
    product: '茶叶',
    year: '2018',
    sales: 41.2
  },
  {
    product: '牛奶',
    year: '2016',
    sales: 85.2
  },
  {
    product: '牛奶',
    year: '2017',
    sales: 79.6
  },
  {
    product: '牛奶',
    year: '2018',
    sales: 81.2
  },
  {
    product: '咖啡',
    year: '2016',
    sales: 65.2
  },
  {
    product: '咖啡',
    year: '2017',
    sales: 59.6
  },
  {
    product: '咖啡',
    year: '2018',
    sales: 61.2
  },
  {
    product: '椰汁',
    year: '2016',
    sales: 35.2
  },
  {
    product: '椰汁',
    year: '2017',
    sales: 79.6
  },
  {
    product: '椰汁',
    year: '2018',
    sales: 21.2
  }
]
const dataNew = [
  {
    product: '茶叶',
    year: '2016',
    sales: 81.2
  },
  {
    product: '茶叶',
    year: '2017',
    sales: 121.2
  },
  {
    product: '茶叶',
    year: '2018',
    sales: 41.2
  },
  {
    product: '茶叶',
    year: '2019',
    sales: 61.2
  },
  {
    product: '牛奶',
    year: '2016',
    sales: 85.2
  },
  {
    product: '牛奶',
    year: '2017',
    sales: 79.6
  },
  {
    product: '牛奶',
    year: '2018',
    sales: 81.2
  },
  {
    product: '牛奶',
    year: '2019',
    sales: 111.2
  },
  {
    product: '咖啡',
    year: '2016',
    sales: 65.2
  },
  {
    product: '咖啡',
    year: '2017',
    sales: 59.6
  },
  {
    product: '咖啡',
    year: '2018',
    sales: 61.2
  },
  {
    product: '咖啡',
    year: '2019',
    sales: 161.2
  }
]

let bool = true
const { Chart, Bar, Tooltip, Axis, Legend } = qcharts
const chart = new Chart({
  container: '#app'
})
chart.source(data, {
  row: 'year',
  col: 'product',
  value: 'sales',
  text: 'product'
})
const bar = new Bar({})
bar.style('text', true).style('text:hover', { fontSize: '22px' })
const tooltip = new Tooltip({
  formatter: d => `${d.year}: ${d.product}: ${d.sales}`
})
const legend = new Legend({ align: ['center', 'bottom'] })
const axisBottom = new Axis({ type: 'category', axisGap: true })
const axisLeft = new Axis({ orient: 'left' })
chart.add([bar, tooltip, axisBottom, axisLeft, legend])
chart.render()
setTimeout(changeData, 3000)
function changeData() {
  if (bool) {
    chart.source(dataNew, {
      row: 'year',
      col: 'product',
      value: 'sales',
      text: 'product'
    })
    bool = false
  } else {
    chart.source(data, {
      row: 'year',
      col: 'product',
      value: 'sales',
      text: 'product'
    })
    bool = true
  }
  setTimeout(changeData, 5000)
}
```

:::
