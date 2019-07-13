import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
import NotFound from '@/views/404'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { name: 'login', path: '/login', component: Login },
    {
      path: '/',
      component: Home,
      children: [
        { name: 'welcome', path: '/', component: Welcome }
      ]
    },
    { name: '404', path: '*', component: NotFound }
  ]
})
// 路由过滤
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const user = window.sessionStorage.getItem('chj74-toutiao')
  if (user) return next()
  next('/login')
})

export default router
