### API 简述

1.所有的图表都是由 `点`、`线`、`面`、`文字` 构成，其中，Qcharts 中的`点`都是由`面`来绘制。即 Qcharts 中只有三种类型图形 <b>`线`、`面`、`文字`</b>。

2.Qcharts 中所有的 Visual 和 Plugin，都包含属性`attr`和样式`style`：

```javascript
let line = new Line({ smooth: true })
```

如上代码：在初始化折线图的时候，`{smooth:true}` 就是属性 `attr`。

```javascript
line.style('point', { pointType: 'star', size: 8 })
```

如上代码：上面的代码将折线图的 point 类型设置为`star`，并将大小设置成 8。

对于有哪些属性`attr`设置，请具体参考具体的 api 文档说明，对于样式`style`的设置，`线`、`面`、`文字` 有一些通用属性，如下：

##### 线

| 名称        | 描述                                     | 值                                   |
| ----------- | ---------------------------------------- | ------------------------------------ |
| strokeColor | 颜色值（支持 spritejs 中所有的颜色类型） | #f00 , rgba(0,0,0,0.5) , transparent |
| lineWidth   | 线宽(像素 px)                            | 1 , 2 , 10                           |
| translate   | 位置变换(像素数组)                       | [-10，-10]                           |
| display     | 展现类型                                 | '','none','flex'                     |

##### 面

| 名称        | 描述       | 值                                   |
| ----------- | ---------- | ------------------------------------ |
| strokeColor | 边框颜色值 | #f00 , rgba(0,0,0,0.5) , transparent |
| fillColor   | 填充颜色值 | #f00 , rgba(0,0,0,0.5) , transparent |
| lineWidth   | 线宽(像素) | 1 , 2 , 10                           |
