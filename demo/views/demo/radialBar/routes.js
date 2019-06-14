export default [
  {
    title: '',
    path: '',
    redirect: 'default'
  },
  {
    title: '极坐标系柱状图',
    path: 'default',
    component: () => import('./radialBar.md')
  },
  // {
  //   title: '图表组合',
  //   path: 'compose',
  //   component: () => import('./compose.md')
  // },

  {
    title: '更多例子',
    path: 'more',
    component: () => import('./example.md')
  },

  {
    title: 'TODO',
    path: 'todo',
    component: () => import('./todo.md')
  }
]
