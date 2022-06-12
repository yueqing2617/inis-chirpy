<template>
  <Reply v-if="is_show" :allow="isAllowComment"  @reset="getComments()"></Reply>
  <!-- 评论框 - 结束 -->

  <div class="media mt-2 row">
    <!-- 评论 - 开始 -->
    <div class="card-body col-md-12"  v-for="data in comments.data" :key="data.id">
      <div class="comment-item">
        <div class="comment-item-img">
          <a :href="(data.url == null) ? data.url : '//'+data.url" target="_blank">
            <img :src="data.expand.head_img" class="avatar-sm" alt="">
          </a>
        </div>
        <div class="rs rsx">
          <h5 class="comment-item-author">
            <a :href="(data.url == null) ? data.url : '//'+data.url" target="_blank">{{ data.nickname }}</a>
            <a href="javascript:;" @click="btnReply(data.id)" class=" reply-btn " >回复</a>
          </h5>
          <p class="comment-item-text">{{ fmt(data.create_time) }}</p>
          <p class="text-muted">{{ data.content }}</p>
        </div>
      </div>

      <!-- 回复 - 开始 -->
      <div class="comment-item ml-4" v-for="reply in data.son" :key="reply.id">
        <div class="comment-item-img">
          <a :href="(!reply.expand.url) ? 'javasctipt:;' : '//' + reply.expand.url" target="_blank">
            <img :src="reply.expand.head_img" class="avatar-sm">
          </a>
        </div>
        <div class="rs">
          <h5 class="comment-item-author">
            <a :href="(!reply.expand.url) ? 'javasctipt:;' : '//' + reply.expand.url" target="_blank">{{ reply.nickname }}</a>
            <a href="javascript:;" @click="btnReply(reply.id)" class=" reply-btn ">回复</a>
          </h5>
          <p class="comment-item-text">{{ fmt(reply.create_time) }}</p>
          <p class="text-muted">{{ reply.content }}</p>
        </div>
        <!-- 评论框 - 开始 -->
        <Reply v-if="(comments_reply_id == reply.id) ? true : false" :pid="reply.id" :allow="isAllowComment" @reset="getComments()"></Reply>
        <!-- 评论框 - 结束 -->
      </div>
      <!-- 回复 - 结束 -->

      <!-- 评论框 - 开始 -->
      <Reply v-if="(comments_reply_id == data.id) ? true : false" :pid="data.id" :allow="isAllowComment" @reset="getComments()"></Reply>
      <!-- 评论框 - 结束 -->
    </div>
    <!-- 评论 - 结束 -->
  </div>

  <div class="text-center">
    <!-- 加载动画 开始 -->
    <div v-if="page_is_load" class="btn-group mb-2" style="float: right">
      <button class="btn btn-light" type="button" disabled>
        <span class="spinner-border spinner-border-sm mr-1" role="status" aria-hidden="true"></span>
        加载中...
      </button>
    </div>
    <!-- 加载动画 结束 -->

    <div v-else-if="!page_is_load && page_is_show" class="btn-group inis-page-list mt-2" style="float: right">
      <button v-if="page != 1" @click="getComments(page - 1, true)" class="btn btn-light">
                <span class="inis-page">
                    <svg-icon file-name="primary-left"></svg-icon>
                </span>
      </button>
      <button v-for="(item, index) in page_list" :key="index" @click="getComments(item, true)" :class="(page == item) ? 'btn btn-primary' : 'btn btn-light'">{{item}}</button>
      <button v-if="page != comments.page" @click="getComments(page + 1, true)" class="btn btn-light">
                <span class="inis-page">
                    <svg-icon file-name="primary-right"></svg-icon>
                </span>
      </button>
    </div>
  </div>
</template>

<script>
import {reactive, toRefs} from "@vue/reactivity";
import {GET} from "@/utils/Request";
import {useRoute} from "vue-router";
import {onMounted} from "@vue/runtime-core";
import {useStore} from "vuex";
import {inisHelper} from "@/utils/helper";
import Reply from "@/components/comment/Reply";
import {toast} from "@/utils/toast";
import {Tools} from '@/utils/tools'

export default {
  name: "Comments",
  components: {Reply},
  props: {
    isAllow: {
      type: String,
      default: true
    }
  },
  setup(props){
    const route = useRoute()
    const store = useStore()
    const tools = new Tools()
    const state = reactive({
      comments: [],           // 评论 - 回复 - 内容
      is_show: true,          // 评论框显示
      comments_reply_id: null,// 评论ID
      page_is_show: false,    // 是否显示分页
      page: 1,                // 当前评论页码
      is_load: true,          // 数据加载动画
      page_list: [],          // 评论页码列表
      page_is_load:true,      // 页码加载动画
      config: {			    // 配置
        comments: {
          show : false,   // 显示评论
          allow: false,   // 允许评论
        },
      },
      isAllowComment:props.isAllow
    })
    const methods = {
      async getComments(page){
        let params = {
          limit: state.limit,
          page: page,
          article_id: route.params.id,
          tree:false
        }
        const {code, msg, data} = await GET('comments',{params})
        state.comments = data
        if(inisHelper.is.empty(state.comments.data) || state.comments.page == 1) state.page_is_show = false
        state.page = page
        state.page_list = inisHelper.create.paging(page, state.comments.page, 7)
        // 数据加载动画
        state.is_load = false
        // 页码加载动画
        state.page_is_load = false
      },
      btnReply(id = null){
        if(props.isAllow === false){
          toast.warning('该文章未开放评论')
        }else {
          state.comments_reply_id = id
          if(state.comments_reply_id != null) state.is_show = false
        }
      },
      fmt(time){
        return tools.timetostamp(time)
      }
    }
    onMounted(()=>{
      methods.getComments(1)
    })
    return {
      ...toRefs(state),
      ...methods
    }
  }
}
</script>

<style scoped>
.comment-item{
  display: flow-root;
  width: 100%;
  padding: 10px;
  justify-content: left;
  height: auto;
  flex-direction:column;
}
.comment-item::before{
  content: '';
  clear: both;
}
.comment-item-img{
  width: 40px;
  float: left;
}
.comment-item-img img{
  border-radius: 100%;
}
.rs{
  padding: 0 10px;
  width: calc(100% - 65px);
  position: relative;
  display: grid;
}
.rs h5{
  padding-top: 2.5rem;
}
.rs p{
  margin-block-start: 0;
  margin-block-end: 0;
}
.comment-item-text{
  font-size: 13px;
  position: absolute;
  left: 10px;
  top: 15px;
}
.text-muted{
  min-height: 50px;
  padding-top: 10px;
}
.reply-btn{
  color: var(--text-color);
  position: absolute;
  right: 0px;
  text-decoration: none;
  border: 1px solid var(--btn-backtotop-color);
  font-size: 13px;
  padding: 5px 10px;
  border-radius: 5px;
}
.reply-btn:hover{
  font-weight: bolder;
}
.rsx{
  border-bottom: 1px solid var(--card-border-color);
}
</style>