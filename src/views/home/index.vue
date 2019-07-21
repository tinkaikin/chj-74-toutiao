<template>
  <el-container class="home-container">
    <el-aside :width="isCollapse?'64px':'200px'" class="home-aside">
      <div class="logImg" :class='{mixLogImg:isCollapse}'></div>
      <!-- router 开启路由切换功能 必填 -->
      <!-- :collapse="isCollapse"  根据true/false 来展开和收起 要加下面把动画关掉 非必填-->
      <!-- :collapse-transition="false" 非必填-->
      <!-- style="border-right:none" 非必填-->
      <!-- :default-active="$route.path"  动态的根据url来匹配下面的路径  必填-->
      <!-- router 开启路由切换功能 必填 -->
      <el-menu
        router
        :collapse="isCollapse"
        :collapse-transition="false"
        style="border-right:none"
        :default-active="$route.path"
        class="el-menu"
        background-color="#002033"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/article">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/image">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/publish">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="/comment">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="/fans">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="/setting">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header class="home-header">
        <span class="el-icon-s-fold" @click="isCollapse = !isCollapse"></span>
        <span class="text">黑马头条你值得拥有株式会社</span>
        <el-dropdown class="dropdown">
          <span class="el-dropdown-link">
            <img width="30" height="30" :src="photo" alt="">
            <b>{{name}}</b><i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-setting" @click.native="setting">个人设置</el-dropdown-item>
            <el-dropdown-item icon="el-icon-unlock" @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import eventBus from '@/eventBus'
export default {
  data () {
    return {
      isCollapse: false, // 控制导航展开和闭合,X
      photo: '', // 用户头像,从token里获取,X
      name: '' // 用户名,X
    }
  },
  created () {
    const userInfo = JSON.parse(sessionStorage.getItem('chj74-toutiao'))
    this.photo = userInfo.photo
    this.name = userInfo.name
    // 非父子组件传值
    eventBus.$on('upDataUserInfo', (data) => {
      this.name = data
      userInfo.name = data
      window.sessionStorage.setItem('chj74-toutiao', JSON.stringify(userInfo))
    })
    eventBus.$on('upDataPhoto', (photo) => {
      this.photo = photo
      userInfo.photo = photo
      window.sessionStorage.setItem('chj74-toutiao', JSON.stringify(userInfo))
      this.$message.success('头像更新成功')
    })
  },
  methods: {
    setting () {
      // 跳转页面
      this.$router.push('/setting')
    },
    logout () {
      // 退出登录 跳,remove token
      window.sessionStorage.removeItem('chj74-toutiao')
      this.$router.push('/login')
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
        img{
          border-radius: 50%;
        }
        img, b{
          vertical-align: middle;
          padding: 0 2px;
        }
      }
    }
  }
}
</style>
