# react-redux | steal-like-a-dev

Minimalist implementation of [react-redux](https://github.com/reduxjs/react-redux) and [redux](https://github.com/reduxjs/redux). This is an all-in-one package, containining functionalities from both libraries so that it's easily compatible with React apps.

Primarily for teaching purposes in my [StealLikeADev.com](https://StealLikeADev.com) tutorial series, BUT since it's actually very usable, I decided to publish it as a package as well.

These docs are "stolen" from the original libraries, but I've left only the parts I've actually implemented. Happy stealing!


## Installation & usage

```
$ npm install @steal-like-a-dev/react-redux
```

```javascript
import { 
    createStore,
    combineReducers,
    applyMiddleware,
    connect,
    Provider
 } from '@steal-like-a-dev/react-redux';
```

## API


### [createStore(reducer, [preloadedState], ~~[enhancer]~~)](https://redux.js.org/api/createstore)

Creates a Redux store that holds the complete state tree of your app. There should only be a single store in your app.

**Arguments**

1. `reducer` (Function): A [reducing function](https://redux.js.org/glossary#reducer) that returns the next [state tree](https://redux.js.org/glossary#state), given the current state tree and an action to handle.

2. [`preloadedState`] (any): The initial state. You may optionally specify it to hydrate the state from the server in universal apps, or to restore a previously serialized user session. If you produced `reducer` with [`combineReducers`](https://redux.js.org/api/combinereducers), this must be a plain object with the same shape as the keys passed to it. Otherwise, you are free to pass anything that your `reducer` can understand.

3. [`enhancer`] (Function): The store enhancer. You may optionally specify it to enhance the store with third-party capabilities such as middleware, time travel, persistence, etc. The only store enhancer that ships with Redux is [`applyMiddleware()`](https://redux.js.org/api/applymiddleware/).

**Returns**

([`Store`](https://redux.js.org/api/store)): An object that holds the complete state of your app. The only way to change its state is by [dispatching actions](https://redux.js.org/api/store#dispatchaction). You may also [subscribe](https://redux.js.org/api/store#subscribelistener) to the changes to its state to update the UI.

**Example**

```javascript
import { createStore } from '@steal-like-a-dev/react-redux'

function todos(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return state.concat([action.text])
    default:
      return state
  }
}
const store = createStore(todos, ['Use Redux'])
store.dispatch({
  type: 'ADD_TODO',
  text: 'Read the docs'
})
console.log(store.getState())
// [ 'Use Redux', 'Read the docs' ]
```

### [combineReducers(reducers)](https://redux.js.org/api/combinereducers)

The `combineReducers` helper function turns an object whose values are different reducing functions into a single reducing function you can pass to [createStore](https://redux.js.org/api/createstore/).

The resulting reducer calls every child reducer, and gathers their results into a single state object. **The state produced by `combineReducers()` namespaces the states of each reducer under their keys as passed to `combineReducers()`**

**Example**

```javascript
rootReducer = combineReducers({potato: potatoReducer, tomato: tomatoReducer})
// This would produce the following state object
{
  potato: {
    // ... potatoes, and other state managed by the potatoReducer ...
  },
  tomato: {
    // ... tomatoes, and other state managed by the tomatoReducer, maybe some nice sauce? ...
  }
}
```

**Arguments**

1. `reducers` (Object): An object whose values correspond to different reducing functions that need to be combined into one.

**Returns**

(Function): A reducer that invokes every reducer inside the reducers object, and constructs a state object with the same shape.

### [applyMiddleware(...middleware)](https://redux.js.org/api/applymiddleware/)

Middleware is the suggested way to extend Redux with custom functionality. Middleware lets you wrap the store's dispatch method for fun and profit. The key feature of middleware is that it is composable. Multiple middleware can be combined together, where each middleware requires no knowledge of what comes before or after it in the chain.

**Arguments**

`...middleware` (arguments): Functions that conform to the Redux middleware API. Each middleware receives [Store](https://redux.js.org/api/store/)'s [dispatch](https://redux.js.org/api/store/#dispatchaction) and [getState](https://redux.js.org/api/store/#getState) functions as named arguments, and returns a function. That function will be given the `next` middleware's dispatch method, and is expected to return a function of `action` calling `next(action)` with a potentially different argument, or at a different time, or maybe not calling it at all. The last middleware in the chain will receive the real store's [dispatch](https://redux.js.org/api/store/#dispatchaction) method as the `next` parameter, thus ending the chain. So, the middleware signature is `({ getState, dispatch }) => next => action`.

**Returns**

(Function) A store enhancer function which you need to pass as to `createStore()` as the last `enhancer` argument.


### [connect(mapStateToProps?, ~~mapDispatchToProps?~~, mergeProps?, ~~options?~~)](https://react-redux.js.org/api/connect)

The connect() function connects a React component to a Redux store.

It provides its connected component with the pieces of the data it needs from the store, and the functions it can use to dispatch actions to the store.

It does not modify the component class passed to it; instead, it returns a new, connected component class that wraps the component you passed in.


**Arguments**

1. [`mapStateToProps? ( (state, `~~`ownProps?`~~`) => Object )`](https://react-redux.js.org/api/connect#mapstatetoprops-state-ownprops-object)

    If a `mapStateToProps` function is specified, the new wrapper component will subscribe to Redux store updates. This means that any time the store is updated, `mapStateToProps` will be called. The results of `mapStateToProps` must be a plain object, which will be merged into the wrapped component’s props. If you don't want to subscribe to store updates, pass `null` or `undefined` in place of `mapStateToProps`.

    **Arguments**

    1. state: Object
    2. ~~ownProps?~~: Object: not implemented

    **Returns**

    Your `mapStateToProps` functions are expected to return an object. This object, normally referred to as `stateProps`, will be merged as props to your connected component. If you define mergeProps, it will be supplied as the first parameter to `mergeProps`.

    The return of the `mapStateToProps` determine whether the connected component will re-render (details [here](https://react-redux.js.org/using-react-redux/connect-mapstate#return-values-determine-if-your-component-re-renders)).

    For more details on recommended usage of `mapStateToProps`, please refer to [the original guide on using mapStateToProps](https://react-redux.js.org/using-react-redux/connect-mapstate).

2. ~~[`mapDispatchToProps?: Object | (dispatch, ownProps?) => Object`](https://react-redux.js.org/api/connect#mapdispatchtoprops-object-dispatch-ownprops-object)~~ : Not implemented

3. [`mergeProps?: (stateProps, `~~`dispatchProps`~~`, ownProps) => Object`](https://react-redux.js.org/api/connect#mergeprops-stateprops-dispatchprops-ownprops-object)

    If specified, defines how the final props for your own wrapped component are determined. If you do not provide `mergeProps`, your wrapped component receives `{ ...ownProps, ...stateProps, `~~`...dispatchProps`~~` }` by default.

    **Arguments**

    `mergeProps` should be specified with maximum of two parameters. They are the result of `mapStateToProps()` and the wrapper component's props.

    
    1. stateProps
    2. ~~dispatchProps~~: not implemented
    3. ownProps

    The fields in the plain object you return from it will be used as the props for the wrapped component. You may specify this function to select a slice of the state based on props, or to bind action creators to a particular variable from props.

    **Returns**

    The return value of `mergeProps` is referred to as `mergedProps` and the fields will be used as the props for the wrapped component.

4. ~~[`options?: Object`](https://react-redux.js.org/api/connect#options-object)~~: Not implemented

**Returns**

The [return of `connect()`](https://react-redux.js.org/api/connect#connect-returns) is a wrapper function that takes your component and returns a wrapper component with the additional props it injects.

### [Provider](https://react-redux.js.org/api/provider)

The `<Provider />` makes the Redux `store` available to any nested components that have been wrapped in the `connect()` function.

Since any React component in a React Redux app can be connected, most applications will render a `<Provider>` at the top level, with the entire app’s component tree inside of it.

Normally, you can’t use a connected component unless it is nested inside of a `<Provider>`.

**Props**

1. `store` ([Redux Store](https://redux.js.org/api/store)) The single Redux store in your application.

2. children (ReactElement) The root of your component hierarchy.
3. ~~context~~: not implemented


```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from '@steal-like-a-dev/react-redux'

import { App } from './App'
import createStore from './createReduxStore'

const store = createStore()

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

```

## Test project

As you can see, there's also a test project included in this repo. You can run it with

`npm run test:dev` 

  or 

`npm run test:prod`

<hr/>

<p align="center"> Made for learning/teaching purposes by <a href="https://iampava.com"> Pava </a>. Actually used in <a href="https://devdrive.io"> DevDrive </a></p>