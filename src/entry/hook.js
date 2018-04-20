console.log(1);
window.postMessage(
    {
        greeting: 'hello there!',
        source: 'my-devtools-extension',
    },
    '*',
);
