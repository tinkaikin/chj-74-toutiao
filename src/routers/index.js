import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
import Article from '@/views/article'
import NotFound from '@/views/404'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { name: 'login', path: '/login', component: Login },
    {
      path: '/',
      component: Home,
      children: [
        { name: 'welcome', path: '/', component: Welcome },
        { name: 'article', path: '/article', component: Article }
      ]
    },
    { name: '404', path: '*', component: NotFound }
  ]
})
// 路由守卫过滤 3个问题
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next() // 如果进入的地址是'/login', 则放行
  const user = window.sessionStorage.getItem('chj74-toutiao')
  if (user) return next() // 如果不是登录页,而且有用户信息的时候, 则放行
  next('/login') // 如果不是上面2种情况则 跳到 '/login'路径
  // next(false) 放弃当前要进入的页面
})

export default router
