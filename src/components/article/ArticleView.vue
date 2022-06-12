<template>
  <div id="post-wrapper" v-if="data.title">
  <div class="post pl-1 pr-1 pl-sm-2 pr-sm-2 pl-md-4 pr-md-4">
    <h1>{{data.title}}</h1>
    <div class="post-meta text-muted d-flex flex-column">
      <div>
        <span class="semi-bold" v-if="data.expand">
         
         <span v-if="data.expand.author">{{data.expand.author.nickname}}</span>
        </span>
      </div>
      <div>
        <span>
          Updated
          {{fmt(data.update_time)}}
          >
        </span>
        
        <span id="pv" class="pageviews">{{data.views}}</span> views
      </div>
    </div>
    <div class="post-content" id="post-content">
      
      <p v-html="data.content"></p>
      
    </div>

    
</div>
    <hr>
    <h3>文章点评</h3>
    <div class="comments" v-if="isComments">
      <Comments :is-allow="allow_comment"/>
    </div>
    <div class="comment-close" v-else>
      该文章已关闭评论
    </div>
</div>
  <div class="loading" v-else>
    加载中...
  </div>

</template>

<script>
import { reactive, toRefs } from '@vue/reactivity';
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import { onMounted } from '@vue/runtime-core';
import { GET } from '@/utils/Request';
import {Tools} from '@/utils/tools'
import { useStore } from 'vuex';
import {getPageTitle} from "@/utils/system";
import Comments from "@/components/comment/Comments";
const isOpen = window.inzj.is_comments
export default {
    name:'ArticleView',
  components: {Comments},
  setup(){
        const store = useStore()
        const tool = new Tools()
        const route = useRoute()
        const state = reactive({
            data:{},
            aid:null,
            expand:null,
            isComments: isOpen,
            allow_comment: true
        })

        state.aid = route.params.id
        const methods = {
            async getArticle(id){
                let params = {
                    id : id
                }
                let {code, data} = await GET('article',{params})
                state.data = data
                document.title = getPageTitle(data.title)
                state.expand = data.expand
                if(data.opt.comments){
                  console.log("has")
                  if(data.opt.comments.show == "false"){
                    state.isComments = false
                  }
                  if(data.opt.comments.allow == "false"){
                    state.allow_comment = false
                  }
                }

            },
            fmt(time){
                return tool.getTimeToStamp(time)
            },
        }
        onBeforeRouteUpdate(async(to,from,next)=>{
            state.aid = to.params.id
            methods.getArticle(to.params.id)
            next()
        })
        onMounted(()=>{
            methods.getArticle(state.aid)
        })
        return {
            ...toRefs(state),
            ...methods
        }
    }
}
</script>

<style scoped>
.loading{
  padding: 20px;
}
</style>