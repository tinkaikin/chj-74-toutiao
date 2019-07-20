<template>
  <div class='fans-container'>
    <el-card>
      <div slot="header">
        <my-bread>粉丝管理</my-bread>
      </div>
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="粉丝列表" name="list">
           <!-- {id: BigNumber, name: "13552580169", photo: "http://touti -->
          <div class='fans-list' v-for="item in fensList" :key="item.index">
            <el-avatar :size="70" :src="item.photo"></el-avatar>
            <p>{{item.name}}</p>
            <el-button type="primary" size="mini">+ 关注</el-button>
          </div>
          <!-- 分页 -->
          <el-pagination
            background
            layout="prev, pager, next"
            :page-size="reqParams.per_page"
            :current-page="reqParams.page"
            @current-change="currentChange"
            :total="total">
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="粉丝画像" name="photo">粉丝画像</el-tab-pane>
      </el-tabs>

    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'list', // tab标签切换的值
      reqParams: {
        page: 1,
        per_page: 21
      },
      fensList: [], // 粉丝列表
      total: 0 // 总条数
    }
  },
  created () {
    this.getFans()
  },
  methods: {
    // 分页
    currentChange (nowPage) {
      this.reqParams.page = nowPage
      this.getFans()
    },
    async getFans () {
      const { data: { data } } = await this.$http.get('followers', { params: this.reqParams })
      this.fensList = data.results
      this.total = data.total_count
    }
  }
}
</script>

<style scoped lang='less'>
.fans-list{
  width: 142px;
  height: 180px;
  padding: 10px;
  box-sizing: border-box;
  text-align: center;
  margin:0 10px 10px 0;
  display: inline-block;
  border: 1px dashed #ddd;
  p{
    font-size: 14px;
  }
}
</style>
