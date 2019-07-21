<template>
  <div class="login-container">
    <el-card class="login-card">
      <img src="@/assets/images/logo_index.png" alt="logo_index.png">
      <!-- s=表单 -->
      <!-- :model="loginForm" 获取表单所有数据的集合在data里面定义好 基本必须-->
      <!-- :rules="rules"  制定表单验证规则 配合  + prop='要验证的文本框'  + 下面定义的规则  基本必须    -->
      <!-- ref="loginForm"  通过this.$refs对象获取此表单的dom对象 要对整个表单整体判断时使用  基本必须-->
      <!-- status-icon  是否在输入框中显示校验结果反馈图标  好看而已-->
      <!-- class="demo-ruleForm"  可以删掉-->
      <el-form :model="loginForm" :rules="rules" status-icon ref="loginForm" class="demo-ruleForm">
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="输入手机号码"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="loginForm.code" placeholder="输入验证码" style="width:240px"></el-input>
          <el-button
            type="success"
            plain
            style="float:right"
            v-show="show"
            @click.native="getCode"
          >发送验证码</el-button>
          <el-button type="info" plain style="float:right; width:100px" v-show="!show" >{{count}} s</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox :value="true">
            <span class="xy">我已阅读并同意</span>用户协议
            <span class="xy">和隐私</span>条款
          </el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onLogin" style="width:100%">登 基</el-button>
        </el-form-item>
      </el-form>
      <!-- e=表单 -->
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    const validateMobile = (rule, value, callback) => {
      // 规则对象  输入的内容  回调函数（验证完毕需要调用）
      // 当 callback() 成功  当前callback(new Error('错误提示'))  失败
      if (/^1[3-9]\d{9}$/.test(value)) {
        callback()
      } else {
        callback(new Error('手机号格式不正确'))
      }
    }
    return {
      loginForm: {
        mobile: '13911111111',
        code: '246810'
      },
      rules: {
        mobile: [
          {
            required: true,
            message: '请输入手机号码(13200000000)',
            trigger: 'blur'
          },
          { validator: validateMobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码(246810)', trigger: 'blur' },
          { len: 6, message: '6位数SB', trigger: 'blur' }
        ]
      },
      // 验证码参数
      count: '',
      show: true,
      timer: null
    }
  },
  methods: {
    onLogin () {
      // 可变化成 async + await 的同步写法
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          // 为true 则全部判断成功 可以提交表单验证了
          try {
            const res = await this.$http.post('authorizations', this.loginForm)
            window.sessionStorage.setItem(
              'chj74-toutiao',
              JSON.stringify(res.data.data)
            )
            clearInterval(this.timer)
            this.$router.push('/')
          } catch (error) {
            this.$message.error('手机号或验证码错误')
          }
          //   this.$http
          //     .post('authorizations', this.loginForm)
          //     .then(res => {
          //       const { status, data } = res
          //       if (status === 201) {
          //         // TODO 2. 保存用户的信息  用来判断登录的状态
          //         window.sessionStorage.setItem('chj74-toutiao', JSON.stringify(data.data))
          //         this.$router.push('/')
          //       }
          //     })
          //     .catch(() => {
          //       this.$message.error('手机号或验证码错误')
          //     })
          // } else {
          //   // 判断失败
        }
      })
    },
    // 点击发送验证码
    getCode () {
      const TIME_COUNT = 60
      if (!this.timer) {
        this.count = TIME_COUNT
        this.show = false
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--
          } else {
            this.show = true
            clearInterval(this.timer)
            this.timer = null
          }
        }, 1000)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: url("../../assets/images/login_bg.jpg") no-repeat center;
  background-size: 100% 100%;
  .login-card {
    width: 400px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    img {
      display: block;
      margin: 20px auto;
    }
  }
  .xy {
    color: #ccc;
  }
}
</style>
