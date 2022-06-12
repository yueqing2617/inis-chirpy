<template>
  <footer class="d-flex w-100 justify-content-center">
     <div class="d-flex justify-content-between align-items-center">
      <div class="footer-left">
       <!-- <p class="mb-0"> &copy; 2021 {{sys.title}} <a href="https://beian.miit.gov.cn/">{{sys.copy}}</a></p> -->
       ...
      </div>
      <div class="footer-right">
       <p class="mb-0"> 本博客数据由 <a href="https://inis.cn" target="_blank" rel="noopener">INIS</a> 生成，使用 <a href="https://github.com/cotes2020/jekyll-theme-chirpy/" target="_blank" rel="noopener">Chirpy</a> 作为主题</p>
      </div>
     </div>
    </footer>
</template>

<script>
export default {
    name : 'Footers',
    props:{
        sys:{}
    }
}
</script>

<style>

</style>