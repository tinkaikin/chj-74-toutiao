<template>
  <el-container class="home-container">
    <el-aside width="200px" class="home-aside">Aside</el-aside>
    <el-container>
      <el-header class="home-header">Header</el-header>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.home-container{
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  .home-aside{
    background-color: #002033;
  }
}
</style>
