<template>
  <div id="topbar-wrapper" class="row justify-content-center topbar-down">
   <div id="topbar" class="col-11 d-flex h-100 align-items-center justify-content-between"> 
    <span id="breadcrumb"> <span>{{title}}</span> </span>
    <i id="sidebar-trigger"  class="fas fa-bars fa-fw"></i>
    <div id="topbar-title">
      {{title}}
    </div>
    <i id="search-trigger" class="fas fa-search fa-fw"></i> 
    <span id="search-wrapper" class="align-items-center"> <i class="fas fa-search fa-fw"></i> <input class="form-control search-input"  v-model="search" type="search" aria-label="search" placeholder="搜索..." @keyup.enter="enterInput"/> <i class="fa fa-times-circle fa-fw" id="search-cleaner"></i> </span> 
    <span id="search-cancel">取消</span>
   </div>
  </div>
</template>

<script>
import { reactive, toRefs, watch } from '@vue/runtime-core'
import { useRouter } from 'vue-router'
import store from "@/store";
export default {
    name :'Topbar',
    setup(){
      const router = useRouter()
      const state = reactive({
        search:'',
        title: store.state.system.title
      })
      watch(()=>state.search,(val)=>{
        if(val != ''){
          router.push({path:`/search/${val}`})
        }
      })
      const methods = {
        enterInput(){
          if(val != ''){
            router.push({path:`/search/${val}`})
          }
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
#sidebar-trigger,#search-trigger{
    cursor: pointer;
}

</style>