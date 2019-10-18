export default [
  {
    title: '',
    path: '',
    redirect: 'pie'
  },
  {
    title: 'Pie',
    path: 'pie',
    component: () => import('./Pie.md')
  },
  {
    title: 'Line',
    path: 'line',
    component: () => import('./line-api.md')
  },
  {
    title: 'Area',
    path: 'area',
    component: () => import('./area-api.md')
  },
  {
    title: 'Radar',
    path: 'radar',
    component: () => import('./radar.md')
  },
  {
    title: 'Scatter',
    path: 'scatter',
    component: () => import('./scatter.md')
  },
  {
    title: 'Bar',
    path: 'bar',
    component: () => import('./bar-api.md')
  },
  {
    title: 'Funnel',
    path: 'funnel',
    component: () => import('./funnel-api.md')
  },

  {
    title: 'Gauge',
    path: 'gauge',
    component: () => import('./Gauge.md')
  },

  {
    title: 'RadialBar',
    path: 'radialBar',
    component: () => import('./RadialBar.md')
  }
]
