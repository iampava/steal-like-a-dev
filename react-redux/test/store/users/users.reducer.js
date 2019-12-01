import { USER_ACTIONS } from './users.actions';

const DEFAULT_USERS_STATE = undefined;

function usersReducer(state = DEFAULT_USERS_STATE, { type, payload }) {
    switch (type) {
        case USER_ACTIONS.LOADED_USERS:
            return payload;
        case USER_ACTIONS.ADDED_USER:
            return [...state, payload];
        case USER_ACTIONS.DELETED_USER: {
            let newState = [...state];
            newState.splice(newState.findIndex(user => user.id === payload), 1);

            return newState;
        }
        default:
            return state;
    }
}

export default usersReducer;