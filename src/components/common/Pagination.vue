<template>
  <ul class="pagination mt-4 mb-0 pl-lg-2">
        <li class="page-item" :class="{disabled: curr <= 1}" @click="prev"> <a class="page-link btn-box-shadow" href="#" aria-label="previous-page"> <i class="fas fa-angle-left"></i> </a></li>
        <!-- <li class="page-item active"> <a class="page-link btn-box-shadow" href="/">1</a></li>
        <li class="page-item "> <a class="page-link btn-box-shadow" href="/page2/">2</a></li>
        <li class="page-item "> <a class="page-link btn-box-shadow" href="/page3/">3</a></li>
        <li class="page-item disabled"> <span class="page-link btn-box-shadow">...</span></li>
        <li class="page-item "> <a class="page-link btn-box-shadow" href="/page14/">14</a></li> -->
        
        <li class="page-item " v-for="i in list" :key="i" @click="page(i)" :class="{active:curr == i}"> <a class="page-link btn-box-shadow" >{{i}}</a></li>


        <li class="page-item " :class="{disabled: curr >= totalPage}" @click="next"> <a class="page-link btn-box-shadow" aria-label="next-page"> <i class="fas fa-angle-right"></i> </a></li>
       </ul>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'
import { onMounted, watch } from '@vue/runtime-core'
import { Tools } from '../../utils/tools'
export default {
    name : "Pagination",
    props:{
        current:{
            type:Number,
            default:0
        },
        total:{
            type:Number,
            default:0
        },
        limit:{
            type:Number,
            default:0
        }
    },
    setup(props,context){
      const tool = new Tools()
      const state = reactive({
            list : [],
            curr:props.current,
            totalPage : 0
        })
      const methods = {
            pageTotal(rowCount, pageSize) {
             if (rowCount == null || rowCount == "") {
            	return 0;
            	} else {
            		if (pageSize != 0 && rowCount % pageSize == 0) {
            			return parseInt(rowCount / pageSize);
            		}
            		if (pageSize != 0 && rowCount % pageSize != 0) {
            			return parseInt(rowCount / pageSize) + 1;
            		}
            	}
            },
            pagintive(current){
               state.totalPage = methods.pageTotal(props.total,props.limit)  
               let arrs = tool.createPaging(current,state.totalPage,4)
            //    console.log(helpers.CreatePaging(1,3,3))
               state.list = arrs;
            },
            page(val){
                state.curr = val;
                context.emit('ClickEvent',val)
            },
            prev(){
                if(state.curr == 1){
                    state.curr = 1
                }else{
                    state.curr--
                }
            },
            next(){
                if(state.curr == state.totalPage){
                    state.curr = state.totalPage
                }else{
                    state.curr++
                }
            }
        }
        watch(()=>state.curr,(val)=>{
            methods.pagintive(val)
            state.curr = val;
            context.emit('ClickEvent',val)
        })
        onMounted(()=>{
            state.totalPage = methods.pageTotal(props.total,props.limit)  
            methods.pagintive(props.current)
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