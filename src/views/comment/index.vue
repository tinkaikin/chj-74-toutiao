<template>
  <div class="comment-container">
    <el-card>
      <div slot="header">
        <my-bread>评论管理</my-bread>
      </div>
      <el-table :data="tableData">
        <el-table-column prop="title" label="标题" width="400"></el-table-column>
        <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
        <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="slot">
            {{slot.row.comment_status?'正常':'关闭'}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="slot">
            <el-button v-if="slot.row.comment_status" @click="toggelStatus(slot.row)" type="warning">关闭评论</el-button>
            <el-button v-else type="success" @click="toggelStatus(slot.row)">打开评论</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div style="margin-top:20px">
        <el-pagination
          background
          layout="prev, pager, next, jumper"
          :page-size="reqParams.per_page"
          :current-page="reqParams.page"
          @current-change="currentChange"
          :total="total">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [], // 表格数据
      reqParams: {
        page: 1,
        per_page: 10,
        response_type: 'comment' // 获取评论数据
      },
      total: 0
    }
  },
  created () {
    // 获取评论信息
    this.getComments()
  },
  methods: {
    // 分页
    currentChange (newPage) {
      this.reqParams.page = newPage
      this.getComments()
    },
    // 切换状态
    toggelStatus (row) {
      this.$confirm('确定要更改当前权限吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: { data } } = await this.$http.put(`comments/status?article_id=${row.id}`, { allow_comment: !row.comment_status })
        this.$message.success('状态修改成功')
        row.comment_status = data.allow_comment
      }).catch(() => {})
    },
    // 获取评论信息
    async getComments () {
      const { data: { data } } = await this.$http.get('articles', { params: this.reqParams })
      this.tableData = data.results
      this.total = data.total_count
    }
  }
}
</script>

<style scoped lang='less'>
</style>
