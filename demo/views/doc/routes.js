import generateCommonPage from '../../utils/generateCommonPage'
import apiRoutes from './api'
import pluginsRoutes from './plugins'

export default [
  {
    title: '',
    path: '',
    redirect: 'api'
  },
  {
    title: 'Chart 图表主体',
    path: 'chart',
    component: () => import('./chart.md')
  },
  {
    title: 'Dataset 数据集',
    path: 'dataset',
    component: () => import('./dataset.md')
  },
  {
    title: 'API',
    path: 'api',
    component: generateCommonPage('/doc/api/', apiRoutes),
    children: apiRoutes
  },

  {
    title: 'Plugin',
    path: 'plugin',
    component: generateCommonPage('/doc/plugin/', pluginsRoutes),
    children: pluginsRoutes
  },



  
  // {
  //   title: '自定义样式',
  //   path: 'style',
  //   component: () => import('./style.md')
  // },
]
