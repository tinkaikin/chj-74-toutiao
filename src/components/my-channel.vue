<template>
  <el-select :value="value" @change="fn">
    <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>
<script>
export default {
  name: 'MyChannel',
  props: ['value'],
  data () {
    return {
      options: [{ id: null, name: '请选择' }] // 用来渲染下拉菜单的,其他为请求来的数据
    }
  },
  created () {
    this.initGetChannel()
  },
  methods: {
    // 请求频道数据
    async initGetChannel () {
      const {
        data: { data }
      } = await this.$http.get('channels')
      this.options = this.options.concat(data.channels)
    },
    // 触发
    fn (sm) {
      this.$emit('input', sm)
    }
  }
}
</script>

<style>
</style>
