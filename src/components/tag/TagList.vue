<template>
    <div id="post-wrapper">
     <div class="post pl-1 pr-1 pl-sm-2 pr-sm-2 pl-md-4 pr-md-4">
         <h1 class="dynamic-title">标签</h1>
  <div class="post-content">
    <div id="tags" class="d-flex flex-wrap ml-xl-2 mr-xl-2">
      <div>
        <a class="tag" href="javascript:;" v-for="item in data" :key="item.id" @click="toPage(`/tag/${item.id}`)">{{item.name}}<span class="text-muted"> {{item.expand.count}} </span></a>
      </div>
      
    </div>
  </div>
     </div>
    </div>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'
import { useRouter } from 'vue-router'
export default {
    name:'TagList',
    setup(){
        const router = useRouter()
        const state = reactive({
            data : JSON.parse(window.sessionStorage.getItem('TAG_LIST'))
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
.reply .card{
  background: var(--main-wrapper-bg);
  border-color: var(--card-border-color);
}
</style>