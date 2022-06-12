import { GET } from '@/utils/Request'

export const tags = {
    namespaced: true,
    state: {
        info:{}
    },
    mutations: {
        setInfo(state, info) {
          state.info = info;
          window.sessionStorage.setItem('TAG_LIST',JSON.stringify(info))
        },
    },
    actions:{
        async getTags({commit}){
            let params = {limit:9999}
            let resp = await GET('tag',{params});
            commit('setInfo',resp.data.data)
        }
    },
    getters:{
        info(state){
            return state.info
        }
    }
}