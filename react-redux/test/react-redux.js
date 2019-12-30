const React = require('react');

function createStore(reducer, preloadedState, enhancer) {
    let state = reducer(preloadedState, { type: undefined });

    let listeners = [];
    let dispatch = actualDispatch;

    if (typeof enhancer === 'function') {
        dispatch = function enhancedDispatch(action) {
            enhancer(action, { getState, dispatch: actualDispatch });
        };
    }

    return {
        getState,
        dispatch,
        subscribe
    };

    function getState() {
        return state;
    }

    function actualDispatch(action) {
        state = reducer(state, action);
        listeners.forEach(cb => cb(state));
    }

    function subscribe(cb) {
        listeners.push(cb);
        cb(state);

        return () => {
            listeners.splice(listeners.indexOf(cb), 1);
        };
    }
}

function combineReducers(reducers) {
    return function(state, action) {
        let newState = {};

        Object.keys(reducers).forEach(key => {
            newState[key] = reducers[key](state[key], action);
        });

        return newState;
    };
}

function applyMiddleware(...middlewares) {
    return function(action, { getState, dispatch }) {
        let i = 0;

        middlewares[i]({ getState, dispatch })(function nextDispatch(action) {
            i++;
            if (i === middlewares.length) {
                dispatch(action);
            } else if (i === middlewares.length - 1) {
                middlewares[i]({ getState, dispatch })(dispatch)(action);
            } else {
                middlewares[i]({ getState, dispatch })(nextDispatch)(action);
            }
        })(action);
        for (let i = 1; i < middlewares.length - 1; i++) {}
    };
}

const ReactReduxContext = React.createContext();

function connect(mapFn, mergeProps = defaultMergeProps) {
    return function(Component) {
        class ConnectedComponent extends React.Component {
            constructor(props, context) {
                super(props, context);

                let stateProps = {};
                if (mapFn !== null || mapFn !== undefined) {
                    stateProps = mapFn(this.context.getState());
                }

                this.state = mergeProps(
                    Object.assign(stateProps, {
                        dispatch: this.context.dispatch
                    }),
                    this.props
                );
                this.stateCopy = { ...this.state };

                if (mapFn !== null && mapFn !== undefined) {
                    this.stateUnsubscribe = this.context.subscribe(state => {
                        let newProps;
                        try {
                            newProps = mergeProps(
                                Object.assign(mapFn(state), {
                                    dispatch: this.context.dispatch
                                }),
                                this.props
                            );
                        } catch (err) {
                            newProps = {};
                        }

                        Object.keys(newProps).every(key => {
                            if (newProps[key] !== this.state[key]) {
                                this.stateCopy = { ...newProps };
                                this.setState(newProps);

                                return false;
                            }

                            return true;
                        });
                    });
                }
            }

            componentDidUpdate(prevProps) {
                let propsDidChange = false;

                for (let key in prevProps) {
                    if (prevProps[key] !== this.props[key]) {
                        propsDidChange = true;
                        break;
                    }
                }

                if (propsDidChange) {
                    let mergedProps = Object.assign({}, this.stateCopy, this.props);

                    this.stateCopy = { ...mergedProps };
                    this.setState(mergedProps);
                }
            }

            componentWillUnmount() {
                if (this.stateUnsubscribe) {
                    this.stateUnsubscribe();
                }
            }

            render() {
                return React.createElement(Component, this.state);
            }
        }

        ConnectedComponent.contextType = ReactReduxContext;

        return ConnectedComponent;
    };
}

function defaultMergeProps(stateProps = {}, ownProps = {}) {
    const mergedProps = {
        ...ownProps
    };

    Object.keys(stateProps).forEach(key => {
        if (mergedProps.hasOwnProperty(key)) {
            throw `@steal-like-a-dev/react-redux: ${key} is already present on ${Component.name} props. Possible bug!`;
        }

        mergedProps[key] = stateProps[key];
    });

    return mergedProps;
}

class Provider extends React.Component {
    render() {
        return React.createElement(
            ReactReduxContext.Provider,
            {
                value: this.props.store
            },
            this.props.children
        );
    }
}

module.exports = {
    createStore,
    combineReducers,
    applyMiddleware,
    connect,
    Provider
};
