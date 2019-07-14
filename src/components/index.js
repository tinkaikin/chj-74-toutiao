
// 配置并注册 使用 install 全局组件

import MyBread from './my-bread.vue'

export default {
  install (Vue) {
    Vue.component(MyBread.name, MyBread)
  }
}
