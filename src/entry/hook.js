const installHook = window => {
    const hook = {
        install() {},
    };

    Object.defineProperty(window, '__DATA_DEBUGGER_DEVTOOLS_GLOBAL_HOOK__', {
        get() {
            return hook;
        },
    });
};

const script = document.createElement('script');
script.textContent = ';(' + installHook.toString() + ')(window)';
document.documentElement.appendChild(script);
script.parentNode.removeChild(script);
