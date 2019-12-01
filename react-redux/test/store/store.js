import { createStore } from '@steal-like-a-dev/react-redux';
import rootReducer from './root.reducer';

const preloadedState = {
    users: [
        {
            id: Math.floor(Math.random() * 10000),
            name: 'Bob'
        }
    ]
};

const store = createStore(rootReducer, preloadedState);
const dispatch = store.dispatch;

export { dispatch, store as default };
