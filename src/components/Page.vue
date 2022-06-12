<template>
    <div id="post-wrapper">
     <div class="post pl-1 pr-1 pl-sm-2 pr-sm-2 pl-md-4 pr-md-4">
         <h1 class="dynamic-title">{{data.title}}</h1>
  <div class="post-content" id="post-content">
    <div id="tags" class="d-flex flex-wrap ml-xl-2 mr-xl-2">
      <div v-html="data.content">
        
      </div>
      
    </div>
  </div>
     </div>
    </div>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'
import { GET } from '@/utils/Request'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import {getPageTitle} from "@/utils/system";
export default {
    name:'Page',
    setup(){
        const route =  useRoute()
        const store = useStore()
        const state = reactive({
            data : {},
            alias : null
        })
        state.alias = route.params.alias
        onBeforeRouteUpdate((to,from,next)=>{
            state.alias = to.params.alias
            methods.getPage(to.params.alias)
            next()
        })
        const methods = {
            async getPage(alias){
                let params = {
                    alias:alias
                }
                let resp = await GET("page",{params})
                state.data = resp.data
                let sys = store.getters['system/info']
                document.title = getPageTitle(resp.data.title)
            }
        }
        onMounted(()=>{
            methods.getPage(state.alias)
        })
        return {
            ...toRefs(state)
        }
    }
}
</script>

<style>

</style>