<template>
  <div class='setting-container'>
    <el-card>
      <div slot="header">
        <my-bread>个人设置</my-bread>
      </div>
      <el-row>
        <el-col :span="12"><div class="grid-content bg-purple">
        <!-- 左边 -->
          <el-form :model="reqParams" label-width="120px">
            <el-form-item label="编号">{{reqParams.id}}</el-form-item>
            <el-form-item label="手机">{{reqParams.mobile}}</el-form-item>
            <el-form-item label="媒体名称">
              <el-input v-model="reqParams.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍">
              <el-input type="textarea" rows="4" v-model="reqParams.intro"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="reqParams.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="updataUserInfo">保存设置</el-button>
            </el-form-item>
          </el-form>
        </div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple-light">
          <!-- 右边区域 -->
          <el-upload
            class="avatar-uploader"
            action=""
            :show-file-list="false"
            :http-request="myHttpRequest"
          >
            <img v-if="reqParams.photo" :src="reqParams.photo" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <p style="text-align:center; font-size:14px;">更换头像</p>
        </div></el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import eventBus from '@/eventBus'
export default {
  data () {
    return {
      reqParams: {
        id: null,
        name: null,
        intro: null, // 头条号简介
        photo: null, // 更改头像地址
        email: null,
        mobile: null
      }
    }
  },
  created () {
    // 获取用户信息
    this.getUserInfo()
  },
  methods: {
    // 使用自己的请求方法 http-request 调用这个属性会替她原生的请求 隐性携带参数
    myHttpRequest (data) {
      // 使用 axios 上传文件 只能用 formData
      const fd = new FormData()
      fd.append('photo', data.file)
      this.$http.patch('user/photo', fd).then((res) => {
        const { data: { data } } = res
        this.reqParams.photo = data.photo
        eventBus.$emit('upDataPhoto', data.photo)
      })
    },
    // namestring非必须用户名 introstring非必须头条号简介 emailstring非必须邮箱  PATCH   user/profile
    // 保存更改
    async updataUserInfo () {
      const { data: { data } } = await this.$http.patch('user/profile', {
        name: this.reqParams.name,
        intro: this.reqParams.intro,
        email: this.reqParams.email
      })
      this.$message.success('修改成功')
      // 把数据传到home组件里
      eventBus.$emit('upDataUserInfo', data.name)
      // 把本地数据库重新更改 在home组件里完成了
    },
    async getUserInfo () {
      const { data: { data } } = await this.$http.get('user/profile')
      this.reqParams = data
    }
  }
}
</script>

<style scoped lang='less'>

</style>
