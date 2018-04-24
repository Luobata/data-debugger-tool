let created = false;
let timer = window.setTimeout(create, 1000);

const create = () => {
    if (created) return;

    chrome.devtools.inspectedWindow.eval('!!(true)', function(hasVue) {
        if (!hasVue) return;
        window.clearTimeout(timer);
        created = true;
        chrome.devtools.panels.create(
            'Data-debugger',
            'images/back.jpg',
            'devtools.html',
            function() {
                // panel loaded
            },
        );
    });
};

chrome.devtools.network.onNavigated.addListener(create);

create();
