chrome.runtime.onConnect.addListener(function(devToolsConnection) {
    // assign the listener function to a variable so we can remove it later
    var devToolsListener = function(message, sender, sendResponse) {
        // Inject a content script into the identified tab
        chrome.tabs.executeScript(message.tabId, {
            file: message.scriptToInject,
        });
    };
    // add the listener
    devToolsConnection.onMessage.addListener(devToolsListener);

    devToolsConnection.onDisconnect.addListener(function() {
        devToolsConnection.onMessage.removeListener(devToolsListener);
    });
});
const port = chrome.runtime.connect({
    name: 'content-script',
});
port.onMessage.addListener(receive);
const receive = function(request, sender, sendResponse) {
    console.log(
        sender.tab
            ? 'from a content script:' + sender.tab.url
            : 'from the extension',
    );
    if (request.greeting == 'hello')
        sendResponse({ farewell: JSON.stringify({ farewell: 'goodbye' }) });
};
const devTools = data => {
    if (data.source === 'data-debugger') {
        port.postMessage(data.data);
    }
};
chrome.runtime.onMessage.addListener(receive);
window.addEventListener('message', devTools);
