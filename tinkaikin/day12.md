## 团队实战-DAY12

### 问题答疑



#### 01-样式自定义

```less
// 1. 如果在此处 scoped 当前组件下生效样式
// 2. 在style中的所有选择器 编译的时候会自动带上属性选择器
// 3. .box{} ===> .box[data-v-2c9827a4]{} 交集选择器
// 4. 在当前组件下暴露的标签都会加上 data-v-2c9827a4 属性
// 5. 但是如果是组件，其他组件内部的标签是不会加上这个属性 意味写组件内部的样式是不会生效的
// 6. 其他组件的样式都不会生效
```

####02-提交分支代码需要用户名与密码

- https的协议推送
  - 自己的用户名和密码
- ssh协议推送
  - 把公钥配置在你的个人设置下
  - 免用户名和密码推送



####03-接口422错误

- 422 参数错误
  - 没有传
  - 传的字段有问题
  - 字段数据类型有问题
- 接口文档描述不准确



####04-试题录入-选项思路

- 对应 option 对象去理解
  - isRight 是否正确  对应选中效果
  - code 是选项的编号  A B C D 
  - title 是选项的内容
  - img 是选项的描述图片



#### 05-学科管理-删除

- 再试试



#### 06-精选题库-修改和删除接口未找到

- 试试基础题库的修改和删除接口





#### 07-axios的封装

```js
// 创建一个新的axios实例
const instance = axios.create({
  // 配置选项
  // 基准地址 process.env.BASE_API
  // process 系统进程对象（NODEJS内置）
  // process.env 系统环境变量（在你的计算机-->属性--->高级设置--->环境变量）  
  // 环境变量：当你安装nodejs的时候 完成之后检查安装成功 node -v
  // node 命令 去系统环境变量中找到nodejs的安装路径 调用nodejs的执行程序
  // 环境变量：记录信息在系统环境中
  // process.env.BASE_API 是 基准路径 
  // 存储的位置：webpack的配置文件中操作  BASE_API 数据
  baseURL: process.env.BASE_API,
  // 请求超时时间  
  timeout: 5000 
})
```

```JS
// url 请求路径  method 请求类型  data 请求参数
export const createAPI = (url, method, data) => {
  // 空对象  axios  配置对象  
  let config = {}
  if (method === 'get') {
    // params 是url？后的传参
    config.params = data
  } else {
    // 除去get请求其他请求类型的参数都是 请求体传参  
    config.data = data
  }
  // this.$http.get() post() put() patch() delete() 快捷调用
  // 统一调用  this.$http({配置对象})
  // url 请求地址  method 请求类型  如果是get参数使用 params 如果是请求体传参 data  
  return instance({
    url,
    method,
    // ... 展开运算  
    // 展开config对象，将对象下的属性合并单当前的配置对象中  
    ...config
  })
}
```

使用：

```js
import { createAPI } from '@/utils/request'

// 目录列表
export const list = data => createAPI('/directorys', 'get', data)
```









