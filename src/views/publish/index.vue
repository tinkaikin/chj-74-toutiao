<template>
  <div class="publish-container">
    <el-card>
      <div slot="header">
        <my-bread>{{isXiu?"修改文章":"发布文章"}}</my-bread>
      </div>
      <el-form label-width="100px" v-model="queryFormData">
        <el-form-item label="标题">
          <el-input style="width:400px" v-model="queryFormData.title"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <quill-editor v-model="queryFormData.content" :options="editorOption"></quill-editor>
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group v-model="queryFormData.cover.type" @change="typeChange">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="queryFormData.cover.type===1">
          <!-- 封装插件 -->
          <my-image v-model="queryFormData.cover.images[0]"></my-image>
        </el-form-item>
        <el-form-item v-if="queryFormData.cover.type===3" class="type3">
          <!-- 封装插件 -->
          <my-image v-model="queryFormData.cover.images[0]"></my-image>
          <my-image v-model="queryFormData.cover.images[1]"></my-image>
          <my-image v-model="queryFormData.cover.images[2]"></my-image>
        </el-form-item>
        <el-form-item label="频道">
          <my-channel v-model="queryFormData.channel_id"></my-channel>
        </el-form-item>
        <el-form-item v-if="isXiu">
          <el-button type="primary" @click="putPublished(false)">修改</el-button>
          <el-button type="info" @click="putPublished(true)">修改草稿</el-button>
        </el-form-item>
        <el-form-item v-else>
          <el-button type="primary" @click="uploadPublished(false)">发表</el-button>
          <el-button type="info" @click="uploadPublished(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

export default {
  components: {
    quillEditor
  },
  data () {
    return {
      queryFormData: {
        // draft: false, // true 或 false,      //是否存为草稿（true 为草稿）
        title: '', // string必须文章标题
        content: '', // string必须文章内容 X
        cover: {
          type: 1, // integer必须封面类型 -1:自动，0 :无图，1 :张，3 :张
          images: [] // string []必须item 类型: string X

        },
        channel_id: null // integer必须文章所属频道id
      },
      // 富文本配置项
      editorOption: {
        placeholder: '',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }]
          ]
        }
      },
      articleId: null, // 文章的id
      isXiu: false // 用正常的true/false 判断最好

    }
  },
  watch: {
    $route (data) {
      this.articleId = null
      this.isXiu = false
      this.queryFormData = {
        // draft: false, // true 或 false,      //是否存为草稿（true 为草稿）
        title: '', // string必须文章标题
        content: '', // string必须文章内容 X
        cover: {
          type: 1, // integer必须封面类型 -1:自动，0 :无图，1 :张，3 :张
          images: [] // string []必须item 类型: string X

        },
        channel_id: null // integer必须文章所属频道id
      }
    }
  },
  created () {
    // 获取到id 有可能没有值
    if (this.$route.query.id) {
      this.articleId = this.$route.query.id
      this.isXiu = true
      this.getarticleById()
    }
  },
  methods: {
    // 修改文章
    async putPublished (draft) {
      await this.$http.put(`articles/${this.articleId}?draft=${draft}`, this.queryFormData)
      this.$message.success(!draft ? '发表成功' : '存入草稿成功')
      this.$router.push('/article')
    },
    // 获取指定文章
    async getarticleById () {
      const { data: { data } } = await this.$http.get(`articles/${this.articleId}`)
      this.queryFormData = data
    },
    // 切换类型
    typeChange () {
      this.queryFormData.cover.images = []
    },
    async uploadPublished (draft) {
      console.log('articles?draft=' + draft, this.queryFormData)
      await this.$http.post('articles?draft=' + draft, this.queryFormData)
      this.$message.success(!draft ? '发表成功' : '存入草稿成功')
      this.$router.push('/article')
    }
  }
}
</script>

<style lang="less" scoped>
.type3 .my-image-container{
  display: inline-block;
  margin-right: 10px;
}
</style>
