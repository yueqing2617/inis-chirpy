<template>
  <div id="sidebar" class="d-flex flex-column align-items-end" lang="en">
      <div class="profile-wrapper text-center">
        <div id="avatar">
          <a :href="sys.image" alt="avatar" class="mx-auto">
            <img
              :src="sys.image"
              alt="avatar"
              onerror="this.style.display=&#39;none&#39;"
            />
          </a>
        </div>
        <div class="site-title mt-3">
          <a :href="sys.site_url">{{sys.title}}</a>
        </div>
        <div class="site-subtitle font-italic">{{sys.description}}</div>
      </div>
      <nav-menu/>
      <div
        class="sidebar-bottom mt-auto d-flex flex-wrap justify-content-center align-items-center">
<!--         <contact />-->
        <span class="icon-border order-2"></span>
        <theme/>
      </div>
      <p class="mb-0 copy"> &copy; 2021 {{sys.title}} <a href="https://beian.miit.gov.cn/">{{sys.copy}}</a></p>
    </div>
</template>

<script>
import Theme from './Theme.vue'
import Contact from './Contact.vue'
import NavMenu from './NavMenu.vue'
import {reactive, toRefs} from "@vue/reactivity";
import store from "@/store";
import {SYS_INFO} from "@/store/module/system";
import {getItem} from "@/utils/storage";
export default {
    name : 'Sidebar',
    components: { Theme, Contact, NavMenu },
    setup(){
      const state = reactive({
        sys: getItem(SYS_INFO)
      })
      // console.log(store.state.system.info)
      return {
        ...toRefs(state)
      }
    }
}
</script>

<style scoped>
.copy{
    font-size: 12px;
    width: 100%;
    text-align: center;
}
</style>