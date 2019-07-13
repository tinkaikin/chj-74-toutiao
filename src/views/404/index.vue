<template>
  <div class="container"></div>
</template>

<script>
export default {
  // created () {
  //   // 测试token过期后,无法获取请求,并跳转到 /loing
  //   this.$http.get('articles').then(res => {
  //     console.log(res)
  //   })
  // }
}
</script>

<style lang="less" scoped>
.container{
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: url(../../assets/images/404.png) no-repeat center / cover;
}
</style>
