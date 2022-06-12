<template>
  <sidebar />
  <topbar/>
  <div id="main-wrapper">
   <div id="main">
    <div class="row">
     <div class="col-12 col-lg-11 col-xl-8">
      <div id="page" class="post pb-5 pl-1 pr-1 pl-sm-2 pr-sm-2 pl-md-4 pr-md-4 mb-md-4">
        <router-view/>
      </div>
     </div>
     <div id="panel-wrapper" class="col-xl-3 pl-2 text-muted topbar-down">
      <div class="access topbar-down">
        <context v-if="ctstate"/>
       <recent/>
       <hot-tags/>
      </div>
     </div>
    </div>
    <footers :sys="sysInfo"/>
   </div>
   <search-result/>
  </div>
  <div id="mask"></div>
  <a id="back-to-top" href="javascript:;" aria-label="back-to-top" class="btn btn-lg btn-box-shadow" role="button" style="display: none;"> <i class="fas fa-angle-up"></i> </a> 
</template>

<script>
import { nextTick, onMounted } from '@vue/runtime-core'
import HotTags from '../components/common/HotTags.vue'
import Recent from '../components/common/Recent.vue'
import Sidebar from '../components/common/Sidebar.vue'
import Topbar from '../components/common/Topbar.vue'
import {Tools} from '../utils/tools' 
import Footers from '../components/common/Footers.vue'
import SearchResult from '../components/common/SearchResult.vue'
import {onBeforeRouteUpdate, useRoute} from 'vue-router'
import { useStore } from 'vuex'
import Context from "@/components/common/Context";
import {reactive, toRefs} from "@vue/reactivity";
import {computed} from "vue";

export default {
  components: {Context, Sidebar, Topbar, Recent, HotTags, Footers,SearchResult },
  name: 'Home',
  setup(){
    const tool = new Tools()
    const route = useRoute()
    const store = useStore()
    onMounted(()=>{
      nextTick(()=>{
        tool.loadScript("./assets/js/home.min.js")
      })
    })
    const state = reactive({
      ctstate: computed(() => store.state.context.status),
    })

    return {
      ...toRefs(state)
    }
  },
  
}
</script>
<style>

</style>