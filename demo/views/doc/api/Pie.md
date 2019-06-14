### 图表介绍

Pie， 饼图。

### attrs

| 属性名           | 类型    | 默认值           | 描述                                 |
| ---------------- | ------- | ---------------- | ------------------------------------ |
| pos              | Array   | `[10%, 10%]`     | 组件左上角偏移，可设置百分比或者像素 |
| size             | Array   | `['80%','80%']`  | 组件大小，可设置百分比或者像素       |
| startAngle       | Number  | `Math.PI * -0.5` | 起始角度                             |
| endAngle         | Number  | `Math.PI * 1.5`  | 结束角度                             |
| padAngle         | Number  | `Math.PI * 1.5`  | 两扇形之间间距                       |
| radius           | Number  | `0.8`            | 外半径比例                           |
| innerRadius      | Number  | `0`              | 内半径比例                           |
| translateOnClick | Boolean | `true`           | 控制扇形被点击时是否移动             |
| rose             | Boolean | `false`          | 是否渲染玫瑰图                       |

### style

```javascript
const pie = new Pie()
pie.style('text', { color: '#fff' }
```

组件中可以自定义 css 属性的元素如下表：

| 名称            | 描述                     |
| --------------- | ------------------------ |
| sector          | 扇形样式                 |
| sector:hover    | 鼠标经过时扇形样式       |
| text            | 扇形上文字样式           |
| text:hover      | 鼠标经过时扇形上文字样式 |
| guideLine       | 指导线样式               |
| guideLine:hover | 鼠标经过时指导线样式     |
| guideText       | 指导文字样式             |
| guideText:hover | 鼠标经过时指导文字样式   |
