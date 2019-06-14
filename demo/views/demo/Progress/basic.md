## 基本使用

:::demo

```javascript
const data = [
  {
    sex: 'male',

    value: 63
  },

  {
    sex: 'middle',
    value: 16
  },

  {
    sex: 'female',
    value: 21
  }
]

const data2 = [
  {
    sex: 'male',

    value: 87
  },

  {
    sex: 'middle',
    value: 45
  }
]

const { Chart, Progress, Tooltip } = qcharts

const chart = new Chart({ container: '#app' })

chart.source(data, {
  row: 'sex',
  value: 'value',
  text: 'sex'
})

const colors = ['#49d088', '#FE5555', '#F4B30E', '#473C8B']

const progress = new Progress({
  min: 0,
  max: 100,
  formatter: d => `${d.value}%`,
  labelPosition: 'top',
  startAngle: Math.PI * 0.8,
  endAngle: Math.PI * 2.2
})

chart
  .add(progress)
  .add(new qcharts.Legend())
  .add(new Tooltip({ formatter: d => `${d.value}` }))

chart.render()
// ;(function step() {
//   setTimeout(() => {
//     chart.source(data2)

//     setTimeout(() => {
//       chart.source(data)
//       requestAnimationFrame(step)
//     }, 3000)
//   }, 3000)
// })()
```

:::

### 切换可视类型

目前支持 2 种类型进度图：`pie | wave`。通过 `type` 属性控制。

:::demo

```javascript
const data = [
  {
    sex: 'male',

    value: 63
  },

  {
    sex: 'middle',
    value: 16
  },

  {
    sex: 'female',
    value: 21
  }
]

const data2 = [
  {
    sex: 'male',

    value: 87
  },

  {
    sex: 'middle',
    value: 45
  }
]

const { Chart, Progress, Tooltip } = qcharts

const chart = new Chart({ container: '#app' })

chart.source(data, {
  row: 'sex',
  value: 'value',
  text: 'sex'
})

const colors = ['#49d088', '#FE5555', '#F4B30E', '#473C8B']

const progress = new Progress({
  min: 0,
  max: 100,
  type: 'wave',
  formatter: d => `${d.value}%`,
  labelPosition: 'top'
})

chart
  .add(progress)
  .add(new qcharts.Legend())
  .add(new Tooltip({ formatter: d => `${d.value}` }))

chart.render()
```

:::

### 属性

| 名称          | 说明                     | 默认值    |
| ------------- | ------------------------ | --------- |
| min           | 最小值                   | `0`       |
| max           | 最大值                   | `1`       |
| type          | 可视类型                 | `pie`     |
| hoverBg       | 鼠标经过时背景色         | `#f8f8f8` |
| label         | 是否显示文字             | `true`    |
| labelPosition | 文字位置                 | `bottom`  |
| lineWidth     | 可视组件边框大小         | `0`       |
| padding       | 可视组件边框与父容器边距 | `5`       |
| offset        | 可视组件边框内外半径差   | `10`      |

当 `type` 为 `pie` 时，额外支持：

| 名称          | 说明         | 默认值        |
| ------------- | ------------ | ------------- |
| startAngle    | 起始角度     | `Math.PI * 0` |
| endAngle      | 结束角度     | `Math.PI * 2` |
| strokeBgcolor | 背景圆环颜色 | `#ccc`        |

### 方法

| 名称      | 说明       | 参数             | 默认值   |
| --------- | ---------- | ---------------- | -------- |
| formatter | 文本格式化 | `(fn: Function)` | `d => d` |
