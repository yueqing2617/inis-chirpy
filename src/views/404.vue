<template>
  <div class="msg">
    听说找不到页面？
  </div>
</template>

<script>
export default {
    name:'404',
    setup(){
      document.title = '404'
    }
}
</script>

<style scoped>
.msg{
  width: 230px;
  display: block;
  margin: 0 auto;
  padding-top: 30px;
}
</style>