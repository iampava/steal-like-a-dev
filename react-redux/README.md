# react-redux | steal-like-a-dev

Minimalist implementation of [react-redux](https://github.com/reduxjs/react-redux) and [redux](https://github.com/reduxjs/redux). This is an "all-in-one" package, containining functions from both libraries so that it's compatible with React apps.

Primarily for teaching purposes in my [StealLikeADev.com](https://StealLikeADev.com) tutorial series.

These docs are "stolen" from these 2 libraries, but I've left only the parts I've implemented in this package. Enjoy!


## `⚠ Still in progress` 

## Installation & usage

`$ npm install @steal-like-a-dev/react-redux`

```javascript
import { createStore } from '@steal-like-a-dev/react-redux';
```

## API


### [createStore(reducer, [preloadedState], [enhancer])](https://redux.js.org/api/createstore#createstorereducer-preloadedstate-enhancer)

Creates a Redux store that holds the complete state tree of your app. There should only be a single store in your app.

**Arguments**

1. `reducer` (Function): A reducing function that returns the next state tree, given the current state tree and an action to handle.

2. [`preloadedState`] (any): The initial state. You may optionally specify it to hydrate the state from the server in universal apps, or to restore a previously serialized user session. If you produced `reducer` with [`combineReducers`](https://redux.js.org/api/combinereducers), this must be a plain object with the same shape as the keys passed to it. Otherwise, you are free to pass anything that your `reducer` can understand.

3. [`enhancer`] (Function): The store enhancer. You may optionally specify it to enhance the store with third-party capabilities such as middleware, time travel, persistence, etc. The only store enhancer that ships with Redux is [`applyMiddleware()`](https://redux.js.org/api/applymiddleware).

**Returns**

([`Store`](https://redux.js.org/api/store)): An object that holds the complete state of your app. The only way to change its state is by [dispatching actions](https://redux.js.org/api/store#dispatchaction). You may also [subscribe](https://redux.js.org/api/store#subscribelistener) to the changes to its state to update the UI.