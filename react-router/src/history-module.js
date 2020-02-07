const HistoryModule = (function historyModuleIIFE() {
    let subscribers = [];
    let current = null

    window.addEventListener('popstate', onPopState);

    return {
        subscribe(cb) {
            subscribers.push(cb);
            cb();
        },
        unsubscribe(cb) {
            subscribers = subscribers.filter(subscribeCb => subscribeCb !== cb);
        },
        go(to, state, replace = false) {
            if(current && current.state === state && current.to === to) {
                return
            }

            if (!replace) {
                window.history.pushState(state, undefined, to);
            } else {
                window.history.replaceState(state, undefined, to);
            }

            current = { state, to }
            notifySubscribers();
        },
        
        replace(to, state) {
            window.history.replaceState(state, undefined, to);
            current = { state, to }

            notifySubscribers();
        },

        dispose() {
            current = null;
            subscribers.length = 0;
            window.removeEventListener('popstate', onPopState);
        }
    };

    function onPopState(e) {
        current = null;
        
        e.preventDefault();
        notifySubscribers();
    }

    function notifySubscribers(e) {
        subscribers.forEach(cb => cb());
    }
})();

export default HistoryModule;
