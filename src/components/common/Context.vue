<template>
<div class="ct">
  <span>文章导航</span>
  <ul class="post-content pl-0 pb-1 ml-1 mt-2">
    <li v-for="item in list" :key="item.id">
      <a @click="toTarget(item.id)" :title="item.title">{{item.title}}</a>
    </li>
  </ul>
</div>
</template>

<script>
import {onBeforeRouteUpdate, useRoute} from "vue-router";
import store from "@/store";
import {reactive, toRefs} from "@vue/reactivity";
import {nextTick, onMounted} from "@vue/runtime-core";
import {computed} from "vue";

export default {
  name: "Context",
  setup() {
    const state = reactive({
      list: computed(() => store.state.context.title)
    })
    const methods = {
      // 锚点跳转
      toTarget(id) {
        let target = document.getElementById(id)
        if (target) {
          // 滚动到目标位置
          window.scrollTo(0, target.offsetTop)
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

<style scoped>
ul,li{
  list-style: none;
}
ul,li a{
  cursor: pointer;
}
</style>