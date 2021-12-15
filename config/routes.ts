/**
 * 注意：路由定义的顺序会影响路由的解析
 */
export default [
  {
    path: '/',
    component: '@/layouts/index',
    routes: [
      { path: '/', component: '@/pages/index'},
      { path: '/entry', component: '@/pages/Entry'},
      { path: '/room/:id', component: '@/pages/Room'},
      { component: './404' },
    ]
  },
  {
    component: './404',
  },
]