## 团队实战-DAY10

### 01-反馈

| 姓名 | 意见或建议                             |
| ---- | -------------------------------------- |
| ***  | webpack-打包模式（mode）这个不太清楚   |
| ***  | shushu 今天感觉有点多而懵              |
| ***  | 呃 我感觉很难受                        |
| ***  | 哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈哈哈 |
| ***  | 到公司这些配置需要自己配置吗           |
| ***  | 祝大家吃好,喝好.                       |

### 02-回顾

- webpack的配置
  - 安装webpack   webpack的命令放在scripts脚本配置
  - 打包js
  - 打包css
  - 打包less
  - 打包图片
  - 打包字体文件
  - 插件-生成HTML
  - 插件-清理dist
  - babel插件
  - 打包ES6语法
  - 兼容ES6函数   polyfill 
  - 开发时候
    - sourceMap  源码地图
    - watch 监听模式   自动打包
    - webpack-dev-server 服务器   自动刷新浏览
    - 热更新



### 03-webpack-打包vue文件

https://vue-loader.vuejs.org/zh/guide/#vue-cli

```bash
npm install -D vue-loader vue-template-compiler
```

```js
// webpack.config.js
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  module: {
    rules: [
      // ... 其它规则
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    // 请确保引入这个插件！
    new VueLoaderPlugin()
  ]
}
```

### 04-webpack-路径别名

```js
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
```

### 05-webpack-文件后缀

```diff
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
+    extensions: ['.js', '.vue', '.json', '.css']
  },
```



### 06-黑马头条打包

- npm run serve
  - 这种模式的打包，是开发阶段
  - 提供 自动刷新 热更新 
  - 打包没有结果，没有在磁盘生成项目资源，在内存中。
  - 上线：把你的项目代码 放在服务器上运行
- npm run build
  - 这种模式的打包，是上线 生产环境
  - 生成  项目资源 

上线：

- 项目代码，web服务器上运行
- 模拟上线，运行在nodejs的服务内



### 07-打包优化-路由懒加载

- 解决：首屏加载过慢。
- 当你访问那个路由，只加载这个路由需要的资源。

```js
const Login = () => import('@/views/login')
const Home = () => import('@/views/home')
const Welcome = () => import('@/views/welcome')
const Article = () => import('@/views/article')
const NotFound = () => import('@/views/404')
const Image = () => import('@/views/image')
const Publish = () => import('@/views/publish')
const Comment = () => import('@/views/comment')
const Setting = () => import('@/views/setting')
const Fans = () => import('@/views/fans')
```





### 08-打包优化-使用cdn

- cdn  是提供前端资源访问的平台    国内 bootcdn
- 解决：第三方包体积大，使用cdn加载，减少打包后的项目体积，提供访问速度。

- 方法：

  - 使用 script link 标签来引入cdn资源
  - 错误逻辑：删除对应的import，需要改项目的源码，不方便。
  - 正确逻辑：通过webpack的配置，去忽略这些import

- 需求：echarts element-ui 使用cdn优化

  - echarts cdn优化

    - 找到 cdn 地址， 通过 script link 标签来引入，在public/index.html

    - 通过webpack的配置，去忽略这些 import echarts 

      - 新建 vue.config.js 的配置文件 导出vue-clid的配置
      - 写webpack的配置  配置选中提供 configureWebpack
      - configureWebpack 写webpack的配置 它合并默认的配置

      ```js
      module.exports = {
          configureWebpack: {
              // webpack 的配置
              // 排除不需要打包的包
              externals: {
                //key是包名  //value是暴露在全局对象下的变量名  
                'echarts': 'echarts'
              }
          }
      }
      ```

  - element-ui 

  ```js
        'element-ui': 'ELEMENT',
        'vue': 'Vue'
  ```

  

