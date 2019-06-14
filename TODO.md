#

## 数据

## 流程

- 可视化流程
- 图形流程

## 模块

`qchart` 主要划分 3 大模块：

- `Chart` 提供绘图容器，控制 `visual` 和 `plugin`
- `Visual`：接收数据，将数据映射为具体的可视图表类型
- `Plugin`: 辅助可视图表，与之交互

```javascript
const chart = new Chart()

const visual = new Visual()
const plugin = new Plugin()

chart.add(visual).add(plugin)
chart.render()
```

### Chart

`Chart` 为 `Visual` 和 `Plugin` 提供渲染宿主，并代理 DOM 事件。单一 `chart` 上可能有多个 `visual` 和 `plugin`。

### Visual

`qcharts` 中的 `Visual` 即传统意义上的图表类型。如：`pie` 、`line` 和 `bar` 均是一种 `visual`。`Visual` 的职责为：**接收数据，渲染界面**。

`Visual` 中涉及到的操作：

1. `zoom`: 放大
2. `facet`: 分面（或分组）
3. `select`: 选中

### Plugin

`Plugin` 作为辅助插件，职责为：辅助 `Visual` **管理或展示数据** 。所以插件分为 2 类：

1. 辅助交互插件

辅助交互插件会对 `Visual` 的数据进行某些特殊操作（如 过滤、剪切），从而导致 `Visual` 可能会重新渲染。例如 `Slider` 和 `Legend`。

2. 辅助展示插件

辅助展示插件并不与 `Visual` 进行交互，只是辅助 `Visual` 更好地展示数据。例如 `趋势线` 可以帮助 `Visual` 更好地展示数据的趋势变化。

### `MVC` 设计

`Visual` 和 `Plugin` 之间的交互不应当直接修改传入的数据源，而应当对根据数据源转换后的状态进行修改。

`data` 传入 `visual` ，`visual` 根据 `data` 构建 `state`，同时 `visual` 将 `state` 派发给 `plugin`。`plugin` 根据接收的 `props` 做出合适的 `UI` 渲染，同时 `UI` 触发的动作其本质都是 `change state`。

![qchart-mvc](http://p4.qhimg.com/t01a337ee559a6de794.png)
