<template>
<div class="ct">
  我踩踩踩
</div>
</template>

<script>
import {onBeforeRouteUpdate, useRoute} from "vue-router";
import store from "@/store";
import {reactive, toRefs} from "@vue/reactivity";
import {nextTick, onMounted} from "@vue/runtime-core";

export default {
  name: "Context",
  data(){
    return {

    }
  },
  mounted() {
    this.$nextTick(()=>{
      let h = document.querySelector('#post-content').querySelectorAll("h1,h2,h3,h4,h5,h6");
      console.log(h)
    })
  }
}
</script>

<style scoped>

</style>