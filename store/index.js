import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        historyRequests: [],
        collectionProjects: []
    },
    getters: {
        historyRequests: state => state.historyRequests.reverse(),
        collectionProjects: state => state.collectionProjects.reverse(),
    },
    mutations: mutations,
    actions: actions,
    strict: true
})