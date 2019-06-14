### 图表介绍
Area Chart, 面积图。

### attrs

attrs 包含若干布局属性，将这些属性放入 Object 对象传入组件

| 属性名 | 类型    | 默认值            | 描述                                 |
| ------ | ------- | ----------------- | ------------------------------------ |
| pos    | Array   | `[10%, 10%]`          | 组件左上角偏移，可设置百分比或者像素 |
| size   | Array   | `['80%','80%']` | 组件大小，可设置百分比或者像素       |
| smooth | Boolean | false             | 曲线是否平滑                         |
| axisGap | Boolean | false             | 开始绘图区域与坐标轴是否有间隙                         |
| strock | Boolean | true             | 是否堆叠                         |


### style 属性
```javascript
const area = new Area({smooth:true})
area.style('area',  function(attrs,data,i){
  if(i===0){
    return {fillColor:'transparent'}
  }
})
```
组件中可以自定义 css 属性的元素如下表：

| 名称                | 描述                                        |
| ------------------- | ------------------------------------------- |
| guideline       | 指导线样式（Rect）                                  |
| line            | 线条样式（Polyline）                                    |
| line:hover      | 鼠标 hover 时线条样式（Polyline）                      |
| area            | 面积样式设置 （Polygon）                    |
| area:hover      | 鼠标 hover 时面积样式 （Polygon）                     |
| point          | 点样式                                      |
| point:hover    | 鼠标 hover 时点样式                         |





