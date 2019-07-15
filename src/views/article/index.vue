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
          <el-select v-model="filterData.channel_id">
            <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.name"
            :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间 : ">
          <el-date-picker
            v-model="vlaueArr"
            type="daterange"
            range-separator="至"
            start-placeholde="开始日期"
            end-placeholde="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.native='submit'>筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- e=搜索过滤 -->
    <!-- s=结果展示 -->
    <el-card></el-card>
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
        page: null, // 页数可省
        per_page: null, // 每页数量可省
        response_type: null // 返回数据的字段，不传返回用于内容管理的字段
      }, // 搜索过滤表单数据
      options: [
        { id: null, name: '全选' }
      ], // 用来渲染下拉菜单的,其他为请求来的数据
      vlaueArr: [] // 存储开始时间和结束时间,O
    }
  },
  created () {
    this.initGetChannel()
  },
  methods: {
    initGetChannel () {
      this.$http
        .get('channels')
        .then(res => {
          const { status, data } = res
          if (status === 200) {
            this.options = this.options.concat(data.data.channels)
          } else {
            alert('507 服务器数据库异常')
          }
        })
    },
    submit () {
      console.log(this.filterData)
      console.log(this.vlaueArr)
    }
  }
}
</script>

<style lang="less" scoped>
.el-card {
  margin-bottom: 20px;
}
</style>
