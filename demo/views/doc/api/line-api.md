### 图表介绍
Line Chart, 折线图。


### 属性 attrs

通过设置Line的属性来产生不同的样式，包含若干属性

| 属性名 | 类型    | 默认值            | 描述                                 |
| ------ | ------- | ----------------- | ------------------------------------ |
| pos    | Array   | `[10%, 10%]`          | 组件左上角偏移，可设置百分比或者像素 |
| size   | Array   | `['80%','80%']` | 组件大小，可设置百分比或者像素       |
| smooth | Boolean | false             | 曲线是否平滑                         |
| axisGap | Boolean | false             | 开始绘图区域与坐标轴是否有间隙          |


### style 属性
```javascript
const line = new Line({ smooth: true })
line.style('point',{pointType: 'star',size:8})
```
组件中可以自定义 css 属性的元素如下表：

| 名称                | 描述                                        |
| ------------------- | ------------------------------------------- |
| guideline       | 指导线样式  （Rect）                                        |
| line            | 线条样式  （Polyline）                                  |
| line:hover      | 鼠标 hover 时线条样式 （Polyline）                        |
| point          | 点样式                                      |
| point:hover    | 鼠标 hover 时点样式                         |





