<template>
  <div class="img" v-loading="loading">
    <el-card>
      <div slot="header">
        <my-bread>素材管理</my-bread>
      </div>
      <div class="car-body-t">
        <el-radio-group size="small" v-model="queryData.collect" @change="collectChange">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <!-- 右边的普通按钮 1.图标太大-->
        <el-button style="float:right" type="success" size="small" @click="dialogVisible=true">上传素材</el-button>
      </div>
      <!-- s=图片展示部分 1.样式-->
      <ul class="img-list">
        <li v-for="item in imgList" :key="item.id">
          <img :src="item.url" alt="" @click="previewImg(item.url)">
          <!-- 收藏和删除按钮 -->
          <div class="fot" v-if="!queryData.collect">
            <span class="el-icon-star-off" :class="{red:item.is_collected}" @click="toggleFav(item)"></span>
            <span class="el-icon-delete" @click="deleteBtn(item.id)"></span>
          </div>
        </li>
      </ul>
      <!-- 分页器 -->
      <el-pagination
        v-if="total>queryData.per_page"
        @current-change="pageChange"
        background
        layout="prev, pager, next, jumper"
        :page-size="queryData.per_page"
        :current-page="queryData.page"
        :total="total">
      </el-pagination>
      <!-- e=图片展示部分 -->
    </el-card>
    <!-- 对话框组件 -->
    <el-dialog
      title="添加素材"
      :visible.sync="dialogVisible"
      width="500px"
    >
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
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <!-- e=上传组件 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" :disabled="imageUrl===null">关 闭</el-button>
      </span>
    </el-dialog>
    <!-- s=测试第图片弹出框 -->
      <el-dialog
        :visible.sync="dialogImg"
        width="50%">
        <img :src="dialogImgUrl" alt="" width="100%" height="100%">
      </el-dialog>
    <!-- e=测试第图片弹出框 -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 预览图片
      dialogImg: false,
      dialogImgUrl: null,

      queryData: {
        collect: false, // false 为全部
        page: 1,
        per_page: 10 // 每页数量
      },
      total: 0, // 总页数
      imgList: [], // 图片列表
      loading: false, // 加载动画
      // 对话框
      dialogVisible: false, // false 是关 true是 开
      imageUrl: null, // 上传完的地址
      headers: { Authorization: 'Bearer ' + JSON.parse(window.sessionStorage.getItem('chj74-toutiao')).token }
    }
  },
  created () {
    // 先获取全部img
    this.getimgListData()
  },
  methods: {
    // 弹出预览图片
    previewImg (url) {
      this.dialogImg = true
      this.dialogImgUrl = url
    },
    // 上传
    handleImgSuccess (res, file) {
      this.imageUrl = res.data.url
      this.$message.success('上传成功') // 提示成功
      window.setTimeout(() => { // 2秒后关闭
        this.imageUrl = null
        this.getimgListData()
        this.dialogVisible = false
      }, 3000)
    },
    // 删除素材
    deleteBtn (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$http.delete('user/images/' + id)
        this.getimgListData()
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {})
    },
    // 分页
    pageChange (nowPage) {
      this.queryData.page = nowPage
      this.getimgListData()
    },
    // 收藏按钮
    async toggleFav (item) {
      const { data: { data } } = await this.$http.put('user/images/' + item.id, { collect: !item.is_collected })
      this.$message.success('操作成功')
      item.is_collected = data.collect
    },
    // 获取素材列表
    async getimgListData () {
      // 来个获取动画
      this.loading = true
      const { data: { data } } = await this.$http.get('user/images', { params: this.queryData })
      // 获取成功
      this.imgList = data.results
      this.total = data.total_count
      this.loading = false
    },
    collectChange () {
      // 回到第一页
      this.queryData.page = 1
      // 切换重新获取数据
      this.getimgListData()
    }
  }
}
</script>

<style lang="less" scoped>
  .img-list{
    overflow: hidden;
    padding: 0;
    list-style:none;
    li{
      float: left;
      position: relative;
      width: 150px;
      height: 150px;
      margin-left: 50px;
      margin-bottom: 30px;
      border: 1px dashed #ddd;
      padding: 5px;
      img{
        display: block;
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
      &:hover .fot{
          display: block;
      }
      .fot{
        display: none;
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        text-align: center;
        height: 30px;
        line-height: 30px;
        color: #fff;
        background-color: rgba(0,0,0,.5);

        span{
          cursor: pointer;
          margin: 0 15px;
          &.red{
            color: red;
          }
        }
      }
    }
  }
  .avatar-uploader{
    width:180px ;
    height: 180px;
    margin: 0 auto;
    img{
      width: 100%;
      height: 100%;
    }
  }
</style>
