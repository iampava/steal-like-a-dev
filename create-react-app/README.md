# create-react-app | steal-like-a-dev

<p align="center">
  <a href="https://facebook.github.io/create-react-app/">
    <img src="https://raw.githubusercontent.com/iampava/steal-like-a-dev/master/_assets/create-react-app.png" />
  </a>
</p>

Minimalist implementation of [create-react-app](https://facebook.github.io/create-react-app). Primarily for teaching purposes in my [StealLikeADev.com](https://StealLikeADev.com) tutorial series, BUT since it's actually very usable, I decided to publish it as a [NPM package](https://www.npmjs.com/package/@steal-like-a-dev/create-react-app) as well. 

These docs are "stolen" from create-react-app, but I've left only the parts I've actually implemented. Happy stealing!

## Installation & usage

Install the package globally so that it is available from everywhere in your device:

`$ npm install -g @steal-like-a-dev/create-react-app`

and then run the following command to create a new app called **my-app** in the current folder.

```
stolen-create-react-app my-app
cd my-app
npm start
```

Then open [http://localhost:8080/](http://localhost:8080/) to see your app.
When you’re ready to deploy to production, create a minified bundle with `npm run build`.


## What's included

Your environment will have everything you need to build a modern single-page React app:

* React, JSX, & ES6
* Language extras beyond ES6 like the object spread operator.
* Autoprefixed CSS, so you don’t need -webkit- or other prefixes.
* ~~A fast interactive unit test runner with built-in support for coverage reporting.~~
* A live development server that warns about common mistakes.
* A build script to bundle JS, CSS, and images for production, with hashes and sourcemaps.
* An offline-first service worker and a web app manifest, meeting all the Progressive Web App criteria. (Note: Using the service worker is opt-in).
<hr/>

<p align="center"> Made with ❤ by <a href="https://iampava.com"> Pava </a></p>