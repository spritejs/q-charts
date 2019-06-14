# QCharts

## 快速开始

### 特点

QCharts 是一个基于 <a target="_blank" href="https://www.spritejs.com">spritejs</a> 封装的图表库，可以让用户以组件的形式组合出各种图表。 <a target="_blank" href="https://www.spritejs.com/q-charts/">→详细文档</a>，Demo：<a target="_blank" href="https://github.com/yaotaiyang/q-charts-demo">Quickstart</a>

### 如何使用

1.通过 npm 获取 QCharts，我们提供了 QCharts npm 包，通过下面的命令即可完成安装

```shell
npm install @qcharts/core --save
```
```javascript
// 通过模块引入的方式使用CatCharts
import { Chart, Pie, Tooltip, Legend } from '@qcharts/core'
```

2.通过 cdn 获取 CatCharts，通过下面的标签引入 CatCharts，因为CatCharts依赖Vue与spritejs，所以需要先引入这两个

```html
<script src="https://unpkg.com/spritejs/dist/spritejs.min.js"></script>
<script src="https://unpkg.com/@qcharts/core/lib/index.js"></script>
```
```javascript
// 通过cdn的方式使用CatCharts
const { Chart, Pie, Tooltip, Legend } = qcharts
```

### 开始绘制图表
完成一个 QCharts 的组件或者页面

```javascript
const data = [
  { date: '05-01',catgory:'图例一', sales: 15.2 },
  { date: '05-02',catgory:'图例一', sales: 39.2 },
  { date: '05-03',catgory:'图例一', sales: 31.2 },
  { date: '05-04',catgory:'图例一', sales: 65.2 },
  { date: '05-05',catgory:'图例一', sales: 55.2 },
  { date: '05-06',catgory:'图例一', sales: 75.2 },
  { date: '05-07',catgory:'图例一', sales: 95.2 },
  { date: '05-08',catgory:'图例一', sales: 65.2 },
]

const { Chart, Line, Legend, Tooltip, Axis } = qcharts

const chart = new Chart({
  container: '#app'
})

chart.source(data, {
  row: 'catgory',
  value: 'sales',
  text: 'date'
})

const line = new Line()
line.style('point',{color:'#fff'})

const tooltip = new Tooltip({
  formatter: function(data) {
    return `${data.date} ${data.sales}`
  }
})

const axisBottom = new Axis()

const axisLeft = new Axis({ orient: 'left' })
.style('axis',false).style('scale',false)

const legend = new Legend({ align: ['center', 'bottom'] })
.style('icon',{borderRadius:10}).style('text',{fontSize:12})

chart.add([line, tooltip, axisBottom, axisLeft, legend])
chart.render()
```

一张折线图就绘制成功

<img src="https://p0.ssl.qhimg.com/d/inn/717a6a22789a/base-line.png" width="400">


