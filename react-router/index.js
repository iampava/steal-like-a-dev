import React from 'react';

class Route extends React.Component {
    constructor({ exact = false, path = '' } = {}) {
        super();

        const { regexp, groupNames } = parsePath(path, exact);
        this.regexp = regexp;
        this.groupNames = groupNames;

        this.state = { dirty: false };

        this.onHistoryChange = this.onHistoryChange.bind(this);
    }

    componentDidMount() {
        HistoryModule.subscribe(this.onHistoryChange);
    }

    componentWillUnmount() {
        HistoryModule.unsubscribe(this.onHistoryChange);
    }

    onHistoryChange() {
        this.setState({ dirty: true });
    }

    render() {
        const regexpResult = this.regexp.exec(window.location.pathname);

        if (regexpResult) {
            let params = {};

            this.groupNames.forEach((name, index) => (params[name] = regexpResult[index + 1]));

            return React.createElement(this.props.component || noop, {
                match: { params }
            });
        }

        return null;
    }
}

function Link(props) {
    let to = props.to || '#';

    let onClick = HistoryModule.navigateTo(to);
    if (props.onClick) {
        onClick = function(e) {
            props.onClick(e);
            HistoryModule.navigateTo(to)(e);
        };
    }

    return (
        <a {...props} href={to} onClick={onClick}>
            {props.children}
        </a>
    );
}

export { Route, Link };

/******************************************* */
function noop() {}

function parsePath(path = '', exact) {
    let pathParts = path.split('/');
    let groupNames = [];

    let regexpString = pathParts
        .map(part => {
            const indexOf = part.indexOf(':');

            if (indexOf === -1) {
                return part;
            }

            if (indexOf > 0) {
                throw new Error(`The ":" must be at the beginning of the route path!`);
            }

            groupNames.push(part.slice(1));
            return '([^/]+)';
        })
        .join('/');

    return {
        regexp: new RegExp(`${regexpString}${exact ? '$' : ''}`),
        groupNames
    };
}

var HistoryModule = (function() {
    const subscribers = [];

    window.addEventListener('popstate', notifySubscribers);

    return {
        subscribe(cb) {
            subscribers.push(cb);
            window.addEventListener('popstate', cb);
        },
        unsubscribe(cb) {
            subscribers = subscribers.filter(subscribeCb => subscribeCb !== cb);
        },
        navigateTo(to) {
            return e => {
                e.preventDefault();
                notifySubscribers();
                window.history.pushState(window.history.state, undefined, to);
            };
        },
        dispose() {
            subscribers.length = 0;
            window.removeEventListener('popstate', notifySubscribers);
        }
    };

    function notifySubscribers() {
        subscribers.forEach(cb => cb());
    }
})();
