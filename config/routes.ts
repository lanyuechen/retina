/**
 * 注意：路由定义的顺序会影响路由的解析
 */
export default [
  {
    path: '/',
    component: '@/layouts/index',
    routes: [
      { path: '/', component: '@/pages/index' },
      { path: '/room/:id', component: '@/pages/Room'},
    ]
  }
]