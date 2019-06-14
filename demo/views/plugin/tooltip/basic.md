## Tooltip

当实例化 `chart` 后，向 `chart` 添加 `Tooltip` 插件即可，`chart.add(new Tooltip())`。

:::demo

```javascript
const data = [1, 2, 3, 4, 5]

const { Chart, Pie, Legend, Tooltip } = qcharts

const chart = new Chart({
  container: '#app',
  size: ['100%', '100%']
})

chart.source(data)

const pie = new Pie()

const tooltip = new Tooltip({ formatter: d => d.value })

chart.add([pie, tooltip])
chart.render()
```

:::

### 属性

| 名称      | 说明                                               | 默认值                             |
| --------- | -------------------------------------------------- | ---------------------------------- |
| pos       | 位置控制                                           | `null`（注意一旦设置，位置将固定） |
| title     | 标题设置，可以传入 `string`，也可以传入 `function` | `null`                             |
| formatter | 文本格式化                                         | `d => d.value || d`                |
