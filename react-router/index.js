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
        navigateTo(to) {
            return e => {
                e.preventDefault();
                window.history.pushState(window.history.state, undefined, to);

                notifySubscribers();
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

class Switch extends React.Component {
    constructor(props) {
        super(props);

        this.state = { pathname: window.location.pathname };
        this.onHistoryChange = this.onHistoryChange.bind(this);
    }

    componentDidMount() {
        if (this.props.children.find(child => child.type !== Route)) {
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

class Route extends React.Component {
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

export { Switch, Route, Link };

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
