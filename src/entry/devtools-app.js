import Vue from 'vue';
import Vuex from 'vuex';
import App from '../components/app.vue';
import store from '../components/store';
// Vue.config.productionTip = false;

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log(
        sender.tab
            ? 'from a content script:' + sender.tab.url
            : 'from the extension',
    );
    if (request.greeting == 'hello') sendResponse({ farewell: 'goodbye' });
});

const init = () => {
    new Vue({
        store,
        render(h) {
            return h(App);
        },
    }).$mount('#app');
};

window.getData = () => {
    chrome.runtime.sendMessage({ greeting: 'hello' }, function(response) {
        console.log(response);
    });
};

window.onload = () => {
    init();
};
