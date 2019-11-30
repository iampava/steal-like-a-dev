import React from "react";

function createStore(reducer, preloadedState) {
  let state = Object.assign({}, preloadedState);
  let listeners = [];

  return {
    getState() {
      return state;
    },
    
    dispatch(action) {
      state = reducer(state, action);
      listeners.forEach(cb => cb());
    },

    subscribe(cb) {
      listeners.push(cb);

      return () => {
        listeners.splice(listeners.indexOf(cb), 1);
      };
    }
  };
}

function combineReducers(reducers) {
  return function(state, action) {
    let newState = {};

    Object.keys(reducers).forEach(key => {
      newState[key] = reducers[key](state, action);
    });

    return newState;
  };
}

export default {
  connect() {},
  Provider() {},
  createStore,
  combineReducers
};

// export default function(state = DEFAULT_WORKSPACE_STATE, { type, payload }) {
//   switch (type) {
//     case WORKSPACE_ACTIONS.SET_HOME_TAB:
//       let newState = Object.assign({}, state, { tab: payload });
//       localStorage.setItem("workspace", JSON.stringify(newState));

//       return newState;
//     default:
//       return state;
//   }
// }
