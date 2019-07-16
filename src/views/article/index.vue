<template>
  <div class="container">
    <!-- s=搜索过滤 -->
    <el-card>
      <div slot="header">
        <my-bread>内容管理</my-bread>
      </div>
      <el-form :model="filterData" size="small" label-width="80px">
        <el-form-item label="状态 : ">
          <el-radio-group v-model="filterData.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道 : ">
          <!-- 传入值value -->
          <!-- 传入函数input -->
          <my-channel v-model="filterData.channel_id"></my-channel>
        </el-form-item>
        <el-form-item label="时间 : ">
          <el-date-picker
            @change="setDate"
            value-format="yyyy-MM-dd"
            v-model="vlaueArr"
            type="daterange"
            range-separator="至"
            start-placeholde="开始日期"
            end-placeholde="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.native="submit">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- e=搜索过滤 -->
    <!-- s=结果展示 -->
    <el-card>
      <template slot="header">
        根据筛选条件共查询到
        <b>{{total}}</b> 条结果:
      </template>
      <el-table :data="tableData">
        <!-- slot-scope="scope" 是关键获取tableData到slot标签在处理完成返回的数据 -->
        <el-table-column label="封面">
          <!-- 使用的是用 scope.row -->
          <template slot-scope="scope">
            <el-image :src="scope.row.cover.images[0]" style="width:100px;height:74px">
              <div slot="error">
                <img src="../../assets/images/error.gif" width="100" height="74">
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status===0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status===1">待审核</el-tag>
            <el-tag v-if="scope.row.status===2" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status===3" type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status===4" type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" prop="pubdate"></el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="{row:{id}}">
            <el-button @click="edit(id)" type="primary" icon="el-icon-edit" circle plain></el-button>
            <el-button @click="del(id)" type="danger" icon="el-icon-delete" circle plain></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="box">
        <el-pagination
          :page-size="filterData.per_page"
          :current-page="filterData.page"
          @current-change="pageChange"
          background
          layout="prev, pager, next"
          :total="total"
        ></el-pagination>
      </div>
    </el-card>
    <!-- e=结果展示 -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      filterData: {
        status: null, // 默认null,请求全部数据,很''的区别
        channel_id: null, // 频道id
        begin_pubdate: null, // 起始日期从vlaueArr[0]里获取
        end_pubdate: null, // 结束日期vlaueArr[1]里获取
        page: 1, // 当前页
        per_page: 20, // 每页数量
        response_type: null // 返回数据的字段，不传返回用于内容管理的字段
      }, // 搜索过滤表单数据
      vlaueArr: [], // 存储开始时间和结束时间,O
      tableData: [], // 获取表格的数据
      total: 0 // 总条数文章
    }
  },
  created () {
    // 请求文章数据
    this.getArticles()
  },
  methods: {
    // 请求文章数据
    async getArticles () {
      const {
        data: { data }
      } = await this.$http.get('articles', { params: this.filterData })
      this.tableData = data.results
      this.total = data.total_count // 设置总条数
    },
    // 跳到编辑也
    edit (id) {
      this.$router.push(`/publish?id=${id}`)
    },
    // 删除文章
    del (id) {
      this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.$http.delete(`articles/${id}`)
          this.$message({ // 删除成功弹出消息提示
            type: 'success',
            message: '删除成功!'
          })
          // 再更新列表
          this.getArticles()
        })
        .catch(() => {}) // 点击取消不进行操作
    },
    submit () {
      // 每次都要跳到第一页
      this.filterData.page = 1
      // 筛选后请求文章数据
      this.getArticles()
    },
    // 区间日期选择后赋值给filterData里
    setDate (value) {
      this.filterData.begin_pubdate = value[0]
      this.filterData.end_pubdate = value[1]
    },
    // 分页器
    pageChange (page) {
      this.filterData.page = page
      this.getArticles()
    }
  }
}
</script>

<style lang="less" scoped>
.el-card {
  margin-bottom: 20px;
  background-color: #ddd;
  .box {
    margin-top: 10px;
    text-align: center;
  }
}
</style>
