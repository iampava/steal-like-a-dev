import thunk from 'redux-thunk';
import reduxLogger from 'redux-logger';

import { createStore, applyMiddleware } from '@steal-like-a-dev/react-redux';
import rootReducer from './root.reducer';

const preloadedState = {
    users: [
        {
            id: Math.floor(Math.random() * 10000),
            name: 'Bob'
        }
    ]
};

const store = createStore(rootReducer, preloadedState, applyMiddleware(thunk, reduxLogger));
const dispatch = store.dispatch;

export { dispatch, store as default };

/*************************** */
function customLoggerMiddleware({ getState }) {
    return next => action => {
        console.log('will dispatch', action);
        // Call the next dispatch method in the middleware chain.

        const returnValue = next(action);

        console.log('state after dispatch', getState());
        // This will likely be the action itself, unless
        // a middleware further in chain changed it.
        return returnValue;
    };
}
