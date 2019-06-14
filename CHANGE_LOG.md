# 2019-02-21

## 统一数据结构

目前，统一数据结构为 **二维表** 。

## 重新划分模块

- `series` 更名为 `visual`

## 简化流程

移除暴露 `Plot` 对象，将 `plot` 的实例化内置，从而使图表渲染流程简化。

```javascript
const chart = new Chart({
  container: '#app',
  size: ['100%', '100%'],
  forceFit: true
})

chart
  .pie({
    radius: 0.6,
    innerRadius: 0.2
  })
  .source(data)
  .setDataFields({ x: 'label', y: 'value' })

chart.render()
```

## 重构 `Chart`

重新设计 `Chart` 的 **渲染流程** 和 **生命周期** 。

<p align="center"><img src="http://dpxr-graph-bed.oss-cn-beijing.aliyuncs.com/chart-flow.png" alt="chart-flow"></p>

## 重新设计交互流程

将 `visual` 、 `plugin` 和 `chart` 之间的交互统一改为使用 `chart.event` 和 `chart.hooks`（或者叫 `chart.interactionHooks` ？） 进行 订阅和派发。

<p align="center"><img src="http://dpxr-graph-bed.oss-cn-beijing.aliyuncs.com/chart-structure.png" alt="chart-structure" height="400"></p>
