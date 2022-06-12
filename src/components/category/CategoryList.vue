<template>
  <div id="post-wrapper">
     <div class="post pl-1 pr-1 pl-sm-2 pr-sm-2 pl-md-4 pr-md-4">
         <h1 class="dynamic-title">分类</h1>
  <div class="post-content">
    <ul class="list-group">
    <li class="list-group-item d-flex justify-content-between align-items-center" v-for="item in data" :key="item.id" @click="toPage(`/category/${item.id}`)">
    {{item.name}}
    <span class="badge badge-primary badge-pill">{{item.expand.count}}</span>
  </li>
</ul>
  </div>
     </div>
    </div>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'
import { GET } from '../../utils/Request'
import { useRouter } from 'vue-router'
export default {
    name:'CategoryList',
    setup(){
        const router = useRouter()
        const state = reactive({
            data : null
        })
        const methods = {
            async getCategory(){
                let params = {
                    limit : 9999
                }
                let resp = await GET("article-sort",{params})
                state.data = resp.data.data
            },
            toPage(url){
              router.push({path:url})
            }
        }
        onMounted(()=>{
            methods.getCategory()
        })
        return {
            ...toRefs(state),
            ...methods
        }
    }
}
</script>

<style scoped>
.list-group-item{
    cursor: pointer;
}
</style>