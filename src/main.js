import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import router from './routers'
// 导入axios实例
import instance from './api/axios'
import Componnets from './components'
Vue.use(Componnets)
Vue.prototype.$http = instance

Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
