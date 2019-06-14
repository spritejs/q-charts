export default [
  {
    title: '',
    path: '',
    redirect: 'pie'
  },
  {
    title: '饼图',
    path: 'pie',
    component: () => import('./Pie.md')
  },
  {
    title: '折线图',
    path: 'line',
    component: () => import('./line-api.md')
  },
  {
    title: '面积图',
    path: 'area',
    component: () => import('./area-api.md')
  },
  {
    title: '雷达图',
    path: 'radar',
    component: () => import('./radar.md')
  },
  {
    title: '散点图',
    path: 'scatter',
    component: () => import('./scatter.md')
  },
  {
    title: '柱状图',
    path: 'bar',
    component: () => import('./bar-api.md')
  },
  {
    title: '漏斗图',
    path: 'funnel',
    component: () => import('./funnel-api.md')
  },

  {
    title: '仪表盘',
    path: 'gauge',
    component: () => import('./Gauge.md')
  }
]
