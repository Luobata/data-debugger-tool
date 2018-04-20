import Vue from 'vue';
import App from '../components/app.vue';
Vue.config.productionTip = false;

window.onload = () => {
    new Vue({
        render(h) {
            return h(App);
        },
    }).$mount('#app');
};
