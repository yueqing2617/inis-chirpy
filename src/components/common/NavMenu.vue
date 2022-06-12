<template>
        <ul class="w-100">
        <li class="inav-item" :class="{'actives': path === '/index'}">
          <a href="javascript:;" class="nav-link" @click="toPage('/index')">
            <i class="fa-fw fas fa-home ml-xl-3 mr-xl-3 unloaded"></i>
            <span>首页</span>
          </a>
        </li>
        <li class="inav-item" :class="{'actives': path === '/category'}">
          <a href="javascript:;" class="nav-link"  @click="toPage('/category')">
            <i class="fa-fw fas fa-stream ml-xl-3 mr-xl-3 unloaded"></i>
            <span>文章分类</span>
          </a>
        </li>
        <li class="inav-item" :class="{'actives': path === '/tag'}">
          <a href="javascript:;" class="nav-link"  @click="toPage('/tag')">
            <i class="fa-fw fas fa-tag ml-xl-3 mr-xl-3 unloaded"></i>
            <span>文章标签</span>
          </a>
        </li>
        <template v-if="menu.length > 0">
          <li class="inav-item" v-for="(item,index) in menu" :key="index" :class="{'actives': path === item.path}">
          <a href="javascript:;" class="nav-link" @click="toPage(item.path)">
            <i class="fa-fw fas  ml-xl-3 mr-xl-3 unloaded" :class="item.icon"></i>
            <span>{{item.name}}</span>
          </a>
        </li>
        </template>
      </ul>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'
import { useRouter, useRoute } from 'vue-router'
import { GET } from '../../utils/Request'
import { onMounted, watch } from '@vue/runtime-core'
export default {
    setup(){
      const router = useRouter()
      const route = useRoute()
      const state = reactive({
        path:'',
        menu:[]
      })
      watch(()=>route.path,(val)=>{
        state.path = val
      })
      const methods = {
        toPage(url){
          router.push({path:url})
        },
        async getPage(){
          let params = {
            limit : 9999
          }
          let st = sessionStorage.getItem('page') || []
          if(st.length == 0 || st == undefined){
            let resp = await GET('page',{params})
            let arr = []
            for(let i = 0;i<resp.data.data.length;i++){
              let line = resp.data.data[i]
              let l = {
                path : `/page/${line.alias}`,
                name : line.title,
                icon : 'fa-stars'
              }
              arr.push(l)
            }
            state.menu = arr
            sessionStorage.setItem('page',JSON.stringify(arr))
          }else{
            state.menu = JSON.parse(sessionStorage.getItem('page'))
          }

        }
      }
      onMounted(()=>{
        methods.getPage()
      })
      return {
        ...toRefs(state),
        ...methods
      }
    }
}
</script>

<style scoped>
@keyframes frames{
  from{
    height: 0px;
  }
  to{
    height: 150px;
  }
}
.inav-item{
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
}
.actives {
  border-right: 2px solid #333;
  color: var(--sidebar-active-color);
  animation-name: frames;
  transition-duration: 1.2s;
}
</style>