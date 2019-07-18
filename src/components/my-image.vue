<template>
  <div class='my-image-container'>

    <div class="img-btn"  @click="openDialog">
      <img :src="value" alt="">
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      width="700px">
      <!-- s=插入具体内容 -->
      <el-tabs v-model="activeName" type="card" v-loading="loading">
        <el-tab-pane label="素材" name="image">
          <!-- 素材里面的内容 -->
          <div style="marginBottom:20px">
            <el-radio-group size="small"
            v-model="queryData.collect"
            @change="collectChange">
              <el-radio-button :label="false">全部</el-radio-button>
              <el-radio-button :label="true">收藏</el-radio-button>
            </el-radio-group>
          </div>
          <div
            class="imgList"
            :class="{searched:selectedImageUrl===item.url}"
            v-for="item in uploadImgList"
            :key="item.id"
            @click="searched(item.url)">
            <img :src="item.url" alt="">
          </div>
          <el-pagination
            v-if="total>queryData.per_page"
            @current-change="currentChange"
            background
            layout="prev, pager, next"
            :page-size="queryData.per_page"
            :current-page="queryData.page"
            :total="total">
          </el-pagination>
        </el-tab-pane>
        <!-- 上传图片 -->
        <el-tab-pane label="上传图片" name="upload">
          <!-- s=上传组件 -->
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :show-file-list="false"
            :on-success="handleImgSuccess"
            :headers="headers"
            name='image'
          >
          <!-- 定义图片的地址 必填-->
            <img v-if="uploadImageUrl" :src="uploadImageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <!-- e=上传组件 -->
        </el-tab-pane>
      </el-tabs>
      <!-- e=插入具体内容 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="okButton">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import defaultImg from '../assets/images/default.png'
export default {
  name: 'my-image',
  data () {
    return {
      loading: false, // 加载动画
      dialogVisible: false, // 对话框
      activeName: 'image', // tab标签切换 image/upload
      queryData: {
        collect: false, // false 为全部
        page: 1,
        per_page: 8 // 每页数量
      },
      total: 0, // 总页数
      uploadImgList: [], // 图片列表
      selectedImageUrl: null, // 收藏图片的地址
      headers: { Authorization: 'Bearer ' + JSON.parse(window.sessionStorage.getItem('chj74-toutiao')).token },
      uploadImageUrl: null, // 上传图片
      value: defaultImg // 默认图片
    }
  },
  methods: {
    // 确定按钮
    okButton () {
      if (this.activeName === 'image') {
        if (!this.selectedImageUrl) return this.$message('请选择素材')
        this.value = this.selectedImageUrl
      } else {
        if (!this.uploadImageUrl) return this.$message('请上传素材')
        this.value = this.uploadImageUrl
      }
      this.dialogVisible = false
    },
    // 上传
    handleImgSuccess (res, file) {
      this.uploadImageUrl = res.data.url
    },
    // 选中图片
    searched (url) {
      this.selectedImageUrl = url
    },
    // 弹出对话框
    openDialog () {
      this.dialogVisible = true
      this.uploadImageUrl = null
      this.selectedImageUrl = null
      this.getimgListData()
    },
    // 分页
    currentChange (nowPage) {
      this.queryData.page = nowPage
      this.getimgListData()
    },
    // 获取数据
    async getimgListData () {
      // 来个获取动画
      this.loading = true
      const { data: { data } } = await this.$http.get('user/images', { params: this.queryData })
      // 获取成功
      this.uploadImgList = data.results
      this.total = data.total_count
      this.loading = false
    },
    // 切换全部/收藏
    collectChange () {
      // 回到第一页
      this.queryData.page = 1
      // 切换重新获取数据
      this.getimgListData()
    }
  }
}
</script>

<style scoped lang='less'>
.imgList{
    position: relative;
    display: inline-block;
    width: 140px;
    height: 140px;
    margin-bottom: 20px;
    margin-right: 20px;
    border: 1px dashed #ddd;
    img{
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    &.searched{
      &::before{
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, .2) url('../assets/images/selected.png') no-repeat center / 50px 50px;
      }
    }
}
.img-btn{
    width: 150px;
    height: 150px;
    border: 1px dashed #ddd;
    img{
      width: 100%;
      height: 100%;
    }
  }

</style>
