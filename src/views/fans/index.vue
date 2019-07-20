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
        <el-tab-pane label="粉丝画像" name="photo">
          <div ref="bar" style="width: 600px;height:400px;"></div>
        </el-tab-pane>
      </el-tabs>

    </el-card>
  </div>
</template>

<script>
// - 安装：npm i echarts
// - 导入：import echarts from 'echarts'
// - 准备：具备高宽的 DOM 容器  <div ref="bar"></div>
// - 获取DOM：this.$refs.bar
// - 初始化：const myEcharts = echarts.init(this.$refs.bar)
// - 准备配置项和数据： 配置项依赖文档  数据依赖后台  const option = {}
//   - option 参考提供的实例
// - 使用配置和数据：myEcharts.setOption(option)
import echarts from 'echarts'
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
  mounted () {
    const myEcharts = echarts.init(this.$refs.bar)
    const option = {
      angleAxis: {
      },
      radiusAxis: {
        type: 'category',
        data: ['周一', '周二', '周三', '周四'],
        z: 10
      },
      polar: {
      },
      series: [{
        type: 'bar',
        data: [1, 2, 3, 4],
        coordinateSystem: 'polar',
        name: 'A',
        stack: 'a'
      }, {
        type: 'bar',
        data: [2, 4, 6, 8],
        coordinateSystem: 'polar',
        name: 'B',
        stack: 'a'
      }, {
        type: 'bar',
        data: [1, 2, 3, 4],
        coordinateSystem: 'polar',
        name: 'C',
        stack: 'a'
      }],
      legend: {
        show: true,
        data: ['A', 'B', 'C']
      }
    }

    myEcharts.setOption(option)
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
