## Legend

当实例化 `chart` 后，向 `chart` 添加 `Legend` 插件即可，`chart.add(new Legend())`。

:::demo

```javascript
const data = [2010, 2011, 2012]
const { Chart, Legend } = qcharts

const chart = new Chart({ container: '#app' })
chart.source(data)

const l1 = new Legend({ orient: 'vertical', align: ['left', 'top'] })
const l2 = new Legend({ orient: 'vertical', align: ['left', 'bottom'] })
const l3 = new Legend({ orient: 'vertical', align: ['center', 'center'] })
const l4 = new Legend({ orient: 'vertical', align: ['right', 'top'] })
const l5 = new Legend({ orient: 'vertical', align: ['right', 'bottom'] })

chart.add([l1, l2, l3, l4, l5])

chart.render()
```

:::

### 方法

| 名称     | 说明                             | 参数                                             |
| -------- | -------------------------------- | ------------------------------------------------ |
| position | `Legend` 位置控制                | `(type: 'left' | 'top', value: String | Number)` |
| top      | 相当于 `position('top')`         | `(val: String | Number)`                         |
| left     | 相当于 `position('left')`        | `(val: String | Number)`                         |
| vertical | 控制 `Legend` 水平布局或垂直布局 | `(flag: Boolean)`                                |
