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
        <el-button style="float:right" type="success" size="small">上传素材</el-button>
      </div>
      <!-- s=图片展示部分 1.样式-->
      <ul class="img-list">
        <li v-for="item in imgList" :key="item.id">
          <img :src="item.url" alt="">
          <!-- 收藏和删除按钮 -->
          <div class="fot">
            <span class="el-icon-star-off" :class="{red:item.is_collected}" @click="toggleFav(item)"></span>
            <span class="el-icon-delete"></span>
          </div>
        </li>
      </ul>
      <!-- 分页器 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="1000">
      </el-pagination>
      <!-- e=图片展示部分 -->
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      queryData: {
        collect: false, // false 为全部
        page: 1,
        per_page: 10 // 每页数量
      },
      imgList: [], // 图片列表
      loading: false // 加载动画
    }
  },
  created () {
    // 先获取全部img
    this.getimgListData()
  },
  methods: {
    // 收藏按钮
    async toggleFav (item) {
      // console.log(item)is_collected
      const { data: { data } } = await this.$http.put('user/images/' + item.id, { collect: !item.is_collected })
      console.log(data)
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
      this.loading = false
    },
    collectChange (newValue) {
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
      width: 160px;
      height: 160px;
      margin-left: 50px;
      margin-bottom: 30px;
      img{
        display: block;
        width: 100%;
        height: 100%;
      }
      .fot{
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
</style>
