import './styles/main.scss';
import './styles/loader.scss';
import './styles/prettyJson.scss';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'vue-material/dist/vue-material.min.css'
import './helpers/protoTypes';
import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import VueMaterial from 'vue-material'
import App from './components/app.vue';
import store from './store';

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(VueMaterial);

new Vue({
    store,
    render: h => h(App)
}).$mount('#app');
