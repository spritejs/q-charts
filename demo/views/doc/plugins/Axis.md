### 插件介绍

Axis， 坐标轴。

#### attr 属性：

| 名称   | 说明         | 类型 | 可选值                          | 默认值   |
| ------ | ------------ | ---- | ------------------------------- | -------- |
| orient | 坐标轴的方向 |      | ['top','right','bottom','left'] | 'bottom' |

#### style 样式：

```javascript
const axis = new Axis({ orient: 'left' })
axis.style('scale', false)
```

| 名称  | 基本类型 | 说明             |
| ----- | -------- | ---------------- |
| axis  | 线       | 坐标轴样式       |
| scale | 线       | 坐标轴上的刻度   |
| label | 文本     | 坐标轴上文本类型 |
