# react-router | steal-like-a-dev

Minimalist implementation of [react-router](https://github.com/ReactTraining/react-router). Primarily for teaching purposes in my [StealLikeADev.com](https://StealLikeADev.com) tutorial series, BUT since it's actually very usable, I decided to publish it as a [NPM package](https://www.npmjs.com/package/@steal-like-a-dev/react-router) as well.

These docs are "stolen" from react-router, but I've left only the parts I've actually implemented. Happy stealing!


## Installation & usage

`$ npm install @steal-like-a-dev/react-router`

```javascript
import { Route, Link, Redirect, Switch } from '@steal-like-a-dev/react-router';
```

## API

### [~~`<BrowserRouter>`~~](https://reacttraining.com/react-router/web/api/BrowserRouter)

I specifically built just this routing method - using normal URL's instead of hashes - so no need for this component.

### [`<Route>`](https://reacttraining.com/react-router/web/api/Route)

### Props:

* #### component

A React component to render only when the location matches. It will be rendered with route props.

* #### path: string | string[]

Any valid URL path or array of paths.

! Routes without a path always match.

* #### exact: boolean

When true, will only match if the path matches the location.pathname exactly.

### Props passed to rendered component

* #### match: { params: Object }

An object with one single property - **params** - which contains the values of all the matched params in the pathname. For example:

```jsx
<Route path="/groups/:groupId/exercise/:exerciseId" component={TextComp}></Route>

function TextComp (props) {
  return (
    <div>
      <h1> Group: {props.match.groupId} </h1>
      <p> Exercise: {props.match.exerciseId} </p>
    </div>
  )
}
```
will render on this path `/groups/Faculty/exercise/22` an `h1` with text **Faculty** and a `<p>` with text **22**.

* #### location: Object

```javascript
location: {
    state: any,     // Current route state
    search: string, // String representation of query params
    hash: hash,     // Current location's hash
    pathname: hash  // Current pathname
},
```

#### history: { push: Function, replace: Function }

An object with 2 functions used for navigating to a different page.

**path(to: string, state?: any, replace?: boolean)** -> navigate forward to `to` URL, with an optional state that will be passed to the next route.

The **replace** param specifies if this navigation should replace the current one or not. This affects the order of the pages when navigating via the browser buttons (backward - forward). Default: `false`.

**replace(to: string, state?: any)** -> navigate to `to` URL by replacing the current location in the navigation stack.

### [`<Link>`](https://reacttraining.com/react-router/web/api/Link)

### Props:

* #### to: string

A string representation of the Link location, created by concatenating the location’s pathname, search, and hash properties.

* #### to: object

An object that can have any of the following properties:

```javascript
to: {
  pathname: string, // A string representing the path to link to
  search: string,   // A string representation of query parameters
  hash: string,     // A hash to put in the URL, e.g. #a-hash
  sate: any         // State to persist to the location
}
```

* #### to: function 

A function to which current location is passed as an argument and which should return location representation as a string or as an object


* #### replace: boolean

When true, clicking the link will replace the current entry in the history stack instead of adding a new one.


### [`<Redirect>`](https://reacttraining.com/react-router/web/api/Redirect)

* #### to: string

The URL to redirect to

* #### to: object

```javascript
to: {
  pathname: string, // A string representing the path to link to
  search: string,   // A string representation of query parameters
  hash: string,     // A hash to put in the URL, e.g. #a-hash
  sate: any         // State to persist to the location
}
```


* #### push: bool

When true, redirecting will push a new entry onto the history instead of replacing the current one.

* #### from: string

Only redirect when on this current pathname. 

* #### exact: bool

This can only be used in conjunction with from to exactly match a location from which to redirect.

### [`<Switch>`](https://reacttraining.com/react-router/web/api/Switch)

Renders the first `<Route>` or `<Redirect>` that matches the location.

**How is this different than just using a bunch of `<Route>`s?**

`<Switch>` is unique in that it renders a route exclusively. In contrast, every <Route> that matches the location renders inclusively.

## Test project

As you can see, there's also a test project included in this repo. You can run it with

`npm run test:dev` 

  or 

`npm run test:prod`

## Further development & bugfixing

I won't be developing this library any futher because, well... there's already the original out there. But I'll be fixing bugs regarding features already implemented.

<hr/>

<p align="center"> Made for learning/teaching purposes by <a href="https://iampava.com"> Pava </a>. Actually used in <a href="https://devdrive.io"> DevDrive </a></p>