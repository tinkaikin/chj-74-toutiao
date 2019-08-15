## 黑马头条后台管理项目-DAY02

### 01-反馈

| 姓名 | 意见或建议                                                   |
| ---- | ------------------------------------------------------------ |
| ***  | 感觉vue和node.js差不多呀！！                                 |
| ***  | 老师好棒棒 讲的真是细致入微 今天还带着帮我们CSS复习了一遍 超级奶爸真不是盖的 |
| ***  | 大刚,不瞒你说你真帅                                          |
| ***  | 1.怎么感觉这个和阿里百秀的项目有点像啊..node.js学的不好,不影响这吧.......o(╥﹏╥)o 2.讲课的视频声音太小了,希望刚哥录视频时声音大点.. |
| ***  | 非常好                                                       |
| ***  | 不错不错,挺好挺好                                            |
| ***  | 一个vue项目是否可以创建多个路由,每个功能分别创建一个路由     |
| ***  | 为什么用了ESLint后 console.log 总是报错 修改不了             |
| ***  | 发一个写好的案例吧...我写了个表单,我同桌说特丑!!!我不活了!!!! |
| ***  | 淑淑 你好棒                                                  |
| ***  | 崔刚说他比你帅 不接受反驳 我要是不这么写 (我要是不这么写他就要打我) |
| ***  | 老师讲的很详细，希望后面一直保持这个节奏                     |
| ***  | 好乱啊怎么办                                                 |
| ***  | 老师，能不能发点预习资料，还有就是下课拖堂没关系，希望不要着急得讲知识点，还有就是视频里声音有点小 |
| ***  | 最后一步创建login分支,从login分支上写的登录,怎样提交到gitub,怎样在gitub上看到我们提交的内容,有些模糊. |
| ***  | 老师 我在source tree上删除了本地仓库和书签 结果 我保存项目的整个文件夹都没了 里面除了项目还有别的文件 为啥也被删了 而且咋恢复 |

### 02-回顾

分支提交：

- 开始  master 分支
- 做了几次提交
-  提交master分支到远程仓库   git push 远程仓库地址 master
- 登录 login 分支   git checkout -b login
- 做了几次提交
-  提交login分支到远程仓库   git push 远程仓库地址 login

具体回顾：

- vue-cli 怎么创建项目
  - babel 解析ES6语法
  - esLint 代码规范（standard config）
  - less 
- 自己构建src的目录
- 把项目路由规则约定
  - 登录模块



###03-登录模块-绘制表单

- 使用element-ui提供的组件，步骤：
  - 根据需求，去找到需要的组件
  - 去看示例，是否有适合的demo
  - 去看源码，要去分析（试一试） ，明白结构的含义。
    - 提供标签  属性  事件 函数 的文档
  - 根据需求，修改代码
  - 在项目使用即可。

分析组件结构：

```html
<!-- 表单容器 -->
<!-- ref="form" 将来操作DOM -->
<!-- :model="form" 将来需要提交的数据对象 -->
<!-- label-width="80px" 是文字说明标签宽度 -->
<el-form ref="form" :model="form">
  <!-- 表单每一项的容器 label="活动名称" 文字说明-->
  <el-form-item>
	<!-- 表单元素 -->
    <el-input v-model="form.name"></el-input>
  </el-form-item>
</el-form>
<script>
  export default {
    data() {
      return {
        form: {
          name: ''
        }
      }
    }
  }
</script>
```

最终代码：

```html
<!-- 登录表单 -->
      <el-form ref="loginForm" :model="loginForm">
        <el-form-item>
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="loginForm.code" placeholder="请输入验证码" style="width:240px"></el-input>
          <el-button style="float:right">发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox :value="true" >我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button style="width:100%" type="primary">登 录</el-button>
        </el-form-item>
      </el-form>
```

绑定数据：

```js
data () {
    return {
      loginForm: {
        mobile: '',
        code: ''
      }
    }
  }
```

### 04-登录模块-添加校验

- 表单组件提供了校验的方式
- 得到信息：
  - 给el-form绑定校验规则对象  通过 rules 属性
  - 表单元素需要校验效果，在表单元素的所处的表单想el-form-item,加上prop属性指定校验规则的字段

- 指定字段具体的校验规则

```html
<el-form ref="loginForm" :status-icon="true" :model="loginForm" :rules="loginRules">
```

```html
<el-form-item prop="mobile">
```

```js
// 表单验证规则对象
      loginRules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      }
```



**添加自定义的校验：**

- 在框架有自己的校验规则，但是无法满足你的需要。
- 有一个字段 validator 指定自定义校验规则的函数
- 校验规则函数提前申明，在data()的return之前
- 函数有约定：
  - 参数 （rule,value,callback） 分别是:规则对象  输入的内容  回调函数（验证完毕需要调用）
  - 当 callback() 成功  当前callback(new Error('错误提示'))  失败

```js
// 校验手机号
    const checkMobile = (rule, value, callback) => {
      // 校验逻辑   把value拿出来进行手机号的格式校验
      if (/^1[3-9]\d{9}$/.test(value)) {
        callback()
      } else {
        callback(new Error('手机号格式不正确'))
      }
    }
```

```js
mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],
```



### 05-登录模块-整体校验

- 给el-form加上一个属性 ref="ruleForm"
- 获取到 el-form 组件的dom对象  this.$refs.ruleForm
- dom可以调用组件提供的函数  validate（callback）
- 插入回调函数 (valid) => {  }  valid 判断是否校验成功的

```html
<el-form ref="loginForm" >
```

```js
login () {
      // 对整个表单进行校验
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          // 提交登录请求
        }
      })
    }
```



### 06-登录模块-进行登录

- 输入手机号   13911111111
- 获取验证码   发送请求给后台  调用运营商的接口  发短信给你
- 输入验证码   246810
- 进行提交

以上的是测试帐号，请不要随意使用。

- 使用安卓手机 下载APP 黑马头条
- 使用  自己的手机号  和 默认的验证码  246810 进行登录
- 在PC端的后台管理系统，直接登录。

```js
 // 提交登录请求  axios是基于primise封装的 post() 返回值一个promise对象
          this.$http
            .post(
              'http://ttapi.research.itcast.cn/mp/v1_0/authorizations',
              this.loginForm
            )
            .then(res => {
              // res 是 响应对象  包含 后台返回的数据 res.data
              // console.log(res.data) 去做什么事情？？？
              // 1. 跳转到首页
              // TODO 2. 保存用户的信息  用来判断登录的状态
              this.$router.push('/')
            })
            .catch(() => {
              // 提示
              this.$message.error('手机号或验证码错误')
            })
```







### 07-首页模块-路由与组件

```js
 { name: 'home', path: '/', component: Home }
```

vue文件

```html
<template>
  <div class='container'>Home</div>
</template>

<script>
export default {}
</script>

<style scoped lang='less'></style>

```

### 08-首页模块-基础布局

```html
<template>
  <el-container class="home-container">
    <el-aside class="my-aside" width="200px">Aside</el-aside>
    <el-container>
      <el-header class="my-header">Header</el-header>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {}
</script>

<style scoped lang='less'>
.home-container{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  .my-aside{
    background: #002033;
  }
  .my-header{
    border-bottom: 1px solid #ddd;
  }
}
</style>

```

头部的内容：

- 图标
- 文字
- 下拉菜单

```html
<el-header class="my-header">
        <span class="el-icon-s-fold"></span>
        <span class="text">江苏传智播客科技教育有限公司</span>
        <el-dropdown style="float:right">
          <span class="el-dropdown-link">
            <img style="vertical-align:middle" width="30" height="30" src="../../assets/images/avatar.jpg" alt="">
            <b style="vertical-align:middle;padding-left:5px">黑马小哥</b>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-setting">个人设置</el-dropdown-item>
            <el-dropdown-item icon="el-icon-unlock">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
```

css:

```less
.my-header {
    border-bottom: 1px solid #ddd;
    line-height: 60px;
    .el-icon-s-fold {
      font-size: 26px;
      vertical-align: middle;
    }
    .text {
      vertical-align: middle;
      padding-left: 10px;
    }
  }
```





### 09-首页模块-导航菜单组件

```html
<!-- 菜单容器 -->
<!-- default-active 激活菜单样式  通过指定菜单项的index的值 -->
<!-- background-color 背景颜色 -->
<!-- text-color 字体颜色 -->
<!-- active-text-color 激活的时候字体颜色 -->
<el-menu
      default-active="2"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <!-- el-submenu 有下一级菜单的容器 -->
      <!-- el-menu-item 没有有下一级菜单的容器 -->
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
    </el-menu>
```

最终在页面上使用的代码：

```html
 <el-menu
        style="border-right:none"
        default-active="1"
        background-color="#002033"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="1">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="5">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="6">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="7">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
```

交互功能：点击图标  切换侧边栏的收起与展开

- 侧边栏的宽度   200px   64px
- 导航菜单的折叠：属性collapse来控制的
  - false 展开
  - true 收起
- logo的切换
  -  展开  大logo图片
  - 收起   小logo图片

```js
 data () {
    return {
      collapse: false
    }
  },
```

```js
 methods: {
    toggleMenu () {
      this.collapse = !this.collapse
    }
  }
```

三个内容的切换:

```html
<el-aside class="my-aside" :width="collapse?'64px':'200px'">
```

```html
<div class="logo" :class="{close:collapse}"></div>
```

```html
<el-menu
        :collapse="collapse"
        :collapse-transition="false"
      >
```

样式:

```css
.close{
      background-image:url(../../assets/images/logo_admin_01.png);
      background-size: 36px auto;
    }
```







### 10-首页模块-欢迎页面



### 11-首页模块-404页面



### 12-接口知识-postman工具



### 13-接口知识-token令牌



### 14-axios-默认配置项



### 15-axios-提取封装



### 16-axios-结合async&await使用







 

