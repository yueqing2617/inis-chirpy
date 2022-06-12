<template>
  <div id="post-list">
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
              <paginative v-if="total > limit" @ClickEvent="pagintive" :current="current" :limit="limit" :total="total"/>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'
import Paginative from './common/Pagination.vue'
import { GET } from '../utils/Request' 
import { useRouter } from 'vue-router'
import { onMounted, watch } from '@vue/runtime-core'
import {Tools} from '../utils/tools'
export default {
  name:'Index',
  components: { Paginative },
  setup(){
    const router = useRouter()
    const tool = new Tools()
    const state = reactive({
      data:[],
      limit:15,
      current:1,
      total:0
    })
    const methods = {
        async getArticle(page){
          let params = {
            limit:state.limit,
            page:state.current,
            order:"is_top desc,update_time desc"
          }
          let resp = await GET('article',{params})
          state.data = resp.data.data
          state.total = resp.data.count
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
    watch(()=>state.current,async (val)=>{
      await methods.getArticle(val)
    })
    onMounted(()=>{
      methods.getArticle(1)
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