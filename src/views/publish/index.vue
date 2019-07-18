<template>
  <div class="publish">
    <el-card>
      <div slot="header">
        <my-bread>发布文章</my-bread>
      </div>
      <el-form label-width="100px" v-model="queryFormData">
        <el-form-item label="标题">
          <el-input style="width:400px" v-model="queryFormData.title"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <span>富文本</span>
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group v-model="queryFormData.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <div class="img-btn"><img src="../../assets/images/default.png" alt=""></div>
        </el-form-item>
        <el-form-item label="频道">
          <my-channel v-model="queryFormData.channel_id"></my-channel>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">发表</el-button>
          <el-button>存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      queryFormData: {
        draft: false, // true 或 false,      //是否存为草稿（true 为草稿）
        title: '', // string必须文章标题
        content: '', // string必须文章内容 X
        cover: {
          type: 1, // integer必须封面类型 -1:自动，0 :无图，1 :张，3 :张
          images: [] // string []必须item 类型: string X

        },
        channel_id: null // integer必须文章所属频道id
      }
    }
  }
}
</script>

<style lang="less" scoped>
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
