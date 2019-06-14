## 布局调整


:::demo

```javascript
const data = [2010, 2011, 2012]
const { Chart, Legend } = qcharts

const chart = new Chart({ container: '#app' })
chart.source(data)

const l1 = new Legend({ orient: 'vertical', align: ['left', 'top'] })
const l2 = new Legend({ orient: 'vertical', align: ['left', 'center'] })
const l3 = new Legend({ orient: 'vertical', align: ['left', 'bottom'] })
const l4 = new Legend({ orient: 'vertical', align: ['center', 'top'] })
const l5 = new Legend({ orient: 'vertical', align: ['center', 'center'] })
const l6 = new Legend({ orient: 'vertical', align: ['center', 'bottom'] })
const l7 = new Legend({ orient: 'vertical', align: ['right', 'top'] })
const l8 = new Legend({ orient: 'vertical', align: ['right', 'center'] })
const l9 = new Legend({ orient: 'vertical', align: ['right', 'bottom'] })

const legends = [l1, l2, l3, l4, l5, l6, l7, l8, l9]

chart.add(legends)

chart.render()
```

:::
