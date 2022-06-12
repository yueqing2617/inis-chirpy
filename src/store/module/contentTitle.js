export const ContentTitle = {
    namespaced: true,
    state: {
        status: false
    },
    mutations: {
        setStatus(state, info) {
            state.status = info
        },
    },
    actions: {
        setStatusTrue({commit}){
            commit('setStatus',true)
        },
        setStatusFalse({commit}){
            commit('setStatus',false)
        },
    },
    getters: {
        status(state){
            return state.status
        }
    }
}