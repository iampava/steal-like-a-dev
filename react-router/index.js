import React from 'react';

var HistoryModule = (function historyModuleIIFE() {
    let subscribers = [];

    window.addEventListener('popstate', notifySubscribers);

    return {
        subscribe(cb) {
            subscribers.push(cb);
            window.addEventListener('popstate', cb);
        },
        unsubscribe(cb) {
            subscribers = subscribers.filter(subscribeCb => subscribeCb !== cb);
        },
        push(to, state) {
            window.history.pushState(state, undefined, to);

            notifySubscribers();
        },
        replace(to, state) {
            window.history.replaceState(state, undefined, to);

            notifySubscribers();
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

export class Switch extends React.Component {
    constructor(props) {
        super(props);

        this.state = { pathname: window.location.pathname };
        this.onHistoryChange = this.onHistoryChange.bind(this);
    }

    componentDidMount() {
        if (this.props.children.find(child => !Route.isPrototypeOf(child.type))) {
            throw new Error('Expecting all <Switch /> children to be <Route /> components!');
        }
        HistoryModule.subscribe(this.onHistoryChange);
    }

    componentWillUnmount() {
        HistoryModule.unsubscribe(this.onHistoryChange);
    }

    onHistoryChange() {
        this.setState({ pathname: window.location.pathname });
    }

    render() {
        const matchedRoute = this.props.children.find(child => {
            const { path, exact } = child.props;

            return parseRoutePath(path, exact).regexp.exec(this.state.pathname);
        });

        return matchedRoute || null;
    }
}

export class Route extends React.Component {
    constructor(props) {
        super(props);

        const { regexp, groupNames } = parseRoutePath(props.path, props.exact);

        this.state = {
            pathname: window.location.pathname,
            regexp,
            groupNames
        };

        this.onHistoryChange = this.onHistoryChange.bind(this);
    }

    static getDerivedStateFromProps(props) {
        return parseRoutePath(props.path, props.exact);
    }

    componentDidMount() {
        HistoryModule.subscribe(this.onHistoryChange);
    }

    componentWillUnmount() {
        HistoryModule.unsubscribe(this.onHistoryChange);
    }

    onHistoryChange() {
        this.setState({ pathname: window.location.pathname });
    }

    render() {
        const { regexp, groupNames, pathname } = this.state;
        const regexpResult = regexp.exec(pathname);

        if (regexpResult) {
            let params = {};

            groupNames.forEach((name, index) => (params[name] = regexpResult[index + 1]));

            return React.createElement(this.props.component || noop, {
                match: { params },
                location: {
                    state: window.history.state
                },
                history: {
                    push: HistoryModule.push,
                    replace: HistoryModule.replace
                }
            });
        }

        return null;
    }
}

export function Link(props) {
    let to = props.to || '#';
    let state = null;

    if (typeof to === 'object') {
        state = to.state;
        to = to.pathname;
    }

    let onClick = function onLinkClick(e) {
        e.preventDefault();
        HistoryModule.push(to, state);
    };

    if (props.onClick) {
        onClick = function(e) {
            props.onClick(e);
            onLinkClick(e);
        };
    }

    return (
        <a {...props} href={to} onClick={onClick}>
            {props.children}
        </a>
    );
}

export class Redirect extends React.Component {
    componentDidMount() {
        HistoryModule.push(this.props.to || '');
    }

    render() {
        return null;
    }
}

/******************************************* */
function noop() {}

function parseRoutePath(path = '', exact) {
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
