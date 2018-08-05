import 'babel-polyfill'
import './app.scss'
import Vue from 'vue'
import App from './components/app.vue'
import store from './store'

new Vue({
    el: '#app',
    store,
    render: h => h(App)
})
