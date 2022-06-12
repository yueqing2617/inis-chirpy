<template>
  <div id="search-result-wrapper" class="d-flex justify-content-center unloaded">
    <div class="col-12 col-xl-11 post-content">
     <div id="search-hints">
      <h4 class="text-muted mb-4">热门标签</h4>
      <a class="post-tag" href="javascript:;" v-for="(item,index) in tags" :key="index" v-show="index < 8" @click="toPage(`/tag/${item.id}`)">{{item.name}}</a> 
     </div>
     <div id="search-results" class="d-flex flex-wrap justify-content-center text-muted mt-3">
         
     </div>
    </div>
   </div>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'
import Pagination from './Pagination.vue'
import { useRouter } from 'vue-router'
export default {
  components: { Pagination },
    name : 'SearchResult',
    setup(){
        const router = useRouter()
        const state = reactive({
            tags : JSON.parse(window.sessionStorage.getItem('TAG_LIST'))
        })

        const methods = {       
            toPage(url){
                $('#search-cancel').click()
                router.push({path:url})
            }
        }
        return {
            ...toRefs(state),
            ...methods
        }
    }
}
</script>

<style scoped>
.cur{
    cursor: pointer;
}
</style>