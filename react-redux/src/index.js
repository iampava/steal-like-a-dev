import React from 'react';

export function createStore(reducer, preloadedState) {
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

export function combineReducers(reducers) {
    return function(state, action) {
        let newState = {};

        Object.keys(reducers).forEach(key => {
            newState[key] = reducers[key](state[key], action);
        });

        return newState;
    };
}

const ReduxContext = React.createContext();

export function connect(mapFn) {
    return function(Component) {
        class ConnectedComponent extends React.Component {
            constructor(props, context) {
                super(props, context);

                this.state = {
                    mergedProps: this._mergeProps(mapFn(this.context.getState()))
                };
            }

            componentDidMount() {
                this.stateUnsubscribe = this.context.subscribe(state => {
                    let newProps;
                    try {
                        newProps = this._mergeProps(mapFn(state));
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

            componentWillUnmount() {
                this.stateUnsubscribe();
            }

            _mergeProps(reduxProps) {
                reduxProps.dispatch = this.context.dispatch;
                const mergedProps = Object.assign({}, this.props);

                Object.keys(reduxProps).forEach(key => {
                    if (mergedProps.hasOwnProperty(key)) {
                        throw `@steal-like-a-dev/react-redux: ${key} is already present on ${Component.name} props. Possible bug!`;
                    }
                    mergedProps[key] = reduxProps[key];
                });

                return mergedProps;
            }

            render() {
                return <Component {...this.state.mergedProps} />;
            }
        }

        ConnectedComponent.contextType = ReduxContext;

        return ConnectedComponent;
    };
}

export class Provider extends React.Component {
    render() {
        return <ReduxContext.Provider value={this.props.store}>{this.props.children}</ReduxContext.Provider>;
    }
}
