// vue.config.js
module.exports = {
  configureWebpack: {
    // 选项...
    externals: {
      // 前一个是包 : 全局变量
      'echarts': 'echarts',
      'element-ui': 'ELEMENT',
      'vue': 'Vue'
    }
  }
}
