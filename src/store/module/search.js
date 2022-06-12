import { GET } from '../../utils/Request'

export const search = {
    namespaced: true,
    state: {
        info:{}
    },
    mutations: {
        setInfo(state, info) {
          state.info = info
        },
    },
    actions:{
        async getVal({commit},val){
             commit('setInfo',val)
        }
    },
    getters:{
        info(state){
            return state.info
        }
    }
}