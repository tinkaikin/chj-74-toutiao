
<template>
  <span>模拟{{id}}
    <button @click="$emit('input',id++)">点击</button>
  </span>
</template>

<script>
/**
 *  使用
 * <my-test :id="初始的数字" @input='回调函数/传回的参数加1'></my-test>
 * <my-test :id="total" @input='(id)=>{total=id}'></my-test>
*/
export default {
  name: 'MyTest',
  props: ['id']
}
</script>

<style>

</style>
