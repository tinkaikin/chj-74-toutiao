<template>
  <div class="login-container">
    <el-card class="login-card">
      <img src="../../assets/images/logo_index.png" alt="">
    </el-card>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less">
.login-container{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: url('../../assets/images/login_bg.jpg') no-repeat center;
  background-size: 100% 100%;
  .login-card{
    width: 400px;
    height: 300px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    img{
      display:block;
      margin:0 auto;
    }
  }
}
</style>
