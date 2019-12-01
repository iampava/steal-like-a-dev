import { WORKSPACE_ACTIONS } from './workspace.actions';

const DEFAULT_WORKSPACE_STATE = {
    color: '#0000ff'
};

function workspaceReducer(state = DEFAULT_WORKSPACE_STATE, { type, payload }) {
    switch (type) {
        case WORKSPACE_ACTIONS.CHANGE_BACKGROUND:
            return {
                color: payload
            };
        default:
            return state;
    }
}

export default workspaceReducer;
