<template>
  <div id="access-tags"> 
        <span>热门标签</span>
        <div class="d-flex flex-wrap mt-3 mb-1 mr-3"> 
         <a class="post-tag" v-for="(item,index) in data" :key="index"  v-show="index < 5" href="javascript:;" @click="toPage(`/tag/${item.id}`)" >{{item.name}}</a> 
        </div>
       </div>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'
import { useRouter } from 'vue-router'
export default {
    name : 'HotTags',
    setup(){
      const router = useRouter()
      const state = reactive({
        data: JSON.parse(window.sessionStorage.getItem('TAG_LIST'))
      })
      const methods = {
        toPage(url){
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

<style>

</style>