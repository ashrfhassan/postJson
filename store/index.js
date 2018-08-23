import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import constants from "./constants.json";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        historyRequests: [],
        collectionProjects: [],
        currentBodyType: constants.bodyRaw,
        currentHeaders:[],
        currentRawBody:{},
        currentFormBody:[]
    },
    getters: {
        historyRequests: state => state.historyRequests.reverse(),
        collectionProjects: state => state.collectionProjects.reverse(),
        currentBodyType: state => state.currentBodyType,
        currentHeaders: state => state.currentHeaders,
        currentRawBody: state => state.currentRawBody,
        currentFormBody: state => state.currentFormBody,
    },
    mutations: mutations,
    actions: actions,
    strict: true
})