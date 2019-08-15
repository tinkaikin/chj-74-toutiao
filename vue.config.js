// vue.config.js 使用cnd引包的时候,配置完会忽略 把包打包
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
