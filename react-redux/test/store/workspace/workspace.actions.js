const CHANGE_BACKGROUND = '[Workspace] Change background';

export const WORKSPACE_ACTIONS = {
    CHANGE_BACKGROUND
};

export const changeBackground = color => ({
    type: CHANGE_BACKGROUND,
    payload: color
});
