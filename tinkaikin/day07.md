## 黑马头条后台管理项目-DAY07

### 01-反馈

| 姓名   | 意见或建议                                                   |
| ------ | ------------------------------------------------------------ |
| ***    | 老师,你的vscode格式化是怎么用的,为啥我的格式化会报错啊,就是会多逗号分号什么的,还有组件模板快捷生成的快捷方式是什么 |
| ***    | 火箭一般的速度,sou!sou!sou!sou!sou!sou!sou!sou! 看这代码有种学英语的感觉,就算单词都认识也不一定能翻译出来! |
| ***    | 有点困哈 不过在坚持不让自己睡着 手机也木带难受啊马飞         |
| ***    | 老师你最帅                                                   |
| ***    | "我不爱你了" 用古文怎么说? "大郎,该喝药了"                   |
| ***    | 啥都不想写o(︶︿︶)o                                         |
| ***    | show                                                         |
| ***    | 老师讲的有些快,跟不上节奏.Lolita                             |
| 123456 | 代码太多了太多了，我已经坦然的放弃了，毕竟三分天注定，七分靠打拼，剩下140全靠队友赢，其他同学加油！ |

### 02-回顾

- 格式化快捷键  ctrl + shift +  f
- vue + tab
- 设置--->用户代码片段---->新建一个

```js
{
	"Print to console": {
		"prefix": "vue",
		"body": [
			"<template>",
			"  <div class='container'></div>",
			"</template>\n",
			"<script>",
			"export default {}",
			"</script>\n",
			"<style scoped lang='less'></style>",
		],
		"description": "Create vue template"
	}
}
```

- 回顾
  - 素材管理
    - 列表
    - 收藏
    - 取消收藏
    - 删除
    - 上传素材
  - 发布文章
    - 基础布局
    - 使用富文本



###03-发布文章-富文本配置

- 基础使用文档：https://www.npmjs.com/package/vue-quill-editor
- 在组件使用时：`:options="editorOption"`  editorOption配置对象
- 官方网站：https://quilljs.com/docs/quickstart/ ，vue-quill 和 基于js的quill配置一样

```html
<quill-editor v-model="articleForm.content" :options="editorOption"></quill-editor>
```

```js
// 富文本编辑器的配置选项
      editorOption: {
        placeholder: '',
        modules: {
          toolbar: [
            [ 'bold', 'italic', 'underline', 'strike'],    
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],               
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }]
          ]
        }
      },
```

样式：

```less
// 在发布文章的时候生效
.article-container .ql-editor{
  height: 300px;
}
.article-container .ql-toolbar.ql-snow{
  padding: 0 8px;
}
```



### 04-发布文章-封面组件-分析功能

- 图片按钮
  - 点击之后弹出对话框，预览选择后的封面图。
- 对话框
  - 素材库
    - 全部 收藏 查询素材列表
    - 实现分页查询
    - 点击图片 需要选中功能
  - 上传图片
    - 上传图片
    - 预览图片
  - 点击确认按钮
    - 获取你选中的图片在图片按钮上预览
    - 对话框关闭
- 实现双向数据绑定。

### 05-发布文章-封面组件-基础布局

注册组件：

```html
<template>
  <div class='container'>
    <!-- 图片按钮 -->
    <div class="img-btn"><img src="../assets/images/default.png" alt=""></div>
    <!-- 对话框 -->
  </div>
</template>

<script>
export default {
  name: 'my-image'
}
</script>

<style scoped lang='less'>
.img-btn{
  width: 150px;
  height: 150px;
  border: 1px dashed #ddd;
  img{
    width: 100%;
    height: 100%;
    display: block;
  }
}
</style>
```

使用了对话框和tabs组件：

```html
<!-- 对话框 -->
    <el-dialog :visible.sync="dialogVisible" width="700px">
      <!-- v-model="activeName"  activeName是选项卡标签的name属性的值-->
      <!-- label="用户管理"  选项卡标签的文字 -->
      <!-- el-tab-pane 标签的内容  就是选项卡对应的内容 -->
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="image">
          <!-- 单选框 -->
          <div style="margin-bottom:10px">
            <el-radio-group size="small" v-model="reqParams.collect">
              <el-radio-button :label="false">全部</el-radio-button>
              <el-radio-button :label="true">收藏</el-radio-button>
            </el-radio-group>
          </div>
          <!-- 图片列表 -->
          <div class="img-item" v-for="item in 8" :key="item">
            <img src="../assets/images/avatar.jpg" alt />
          </div>
          <!-- 分页 -->
          <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="upload">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
          >
            <img v-if="uploadImageUrl" :src="uploadImageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
```

依赖数据：

```js
 data () {
    return {
      // 控制对话框显示隐藏
      dialogVisible: false,
      // 控制选中的选项卡
      activeName: 'image',
      // 获取素材列表时传参
      reqParams: {
        collect: false
      },
      // 上传图片后预览的地址
      uploadImageUrl: null
    }
  },
```



### 06-发布文章-封面组件-逻辑实现

- 素材列表默认渲染
  - 打开对话框

```js
 images: []
    }
  },
  methods: {
    openDialog () {
      this.dialogVisible = true
      // 做其他事情 渲染素材列表
      this.getImages()
    },
    async getImages () {
      const { data: { data } } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
    }
```

```html
<!-- 图片列表 -->
          <div class="img-item" v-for="item in images" :key="item.id">
            <img :src="item.url" alt />
          </div>
```

- 切换收藏进行渲染

```html
<el-radio-group size="small" @change="search()" v-model="reqParams.collect">
```

```js
 search () {
      this.reqParams.page = 1
      this.getImages()
    }
```

- 分页渲染

```html
<!-- 分页 -->
          <el-pagination
          v-if="total>reqParams.per_page"
          background
          layout="prev, pager, next"
          :total="total"
          :page-size="reqParams.per_page"
          :current-page="reqParams.page"
          @current-change="pager"
          >
```

数据

```js
// 总条数
      total: 0
```

函数

```js
 pager (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    }
```

- 点击列表中图片，选中效果

  - 样式，使用class来定多个样式 selected

  ```less
    position: relative;
    &.selected{
      &::before{
        // .img-item.selected::before{} 加上selected class加遮罩层
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.2) url(../assets/images/selected.png) no-repeat center / 50px 50px;
      }
    }
  ```

  - 点击后加上样式

  ```html
  :class="{selected:selectedImageUrl===item.url}" @click="selectedImage(item.url)"
  ```

  ```js
  // 你选中的素材地址
  selectedImageUrl: null
  // 选中图片
  selectedImage (url) {
      // 思路 :class={selected:条件}
      // 条件 记录上去点击图片的唯一标识 然后 去比对每次遍历的图片的唯一标识
      // 如果一致  选中  不一致  不选中
      // 此时图片地址做为唯一标识  将来提交的数据是地址不是ID
      this.selectedImageUrl = url
  },
  ```

- 上传图片，进行预览

```html
<el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :show-file-list="false"
            :headers="headers"
            name="image"
            :on-success="handleSuccess"
          >
            <img v-if="uploadImageUrl" :src="uploadImageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
```

```js
// 上传成功
    handleSuccess (res) {
      // 预览
      this.uploadImageUrl = res.data.url
    },
```



- 确认封面图
  - 用户可能选中图片，可能上传了图片
  - 如果没有选中，提示用户。`

```js
import dafaultImage from '../assets/images/default.png'
```

```js
// 你选中的图片  默认的是图片
// 注意：webpack不会去打包在数据中定义的地址对应的资源，打包标签上的src或url的资源
// 注意：本地的资源不会去打包，如果是网络资源就没关系。
// 自己主动导入 你需要的图片资源
value: dafaultImage
```

```js
 // 确认图片
    confirmImage () {
      if (this.activeName === 'image') {
        // 如果是 素材  使用 selectedImageUrl 做为封面图
        if (!this.selectedImageUrl) return this.$message.warning('请选择素材')
        this.value = this.selectedImageUrl
      } else {
        // 如果是 上传图片  使用 uploadImageUrl 做为封面图
        if (!this.uploadImageUrl) return this.$message.warning('请上传图片')
        this.value = this.uploadImageUrl
      }
      this.dialogVisible = false
    },
```



- 需要和父组件进行双向数据绑定

### 07-发布文章-封面组件-双向绑定

```html
<my-image v-model="articleForm.cover.images[0]"></my-image>
```

父传子

```js
 props: ['value'], // 只读
```

```js
<img :src="value||dafaultImage" alt />
```

子传父

```js
 // 确认图片
    confirmImage () {
      if (this.activeName === 'image') {
        // 如果是 素材  使用 selectedImageUrl 做为封面图
        if (!this.selectedImageUrl) return this.$message.warning('请选择素材')
        // this.value = this.selectedImageUrl
        this.$emit('input', this.selectedImageUrl)
      } else {
        // 如果是 上传图片  使用 uploadImageUrl 做为封面图
        if (!this.uploadImageUrl) return this.$message.warning('请上传图片')
        // this.value = this.uploadImageUrl
        this.$emit('input', this.uploadImageUrl)
      }
      this.dialogVisible = false
    },
```



### 08-发布文章-发布与草稿

使用组件：

```html
<!-- 单图 -->
<div v-if="articleForm.cover.type === 1">
    <my-image v-model="articleForm.cover.images[0]"></my-image>
</div>
<!-- 三图 -->
<div v-if="articleForm.cover.type === 3">
    <my-image v-model="articleForm.cover.images[0]"></my-image>
    <my-image v-model="articleForm.cover.images[1]"></my-image>
    <my-image v-model="articleForm.cover.images[2]"></my-image>
</div>
```

```js
changeType () {
    // 重新选中图片类型 清空图片数据
    this.articleForm.cover.images = []
}
```

发表文章，存入草稿

```html
        <el-form-item>
          <el-button type="primary" @click="publish(false)">发表</el-button>
          <el-button @click="publish(true)">存入草稿</el-button>
        </el-form-item>
```

```js
// 发表和存入草稿
async publish (draft) {
    // 校验数据  省略...
    await this.$http.post(`articles?draft=${draft}`, this.articleForm)
    this.$message.success(!draft ? '发表成功' : '存入草稿成功')
    this.$router.push('/article')
},
```





###09-发布文章-合并修改文章

- 获取地址的键值对传参：$route.query.id
- 如果有ID就是修改，如果没有就是发布。
  - 面包屑文字切换
  - 内容需要填充，修改时
  - 按钮需要切换

```js
created () {
    this.articleId = this.$route.query.id
    // 可能拿不到 当你是发布时
    // 获取文章数据
    if (this.articleId) {
      this.getArticle()
    }
  },
```

```js
 // 获取文章数据
    async getArticle () {
      const { data: { data } } = await this.$http.get('articles/' + this.articleId)
      this.articleForm = data
    },
```

```html
<my-bread>{{articleId?'修改':'发布'}}文章</my-bread>
```

```html
<el-form-item v-if="!articleId">
          <el-button type="primary" @click="publish(false)">发表</el-button>
          <el-button @click="publish(true)">存入草稿</el-button>
        </el-form-item>
        <el-form-item v-else>
          <el-button type="primary" @click="edit(false)">修改</el-button>
          <el-button @click="edit(true)">存入草稿</el-button>
        </el-form-item>
```



问题：当你处于修改时，切换成发布文章。

- 路由的路径没有修改，只是参数改了，是不会重新渲染组件。
- 解决方案：
  - 监听参数是否改变，重新更新数据。
  - 监听  $route 

```js
watch: {
    $route () {
      // 监听一种  有修改切换到发布
      this.articleId = null
      this.articleForm = {
        title: '',
        content: '',
        cover: {
          type: 1,
          // 数组长度 如果是单图为1  如果是三图为3
          images: []
        },
        channel_id: null
      }
    }
  },
```



### 10-评论管理-组件与路由



### 11-评论管理-列表渲染



###12-评论管理-分页功能



###13-评论管理-关闭评论&开启评论

