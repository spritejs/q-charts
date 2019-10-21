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

| 名称  | 说明         | 类型                  |
| ----- | ------------ | --------------------- |
| axis  | 轴体的样式   | 轴体对应 Rect 类      |
| scale | 刻度的样式   | scale 对应 Rect 类    |
| label | 轴上文本样式 | label 对应的 label 类 |
