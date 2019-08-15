## 黑马头条后台管理项目-DAY06

### 01-反馈

| 姓名 | 意见或建议                                                   |
| ---- | ------------------------------------------------------------ |
| ***  | 疑车有据,请出示行车证,驾驶证!!!                              |
| ***  | 组建封装，boom，please，help！                               |
| ***  | 前方迷茫                                                     |
| ***  | 还是那句话不要怂就是干，全梭哈！梭哈！梭哈！赢了会所嫩模，输了下海干活 |

### 02-回顾

- 频道组件封装-铺垫：

  - v-model的语法糖
    - v-bind:value="text"  简写  :value="text"
    - v-on:input  简写 @input   指定的函数，把你输入的内容给text赋值
  - 组件传值父传子
    - 使用子组件的时候，在标签上绑定一个属性，:text="父组件数据"
    - 在子组件的内部，使用一个选项，props来接收数据 ， {props:['text']}
  - 组件传值子传父
    - 铺垫知识：绑定自定义事件   触发自定义事件
    - 代码：绑定 @abc="fn"   触发  $emit('abc',数据)
    - 使用子组件的时候，在标签上绑定一个自定义事件，@abc="fn"
    - 在子组件的内部，使用当前实例，去触发事件，this.$emit('abc',数据)
    - 注意：给谁绑定的事件，只有它才可以触发。
    - 注意：props接收的数据，特点：只读。

- 频道组件封装-实现：

  ```html
  <my-channel v-model="reqParams.channel_id"></my-channel>
  ```

  ```html
  <template>
  	<el-select :value="value" @change="fn">
      	<el-option></el-option>
      </el-select>
  </template>
  export default {
  	props:['value'],
      methods:{
          fn(val){
              this.$emit('input',val)
          }
      }
  }
  ```

  

### 03-素材管理-组件与路由

组件：

```html
<template>
  <div class='container'>Image</div>
</template>

<script>
export default {}
</script>

<style scoped lang='less'></style>
```

路由：

```js
{ name: 'image', path: '/image', component: Image }
```

基础布局：

```html
<el-card>
      <div slot="header">
        <my-bread>素材管理</my-bread>
      </div>
      <div style="margin-bottom:20px">
        <!-- 按钮式的单选框 -->
        <el-radio-group size="small" v-model="reqParams.collect">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <!-- 绿色按钮 -->
        <el-button size="small" style="float:right" type="success">添加素材</el-button>
      </div>
      <!-- 图片列表 -->
      <ul class="img-list">
        <li v-for="item in 10" :key="item">
          <img src="../../assets/images/avatar.jpg" alt />
          <div class="fot">
            <span class="el-icon-star-off" :class="{red:item%2}"></span>
            <span class="el-icon-delete"></span>
          </div>
        </li>
      </ul>
      <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
    </el-card>
```

数据：

```js
data () {
    return {
      // 参数对象
      reqParams: {
        collect: false
      }
    }
  }
```

### 04-素材管理-素材列表

```js
// 素材列表
images: []
```

```js
 created () {
    // 获取素材列表数据
    this.getImages()
},
```

```js
methods: {
    async getImages () {
      const { data: { data } } = await this.$http.get('user/images', { params: this.reqParams })
      // 获取数据成功
      this.images = data.results
    }
  }
```

渲染：

```html
<!-- 图片列表 -->
      <ul class="img-list">
        <li v-for="item in images" :key="item.id">
          <img :src="item.url" alt />
          <div class="fot">
            <span class="el-icon-star-off" :class="{red:item.is_collected}"></span>
            <span class="el-icon-delete"></span>
          </div>
        </li>
      </ul>
```

另外一个类型的列表：收藏

```html
 <el-radio-group size="small" @change="search()" v-model="reqParams.collect">
```

```js
 search () {
      this.reqParams.page = 1
      this.getImages()
    },
```

剔除操作栏：

```html
<div class="fot" v-if="!reqParams.collect">
```



额外实现：加载等待效果。

- 使用 v-loading  指定某个区域的加载效果
- 当ajax请求前  开启加载
- 当ajax响应后  结束加载

```html
<div class="container" v-loading="loading">
```

```js
 // 加载数据
loading: false
```

```js
 async getImages () {
      this.loading = true
      const { data: { data } } = await this.$http.get('user/images', { params: this.reqParams })
      // 获取数据成功
      this.images = data.results
      this.loading = false
    }
```



### 05-素材管理-列表分页

```html
<el-pagination
        v-if="total>reqParams.per_page"
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        @current-change="pager"
      ></el-pagination>
```

```js
 // 参数对象
      reqParams: {
        collect: false,
        page: 1,
        per_page: 10
      },
```

```js
 // 分页
    pager (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
```



### 06-素材管理-上传素材功能

- 对话框组件

```js
dialogVisible: false  // 控制对话框显示隐藏的
```

```html
<el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>
<!-- title="提示"  对话框的标题 -->
<!-- :visible="dialogVisible" 显示隐藏 -->
<el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="30%">
  <span>上传组件</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>
```

- 上文件组件
  - 样式需要定义在全局index.less

```html
<el-upload
  class="avatar-uploader"
  action="https://jsonplaceholder.typicode.com/posts/"
  :show-file-list="false"
  :on-success="handleAvatarSuccess">
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
```

- action 上传素材的接口地址，是完整地址，原因：el-upload不基于axios。
- headers  值是对象，在请求头需要携带token
- on-success 上传成功的钩子函数（回调函数） 
  - 预览 2s 钟 ，提示上传成功
  - 自动关闭对话框，更新列表数据。
- name 指定上传文件的字段名称 符合后台的要求
- imageUrl 数据
  - 预览图片
  - 隐藏上传按钮

最终的代码：

```html
<!-- 对话框 -->
    <el-dialog title="添加素材" :visible.sync="dialogVisible" width="300px">
      <el-upload
        class="avatar-uploader"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :headers="headers"
        :show-file-list="false"
        :on-success="handleSuccess"
        name="image"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
```

数据：

```js
// 添加素材相关数据
      dialogVisible: false,
      imageUrl: null,
      headers: {
        Authorization:
          'Bearer ' +
          JSON.parse(window.sessionStorage.getItem('hm74-toutiao')).token
      }
```

方法：

```js
// 上传成功
    handleSuccess (res) {
      // - 预览 2s 钟 ，提示上传成功
      this.imageUrl = res.data.url
      this.$message.success('上传成功')
      window.setTimeout(() => {
        // - 自动关闭对话框，更新列表数据。
        this.dialogVisible = false
        this.getImages()
        // 再次打开对话框的时候，预览的是上传按钮 而不是 之前的图片
        this.imageUrl = null
      }, 2000)
    },
```



### 07-素材管理-收藏素材功能

- 点击星星
  - 如果当前是 白色  收藏
  - 如果当前是 红色  取消收藏

```html
<span @click="toggleFav(item)" class="el-icon-star-off" :class="{red:item.is_collected}"></span>
```

```js
// 切换收藏和取消收藏
    async toggleFav (item) {
      const { data: { data } } = await this.$http.put('user/images/' + item.id, {
        collect: !item.is_collected
      })
      // 成功
      this.$message.success('操作成功')
      // 把当前的图片的状态改成操作后后台给的状态
      item.is_collected = data.collect
    },
```

### 08-素材管理-删除素材功能

- 点击删除
  - 获取ID发请求，更新列表

```html
 <span @click="delImage(item.id)" class="el-icon-delete"></span>
```

```js
// 删除图片
    delImage (id) {
      this.$confirm('此操作将永久删除该图片, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$http.delete('user/images/' + id)
        this.$message.success('删除成功')
        this.getImages()
      }).catch(() => {})
    },
```



### 09-发布文章-路由与组件

### 10-发布文章-基础布局

```html
<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <my-bread>发布文章</my-bread>
      </div>
      <el-form :model="articleForm" label-width="100px">
        <el-form-item label="标题：">
          <el-input v-model="articleForm.title" style="width:400px"></el-input>
        </el-form-item>
        <el-form-item label="内容：">富文本</el-form-item>
        <el-form-item label="封面：">
          <el-radio-group v-model="articleForm.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <div class="img-btn"><img src="../../assets/images/default.png" alt=""></div>
        </el-form-item>
        <el-form-item label="频道：">
          <my-channel v-model="articleForm.channel_id"></my-channel>
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
      // 提交给后台的文章数据
      articleForm: {
        title: '',
        content: '',
        cover: {
          type: 1,
          images: []
        },
        channel_id: null
      }
    }
  }
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

### 11-发布文章-富文本使用

- 在vue项目下使用富文本。
- <https://github.com/vuejs/awesome-vue>
- <https://www.npmjs.com/package/vue-quill-editor>

- [https://www.awesomes.cn](https://www.awesomes.cn/)

```js
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
  components: { quillEditor },
```

```html
<quill-editor v-model="articleForm.content"></quill-editor>
```



### 12-发布文章-封面组件-分析功能



### 13-发布文章-封面组件-基础布局



### 14-发布文章-封面组件-逻辑实现



### 15-发布文章-封面组件-双向绑定



### 16-发布文章-发布与草稿