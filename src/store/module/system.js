import { GET } from '@/utils/Request'
import {getItem, removeItem, setItem} from "@/utils/storage";
export const SYS_INFO = 'SITE-INFO'
export const SYS_TITLE = 'SITE-TITLE'
export const system = {
    namespaced: true,
    state: {
        info:{},
        title:getItem(SYS_TITLE) || window.inzj.title,
        master: {}
    },
    mutations: {
        setInfo(state, data) {
          state.info = data;
          setItem(SYS_INFO, data)
        },
        setTitle(state, data) {
            state.title = data;
            setItem(SYS_TITLE,data)
        },
        setWebmaster(state, data) {
            state.master = data;
        },
        clearSysInfo(state) {
            state.info = null
            state.title = window.inzj.title
            state.master = null
            removeItem(SYS_INFO)
            removeItem(SYS_TITLE)
        }
    },
    actions:{
        async getSystemInfo({commit}){
            let resp = await GET('options');
            commit('setInfo',resp.data.site.opt)
            commit('setTitle',resp.data.site.opt.title)
            commit('setWebmaster',resp.data.webmaster.opt)
        },
        clearSystem({ commit }) {
            commit('clearSysInfo')
        }
    },
}