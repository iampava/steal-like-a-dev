function thunkMiddleware({ dispatch, getState }) {
  return function(next) {
    return function(action) {
      if (typeof action === "function") {
        return action(dispatch, getState, thunkMiddleware._extraArgument);
      } else {
        return next(action);
      }
    };
  };
}

thunkMiddleware.withExtraArgument = function(extraArgument) {
  this._extraArgument = _extraArgument;

  return thunkMiddleware;
}

export default thunkMiddleware;
