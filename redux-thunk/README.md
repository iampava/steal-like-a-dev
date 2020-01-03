# redux-thunk | steal-like-a-dev

Minimalist implementation of [redux-thunk](https://github.com/reduxjs/redux-thunk). Primarily for teaching purposes in my [StealLikeADev.com](https://StealLikeADev.com) tutorial series, BUT since it's actually very usable, I decided to publish it as a [package on NPM](https://www.npmjs.com/package/@steal-like-a-dev/redux-thunk) as well.

These docs are "stolen" from the original library, but I kept only the parts I've implemented, which in this case is pretty much anything. Happy stealing!

## Installation & usage

```
$ npm install @steal-like-a-dev/redux-thunk
```

```javascript
import { createStore, applyMiddleware } from "redux";
import thunk from "@steal-like-a-dev/redux-thunk";
import rootReducer from "./reducers/index";

const INCREMENT_COUNTER = "INCREMENT_COUNTER";

let store = createStore(rootReducer, applyMiddleware(thunk));
store.dispatch(incrementAsync());

function increment() {
  return {
    type: INCREMENT_COUNTER
  };
}

function incrementAsync() {
  return dispatch => {
    setTimeout(() => {
      // Yay! Can invoke sync or async actions with `dispatch`
      dispatch(increment());
    }, 1000);
  };
}
```

## API

### Composition

Any return value from the inner function will be available as the return value of dispatch itself. This is convenient for orchestrating an asynchronous control flow with thunk action creators dispatching each other and returning Promises to wait for each other’s completion:

For more details on Composition check the [official docs](https://github.com/reduxjs/redux-thunk#composition).

### Injecting a Custom Argument

Redux Thunk supports injecting a custom argument using the `withExtraArgument` function:

```javascript
const store = createStore(
  reducer,
  applyMiddleware(thunk.withExtraArgument(api))
);

// later
function fetchUser(id) {
  return (dispatch, getState, api) => {
    // you can use api here
  };
}
```

## Test project

As you can see, there's also a test project included in this repo. You can run it with

`npm run test:dev`

or

`npm run test:prod`

<hr/>

<p align="center"> Made for learning/teaching purposes by <a href="https://iampava.com">Pava</a></p>
