<template>
  <el-container class="home-container">
    <el-aside :width="isCollapse?'64px':'200px'" class="home-aside">
      <div class="logImg" :class='{mixLogImg:isCollapse}'></div>

      <el-menu
        :collapse="isCollapse"
        :collapse-transition="false"
        style="border-right:none"
        default-active="1"
        class="el-menu"
        background-color="#002033"
        text-color="#fff"
        active-text-color="#ffd04b">
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

    </el-aside>
    <el-container>
      <el-header class="home-header">
        <span class="el-icon-s-fold" @click="isCollapse = !isCollapse"></span>
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
export default {
  data () {
    return {
      isCollapse: false
    }
  }
}
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
    .logImg{
      height: 60px;
      background: rgb(0,40,40) url('../../assets/images/logo_admin.png') no-repeat center;
    }
    .mixLogImg{
      background-image:url('../../assets/images/logo_admin_01.png');
      background-size: 36px auto;
    }
  }
  .home-header {
    border-bottom: 1px solid #ddd;
    line-height: 60px;
    .el-icon-s-fold {
      font-size: 26px;
      vertical-align: middle;
      cursor: pointer;
    }
    .text {
      margin-left: 5px;
      vertical-align: middle;
    }
    .dropdown{
      float: right;
      .el-dropdown-link{
        cursor: pointer;
        img, b{
          vertical-align: middle;
          padding: 0 2px;
        }
      }
    }
  }
}
</style>
