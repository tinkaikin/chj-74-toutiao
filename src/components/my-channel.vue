<template>
  <el-select v-model="value" @change="change">
    <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
// 封装目的1: 是给filterData.channel_id赋值

// 2个问题  v-model="filterData.channel_id"  :value = ?   @input= ?()
// 1 :value = ?  接收父传过来id
// 2. 把子选择好的状态传出去  父接收到 在赋值给外面
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
    change () {
      this.$emit('input', this.value)
    }
  }
}
</script>

<style>
</style>
