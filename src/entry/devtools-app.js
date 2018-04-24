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

const init = fn => {
    new Vue({
        store,
        render(h) {
            return h(App);
        },
    }).$mount('#app');
    fn && fn();
};
const inject = (scriptName, fn) => {
    const src = `
        var script = document.constructor.prototype.createElement.call(document, 'script');
        script.src = "${scriptName}";
        document.documentElement.appendChild(script);
        script.parentNode.removeChild(script);
  `;

    chrome.devtools.inspectedWindow.eval(src, function(res, err) {
        if (err) {
            console.log(err);
        }
        fn && fn();
    });
};

window.getData = () => {
    chrome.runtime.sendMessage({ greeting: 'hello' }, function(response) {
        console.log(response);
    });
};

window.onload = () => {
    init(() => {
        inject(chrome.runtime.getURL('build/backend.js'), () => {
            console.log('backend injected');
        });
    });
};
