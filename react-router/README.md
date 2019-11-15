# react-router | steal-like-a-dev

Minimalist implementation (4KB) of [react-router](https://github.com/ReactTraining/react-router). Primarily for teaching purposes in my [StealLikeADev.com](https://StealLikeADev.com]) tutorial series, BUT since it's actually very usable, I decided to also publish it as a package.


## [~~`<BrowserRouter>`~~](https://reacttraining.com/react-router/web/api/BrowserRouter)

Only works in the browser so no need for this component.

## [`<Route>`](https://reacttraining.com/react-router/web/api/Route)

### component

A React component to render only when the location matches. It will be rendered with route props.

### path: string | string[]

Any valid URL path or array of paths.

! Routes without a path always match.

### exact: boolean

When true, will only match if the path matches the location.pathname exactly.

## [`<Link>`](https://reacttraining.com/react-router/web/api/Link)

### to: string

A string representation of the Link location, created by concatenating the location’s pathname, search, and hash properties.

### to: object

An object that can have any of the following properties:

* **pathname**: A string representing the path to link to.
* **search**: A string representation of query parameters.
* **hash**: A hash to put in the URL, e.g. #a-hash.
* **state**: State to persist to the location

### to: function 

A function to which current location is passed as an argument and which should return location representation as a string or as an object


### replace: boolean

When true, clicking the link will replace the current entry in the history stack instead of adding a new one.


## [`<Redirect>`](https://reacttraining.com/react-router/web/api/Redirect)

### to: string

The URL to redirect to

### to: object

* **pathname**: A string representing the path to redirect to to.
* **search**: A string representation of query parameters.
* **hash**: A hash to put in the URL, e.g. #a-hash.
* **state**: State to persist to the location


### push: bool

When true, redirecting will push a new entry onto the history instead of replacing the current one.

### from: string

Only redirect when on this current pathname. 

### exact: bool

This can only be used in conjunction with from to exactly match a location from which to redirect.

## [`<Switch>`](https://reacttraining.com/react-router/web/api/Switch)

Renders the first `<Route>` or `<Redirect>` that matches the location.

<hr/>

<p align="center"> Made for learning/teaching purposes by <a href="https://iampava.com"> Pava </a>. Actually used in <a href="https://devdrive.io"> DevDrive </a></p>