import Bridge from '../components/bridge';

const getData = e => {
    if (e.data.source === 'data-debugger' && e.data.data === 'init') {
        window.removeEventListener('message', getData);
        const listenList = [];
        const bridge = new Bridge({
            listen(fn) {
                const listener = e => {
                    if (e.data.source === 'data-debugger') {
                        console.log(e.data);
                        fn(e.data.data);
                    }
                };
                listenList.push(listener);
                window.addEventListener('message', listener);
            },
            send(data) {
                console.log(data);
                window.postMessage(
                    {
                        source: 'data-debugger-backend',
                        data: data,
                    },
                    '*',
                );
            },
        });
        bridge.on('close', () => {
            listenList.map(v => {
                window.removeEventListener('message', v);
            });
        });
        bridge.on('flush', data => {
            bridge.send('flush', window.test);
        });
    }
};
window.addEventListener('message', getData);
