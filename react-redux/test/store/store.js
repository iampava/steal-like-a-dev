import thunk from 'redux-thunk';

import { createStore, applyMiddleware } from '../react-redux';
import rootReducer from './root.reducer';

const preloadedState = {
    users: [
        {
            id: Math.floor(Math.random() * 10000),
            name: 'Bob'
        }
    ]
};

const store = createStore(rootReducer, preloadedState, applyMiddleware(loggerMiddleware, thunk));
const dispatch = store.dispatch;

export { dispatch, store as default };

/*************************** */
function loggerMiddleware() {
    return next => action => {
        console.log('will dispatch', action);

        next(action);
    };
}
