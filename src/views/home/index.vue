<template>
  <el-container class="home-container">
    <el-aside width="200px" class="home-aside">Aside</el-aside>
    <el-container>
      <el-header class="home-header">
        <span class="el-icon-s-fold"></span>
        <span class="text">江苏痔疮播客教育株式会社</span>
        <el-dropdown class="dropdown">
          <span class="el-dropdown-link">
            <img width="30" height="30" src="../../assets/images/avatar.jpg" alt="">
            <b>嘿嘿小哥</b><i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-setting">个人设置</el-dropdown-item>
            <el-dropdown-item icon="el-icon-unlock">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.home-container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  .home-aside {
    background-color: #002033;
  }
  .home-header {
    border-bottom: 1px solid #ddd;
    line-height: 60px;
    .el-icon-s-fold {
      font-size: 26px;
      vertical-align: middle;
    }
    .text {
      margin-left: 5px;
      vertical-align: middle;
    }
    .dropdown{
      float: right;
      .el-dropdown-link{
        img, b{
          vertical-align: middle;
          padding: 0 2px;
        }
      }
    }
  }
}
</style>
