# styled-components | steal-like-a-dev

Minimalist implementation of [styled-components](https://github.com/styled-components). Primarily for teaching purposes in my [StealLikeADev.com](https://StealLikeADev.com), BUT since it's pretty useful (if you don't need all the original features), I decided to publish it as a [NPM package](https://www.npmjs.com/package/@steal-like-a-dev/styled-components) as well.

These docs are "stolen" from styled-components, but I've left only the parts I've actually implemented. Happy stealing!

## Installation & usage

`$ npm install @steal-like-a-dev/styled-components`

```javascript
import styled, { css, keyframes } from '@steal-like-a-dev/styled-components';
```

## API/Features

### Basic styling using tagged template literals

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import styled from '@steal-like-a-dev/styled-components';

const Title = styled.h1`
    font-size: 1.5em;
    text-align: center;
    color: palevioletred;
`;

const Wrapper = styled.section`
    padding: 4em;
    background: papayawhip;
`;

let reactRoot = document.createElement('div');
document.body.appendChild(reactRoot);

ReactDOM.render(
    <Wrapper>
        <Title>Hello World!</Title>
    </Wrapper>,
    reactRoot
);
```

**📝 Note**: The CSS rules **are not** automatically vender-prefixed like in the case of the original library. However, they are lazily loaded into the `<head>` -> meaning only when you're actually using a certain component.

### Adapting based on props

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import styled, { css } from '@steal-like-a-dev/styled-components';

const Link = styled.a`
    display: inline-block;
    border-radius: 3px;
    padding: 0.5rem 0;
    margin: 0.5rem 1rem;
    width: 11rem;
    background: transparent;
    color: white;
    background: black;
    border: 2px solid white;

    ${props =>
        props.primary &&
        css`
            background: white;
            color: palevioletred;
        `}
`;

let reactRoot = document.createElement('div');
document.body.appendChild(reactRoot);

ReactDOM.render(
    <div>
        {/* Primary link  */}
        <Link href="https://github.com/iampava/steal-like-a-dev/tree/master/styled-components" primary>
            "Stolen" github repo
        </Link>

        {/*  Normal link  */}
        <Link href="https://github.com/styled-components/styled-components">Original github repo</Link>
    </div>,
    reactRoot
);
```

### Extending styles

To easily make a new component that inherits the styling of another, just wrap it in the `styled()` constructor. Below we style the image tag and then extend those styles to create the `ProfileImg` component:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import styled from '@steal-like-a-dev/styled-components';

const Image = styled.img`
    border: 1px solid #000;
    max-width: 100vw;
    max-height: 100vh;
`;

const ProfileImage = styled(Image)`
    border-radius: 50%;
    width: 10em;
    height: 10em;
`;

let reactRoot = document.createElement('div');
document.body.appendChild(reactRoot);

ReactDOM.render(
    <div>
        <Image alt="Styled-components logo" src="https://styled-components.com/logo.png" />
        <ProfileImage alt="Own logo" src="https://iampava.com/dist/assets/images/pava.png" />
    </div>,
    reactRoot
);
```

### Styling any component

The styled method works perfectly on all of your own or any third-party component, as long as they attach the passed className prop to a DOM element.

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import styled from '@steal-like-a-dev/styled-components';

const Link = ({ className, children }) => <a className={className}>{children}</a>;

const StyledLink = styled(Link)`
    color: palevioletred;
    font-weight: bold;
`;

let reactRoot = document.createElement('div');
document.body.appendChild(reactRoot);

ReactDOM.render(
    <div>
        <Link>Unstyled, boring Link</Link>
        <br />
        <StyledLink>Styled, exciting Link</StyledLink>
    </div>,
    reactRoot
);
```

### ~~Pseudoelements, pseudoselectors, and nesting~~

Didn't "steal" those features so no nesting or pseudoselector/pseudoelements.

### Animations

CSS animations with @keyframes aren't scoped to a single component but you still don't want them to be global to avoid name collisions. This is why we export a keyframes helper which will generate a unique instance that you can use throughout your app:


```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import styled, { keyframes } from '@steal-like-a-dev/styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Rotate = styled.div`
    display: inline-block;
    animation: ${rotate} 2s linear infinite;
    padding: 2rem 1rem;
    font-size: 1.2rem;
`;

let reactRoot = document.createElement('div');
document.body.appendChild(reactRoot);

ReactDOM.render(<Rotate>&lt; 💅 &gt;</Rotate>, reactRoot);
```

**👍 Keyframes are lazily injected when they're used.**


## Test project

As you can see, there's also a test project included in this repo. You can run it with

`npm run test:dev` 

  or 

`npm run test:prod`


## Further development & bugfixing

I won't be developing this library any futher because, well... there's already the original out there. But I'll be fixing bugs regarding features already implemented.

<hr/>

<p align="center"> Made for learning/teaching purposes by <a href="https://iampava.com"> Pava </a> in the <a href="https://StealLikeADev.com"> StealLikeADev </a> tutorial series.