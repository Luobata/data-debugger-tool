import Vue from 'vue';
import Vuex from 'vuex';
import App from '../components/app.vue';
import store from '../components/store';
import Bridge from '../components/bridge';

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

window.onload = () => {
    init(() => {
        inject(chrome.runtime.getURL('build/backend.js'), () => {
            console.log('backend injected');
            const port = chrome.runtime.connect({
                name: '' + chrome.devtools.inspectedWindow.tabId,
            });
            const bridge = new Bridge({
                listen(fn) {
                    port.onMessage.addListener(fn);
                },
                send(data) {
                    port.postMessage(data);
                },
            });
            bridge.on('flush', data => {
                console.log(data);
                store.commit('changeData', data);
            });
            window.getData = () => {
                bridge.send('flush');
            };
        });
    });
};
