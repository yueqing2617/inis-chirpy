<template>
  <div id="access-lastmod" class="post"> 
        <span>最近更新</span>
        <ul class="post-content pl-0 pb-1 ml-1 mt-2">
         <li v-for="item in data" :key="item.id"><a href="javascript:;" @click="toPage(`/article/${item.id}`)">{{item.title}}</a></li>
        </ul>
       </div>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'
import { GET } from '../../utils/Request'
import { onMounted } from '@vue/runtime-core'
import { useRouter } from 'vue-router'
export default {
    name : 'Recent',
    setup(){
      const router = useRouter()
      const state = reactive({
        data:[]
      })
      const methods = {
        async getArticle(){
          let params = {
            order:'views desc desc',
            limit:5
          }
          let resp = await GET('article',{params})
          state.data = resp.data.data
        },
        toPage(url){
          router.push({path:url})
        }
      }
      onMounted(()=>{
        methods.getArticle()
      })
      return {
        ...toRefs(state)
        ,...methods
      }
    }
}
</script>

<style>

</style>