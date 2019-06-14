## Donut Chart 环图

:::demo

```javascript
const data = [
  {
    year: '2001',
    population: 41.8
  },
  {
    year: '2002',
    population: 38
  },
  {
    year: '2003',
    population: 33.7
  },
  {
    year: '2004',
    population: 30.7
  },
  {
    year: '2005',
    population: 25.8
  },
  {
    year: '2006',
    population: 31.7
  },
  {
    year: '2007',
    population: 33
  },
  {
    year: '2008',
    population: 46
  },
  {
    year: '2009',
    population: 38.3
  },
  {
    year: '2010',
    population: 28
  }
]

const { Chart, Pie, Legend, Tooltip } = qcharts

const chart = new Chart({
  container: '#app'
})

chart.source(data, {
  row: 'year',
  value: 'population'
})

const pie = new Pie({ radius: 0.8, innerRadius: 0.4 })
pie.style('sector', { lineWidth: 1, color: '#fff' })
pie.style('guideLine', true)
pie.style('guideText', { fontSize: '12px' })

const legend = new Legend({ orient: 'vertical', align: ['right', 'center'] })

chart.add([pie, legend])
chart.render()
```

:::
