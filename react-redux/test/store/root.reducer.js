// import { combineReducers } from 'redux';
import { combineReducers } from '@steal-like-a-dev/react-redux';

import users from './users/users.reducer';
import workspace from './workspace/workspace.reducer';

const rootReducer = combineReducers({
    users,
    workspace
});

export default rootReducer;
