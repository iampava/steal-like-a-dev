const LOADED_USERS = '[Users] Loaded';
const ADDED_USER = '[Users] Added';
const DELETED_USER = '[Users] Deleted';

export const USER_ACTIONS = {
    LOADED_USERS,
    ADDED_USER,
    DELETED_USER
};

export const loadedUsers = users => ({
    type: LOADED_USERS,
    payload: users
});

export const addedUser = user => ({
    type: ADDED_USER,
    payload: user
});

export const deleteUser = userId => ({
    type: DELETED_USER,
    payload: userId
});
