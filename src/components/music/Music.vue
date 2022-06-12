<template>
  <div class="music">
      <div class="m-box">
          <img src="" alt="" class="thumb">
          <div class="contro"> 
              <a href="javascript:;" @click="prev()"></a>
              <a href="javascript:;" @click="play()"></a>
              <a href="javascript:;" @click="next()"></a>
          </div>
      </div>
  </div>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'
import { GET } from '@/utils/Request'
export default {
    name: 'Music',
    setup(){
        const state = reactive({
            dataList:[]
        })
        const methods = {
            async getMusicList(){
                let params = {}
                let resp = await GET('music',{params});
                console.log(resp.data)
            }
        }
        onMounted(()=>{
            methods.getMusicList()
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