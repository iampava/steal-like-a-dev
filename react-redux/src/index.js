const React = require('react');

function createStore(reducer, preloadedState) {
    let state = reducer(Object.assign({}, preloadedState), { type: undefined });

    let listeners = [];

    return {
        getState() {
            return state;
        },

        dispatch(action) {
            state = reducer(state, action);
            listeners.forEach(cb => cb(state));
        },

        subscribe(cb) {
            listeners.push(cb);
            cb(state);

            return () => {
                listeners.splice(listeners.indexOf(cb), 1);
            };
        }
    };
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

                this.state = {
                    mergedProps: mergeProps(
                        Object.assign(stateProps, {
                            dispatch: this.context.dispatch
                        }),
                        this.props
                    )
                };

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
                            if (newProps[key] !== this.state.mergedProps[key]) {
                                this.setState({ mergedProps: newProps });

                                return false;
                            }

                            return true;
                        });
                    });
                }
            }

            componentWillUnmount() {
                if (this.stateUnsubscribe) {
                    this.stateUnsubscribe();
                }
            }

            render() {
                return <Component {...this.state.mergedProps} />;
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
    connect,
    Provider
};
