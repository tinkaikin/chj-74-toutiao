import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import router from './routers'
import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/mp/v1_0/'
})
// 请求拦截
instance.interceptors.request.use(config => {
  const user = window.sessionStorage.getItem('chj74-toutiao')
  if (user) {
    config.headers = {
      Authorization: 'Bearer ' + JSON.parse(user).token
    }
  }
  return config
}, error => {
  return Promise.reject(error)
})
// 响应拦截
instance.interceptors.response.use(response => response, error => {
  // 做一些事情
  if (error.response.status === 401) {
    // hash 哈希   是url后  #开始的字符串
    location.hash = '#/login'
  }
  return Promise.reject(error)
})

Vue.prototype.$http = instance

Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
