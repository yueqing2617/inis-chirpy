export const context = {
    namespaced: true,
    state: {
        status: false,
        title: [],
    },
    mutations: {
        setStatus(state, info) {
            state.status = info
        },
        setTitle(state, info) {
            state.title = info
        }
    },
    actions: {
        setTitle({commit},info){
            commit('setTitle',info)
        },
        setStatus({commit},info){
            commit('setStatus',info)
        }
    },
    getters: {
        status(state){
            return state.status
        },
        title(state){
            return state.title
        }
    }
}