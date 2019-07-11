<template>
  <div class="login-container">
    <el-card class="login-card">
      <img src="../../assets/images/logo_index.png" alt="logo_index.png">
      <!-- s=表单 -->
      <el-form :model="loginForm" :rules="rules" status-icon ref="loginForm" class="demo-ruleForm">
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="输入手机号码"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="loginForm.code" placeholder="输入验证码" style="width:240px"></el-input>
          <el-button type="info" plain style="float:right">发送验证码</el-button>
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
        mobile: '',
        code: ''
      },
      rules: {
        mobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { validator: validateMobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码(246810)', trigger: 'blur' }

        ]
      }
    }
  },
  methods: {
    onLogin () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          // 为true 则全部判断成功 可以提交表单验证了
        } else {
          // 判断失败
        }
      })
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
