// DevTools page -- devtools.js
// Create a connection to the background page
var backgroundPageConnection = chrome.runtime.connect({
    name: 'devtools-page',
});

backgroundPageConnection.onMessage.addListener(function(message) {
    // Handle responses from the background page, if any
});

// Relay the tab ID to the background page
// chrome.runtime.sendMessage({
//     tabId: chrome.devtools.inspectedWindow.tabId,
//     scriptToInject: 'panel.js',
// });
console.log(111);
