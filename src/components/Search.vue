<template>
  <div id="post-list" v-if="total>0">
                <div class="post-preview" v-for="item in data" :key="item.id" >
                  <h1 @click="toPage(`/article/${item.id}`)">
                    <a href="javascript:;" v-text="item.title"></a>
                  </h1>
                  <div class="post-content" @click="toPage(`/article/${item.id}`)">
                    <p v-text="item.description">
                      
                    </p>
                  </div>
                  <div class="post-meta text-muted d-flex justify-content-between">
                    <div>
                      <i class="far fa-calendar fa-fw"></i>
                      <span
                        class="timeago"
                        data-toggle="tooltip"
                        data-placement="bottom"
                        title=""
                        > {{item.create_time}}
                        <i class="unloaded">{{item.create_time}}</i></span>
                      <i class="far fa-clock fa-fw"></i>
                      <span
                        class="readtime"
                        data-toggle="tooltip"
                        data-placement="bottom"
                        title=""
                        data-original-title="1019 words"
                        > {{fmt(item.update_time)}}</span
                      >
                      <i class="far fa-eye fa-fw"></i>
                      <span id="pv_Getting Started" class="pageviews"
                        > {{item.views}} </span
                      >
                    </div>
                    <div v-if="item.is_top == 1" class="pin">
                      <i class="fas fa-thumbtack fa-fw"></i> <span>Pinned</span>
                    </div>
                  </div>
                </div>
                
              </div>
              <div class="undefined" v-else>暂未找到与 <i>{{key}} 相关的内容</i></div>
              <paginative v-if="total > limit" @ClickEvent="pagintive" :current="current" :limit="limit" :total="total"/>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'
import Paginative from './common/Pagination.vue'
import { GET } from '../utils/Request' 
import { useRoute, useRouter } from 'vue-router'
import { onMounted, watch } from '@vue/runtime-core'
import {Tools} from '../utils/tools'
export default {
  name:'Index',
  components: { Paginative },
  setup(){
    const router = useRouter()
    const route = useRoute()
    const tool = new Tools()
    const state = reactive({
      data:[],
      limit:15,
      current:1,
      total:0,
      key:''
    })
    state.key = route.params.key
    const methods = {
        async Search(key,page){
                if(key != ''){
                    let params = {
                        value:key,
                        limit:state.limit,
                        page:page
                    }
                    let resp = await GET('search',{params})
                    state.total = resp.data.count
                    state.data = resp.data.data
                }

            },
        fmt(time){
          return tool.getTimeToStamp(time)
        },
        pagintive(val){
          state.current = val
        },
        toPage(url){
          router.push({path:url})
        }
    }
    watch(()=>route.params.key,(val)=>{
        state.key = val
        methods.Search(val,1)
    })
    watch(()=>state.current,async (val)=>{
      await methods.Search(state.key,val)
    })
    onMounted(()=>{
      methods.Search(state.key,1)
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