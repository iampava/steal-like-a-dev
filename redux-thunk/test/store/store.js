import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
import thunk from '@steal-like-a-dev/redux-thunk';
import rootReducer from './reducers';

const store = createStore(rootReducer, undefined, applyMiddleware(thunk));

export default store;