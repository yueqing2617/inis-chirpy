import {Tools} from '@/utils/tools'
import router from './router'
import store from './store'
import {SYS_INFO} from "@/store/module/system";
import {getPageTitle} from "@/utils/system";

// 路由守卫
router.beforeEach(async to =>{
    document.title = getPageTitle(!!to.meta && to.meta.title)
    // if(!asyncSystem){
    //     asyncSystem++;
    //
    //     next({...to,replace:true})
    // } else {
    //     if (to.matched.length){
    //         next()
    //     }else {
    //         next({path:'/404'})
    //     }
    // }
    if(!window.localStorage[SYS_INFO]){
        await store.dispatch('system/getSystemInfo')
    }
    if(!window.sessionStorage['TAG_LIST']){
        await store.dispatch('tags/getTags')
    }
    if(to.name === 'ArticleView') {
        await store.dispatch('context/setStatus',true)
    }else {
        await store.dispatch('context/setStatus',false)
    }
})