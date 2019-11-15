import React from 'react';
import HistoryModule from './history-module';

class WithHistory extends React.Component {
    constructor(props) {
        super(props);
        this.onHistoryChange = this.onHistoryChange.bind(this);
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
}

export class Switch extends WithHistory {
    constructor(props) {
        super(props);

        this.state = { pathname: window.location.pathname };
    }

    componentDidMount() {
        if (this.props.children.find(child => !WithHistory.isPrototypeOf(child.type))) {
            throw new Error('Expecting all <Switch /> children to be <Route /> or <Redirect /> components!');
        }

        WithHistory.prototype.componentDidMount.call(this);
    }

    render() {
        const matchedRoute = this.props.children.find(child => {
            let path, exact = child.props.exact;

            if(child.type === Route || Route.isPrototypeOf(child.type)) {
                path = child.props.path
            } else {
                exact = child.props.exact && child.props.from
                path = child.props.from || '/'
            }

            const parsedPaths = parseRoutePaths(path, exact);

            return parsedPaths.find(({ regexp }) => regexp.exec(this.state.pathname));
        });

        return matchedRoute || null;
    }
}

export class Route extends WithHistory {
    constructor(props) {
        super(props);

        this.state = {
            pathname: window.location.pathname,
            parsedPaths: parseRoutePaths(props.path, props.exact)
        };
    }

    static getDerivedStateFromProps(props) {
        return {
            parsedPaths: parseRoutePaths(props.path, props.exact)
        };
    }

    render() {
        const { parsedPaths, pathname } = this.state;

        for (let { regexp, groupNames } of parsedPaths) {
            const regexpResult = regexp.exec(pathname);

            if (regexpResult) {
                let params = {};

                groupNames.forEach((name, index) => (params[name] = regexpResult[index + 1]));

                return React.createElement(this.props.component || Noop, {
                    match: { params },
                    location: {
                        state: window.history.state,
                        search: window.location.search,
                        hash: window.location.hash,
                        pathname: window.location.pathname
                    },
                    history: {
                        push: HistoryModule.go,
                        replace: HistoryModule.replace
                    }
                });
            }
        }

        return null;
    }
}

export function Link(props) {
    let [to, state] = parseToProp(props.to);
    let replace = props.replace || false;

    let onClick = function onLinkClick(e) {
        e.preventDefault();
        HistoryModule.go(to, state, replace);
    };

    if (props.onClick) {
        onClick = function(e) {
            props.onClick(e);
            onLinkClick(e);
        };
    }

    let processedProps = Object.assign({}, props, {
        onClick
    });
    delete processedProps.to;
    delete processedProps.replace;

    return React.createElement('a', {
        ...processedProps,
        href: to
    }, ...props.children);
}

export class Redirect extends WithHistory {
    onHistoryChange() {
        let { push, from, exact } = this.props;
        let [to, state] = parseToProp(this.props.to);

        if (!from) {
            return HistoryModule.go(to, state, push);
        } else {
            let currentPathname = this.props.location ? this.props.location.pathname : window.location.pathname
            let parsedFromPath = parseRoutePaths(from, exact);
            let shouldRedirect = parsedFromPath.find(({ regexp }) => regexp.exec(currentPathname));

            if (shouldRedirect) {
                HistoryModule.go(to, state, !push);
            }
        }
    }

    render() {
        return null;
    }
}

/******************************************* */
function Noop() {}

/**
 *
 * @param {string | string[]} path
 * @param {boolean} exact
 */
function parseRoutePaths(path = '', exact) {
    let paths = Array.isArray(path) ? path : [path];

    return paths.map(path => {
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
    });
}

function parseToProp(to) {
    if (typeof to !== 'string' && typeof to !== 'function' && (typeof to !== 'object' || to === null)) {
        throw new Error('react-router: expecting "to" prop to be one of string|function|object. Actual value: ', to);
    }

    if (typeof to === 'object') {
        let { pathname, search, hash, state } = to;
        pathname = pathname || '';
        search = search || '';
        hash = hash ? `#${hash}` : '';

        return [`${pathname}${to.search}${hash}`, state];
    } else if (typeof to === 'function') {
        to = to(window.location);

        return [`${to.pathname}${to.search}${to.hash}`, to.state];
    }

    return [to || '#', null];
}
