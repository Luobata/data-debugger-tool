import Vue from 'vue';
import Vuex from 'vuex';
import App from '../components/app.vue';
import store from '../components/store';
Vue.config.productionTip = false;

window.onload = () => {
    new Vue({
        store,
        render(h) {
            return h(App);
        },
    }).$mount('#app');
};
