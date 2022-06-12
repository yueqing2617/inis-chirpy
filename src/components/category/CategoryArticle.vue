<template>
  <div id="post-wrapper">
     <div class="post pl-1 pr-1 pl-sm-2 pr-sm-2 pl-md-4 pr-md-4">
         <h1 class="dynamic-title" v-if="data"><i class="fa fa-stream fa-fw text-muted"></i> {{data.name || 'loading...'}}</h1>
      <div id="page-tag">
          <ul class="post-content pl-0" v-if="count>0">
              <li class="d-flex justify-content-between pl-md-3 pr-md-3" v-for="item in list" :key="item.id"> <a href="javascript:;" @click="toPage(`/article/${item.id}`)">{{item.title}}</a> <span class="dash flex-grow-1"></span> <span class="text-muted small">{{fmt(item.create_time)}}</span></li>
              </ul>
              <div class="undefined" v-else>该分类下暂无文章</div>
              </div>
  
     </div>
    </div>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'
import { GET } from '@/utils/Request'
import {Tools} from '@/utils/tools'
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import {getPageTitle} from "@/utils/system";
export default {
    name:'CategoryArticle',
    setup(){
        const route = useRoute()
        const tool = new Tools()
        const router = useRouter()
        const store = useStore()
        const state = reactive({
            data:null,
            list:null,
            tid: null,
            count:0
        })
        state.tid = route.params.id
        const methods = {
            async getArticle(id){
                let params = {
                    id : id
                }
                let resp = await GET("article-sort",{params})
                state.data = resp.data
                state.count = resp.data.expand.count
                state.list = resp.data.expand.data
                document.title = getPageTitle(resp.data.name)
            },
            fmt(time){
                return tool.timetostamp(time)
            },
            toPage(url){
              router.push({path:url})
            }
        }
        onBeforeRouteUpdate((to,from,next)=>{
            state.tid = to.params.id
            methods.getArticle(to.params.id)
            next()
        })
        onMounted(()=>{
            methods.getArticle(state.tid)
        })
        return {
            ...toRefs(state),
            ...methods
        }
    }
}
</script>

<style>

</style>