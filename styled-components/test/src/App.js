import React from 'react';

// import styled, { keyframes } from "styled-components";
import styled, { keyframes } from '@steal-like-a-dev/styled-components';

const StyledApp = styled(App)`
    height: 100vh;
`;

const AppHeader = styled.header`
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    background: palevioletred;
    padding: 0 1em;
    height: 50px;
`;

const WhiteLink = styled.a`
    color: #fff;
    text-decoration: none;
    font-family: inherit;
    font-size: 1.4em;
    border-bottom: 1px solid #fff;
`;

const Main = styled.main`
    padding: 0 0 0 1em;
    min-height: calc(100vh - 100px);
`;

/** Adapting based on props & Extending Styles */
const Button = styled.button`
    /* Adapt the colors based on primary prop */
    background: ${props => (props.primary ? 'palevioletred' : 'white')};
    color: ${props => (props.primary ? 'white' : 'palevioletred')};

    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border: 2px solid palevioletred;
    border-radius: 3px;
`;

const TomatoButton = styled(Button)`
    color: tomato;
    border-color: tomato;

    color: ${props => (props.primary ? 'white' : 'palevioletred')};
`;

/** Styling any component */
const Link = ({ className, children }) => <a className={className}>{children}</a>;

const StyledLink = styled(Link)`
    color: palevioletred;
    font-weight: bold;
`;

/** Animations */
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

const AppFooter = styled.footer`
    text-align: center;
    padding: 0.5em 1em;
    background: palevioletred;
    height: 50px;
`;

/** App component */
function App({className}) {
    return (
        <div className={`App ${className}`}>
            <AppHeader>
                <img height="60" src="https://styled-components.com/nav-logo.png" alt="logo" />
                <WhiteLink href="https://github.com/iampava/steal-like-a-dev">GitHub</WhiteLink>
            </AppHeader>
            <Main>
                <section>
                    <h2 style={{marginTop: 0}}> Adapting based on props </h2>
                    <Button>Normal</Button>
                    <Button primary>Primary</Button>
                </section>
                <section>
                    <h2> Extending Styles </h2>
                    <Button>Normal Button</Button>
                    <Button as="a" href="/">
                        Link with Button styles
                    </Button>
                    <TomatoButton as="a" href="/">
                        Link with Tomato Button styles
                    </TomatoButton>
                    <TomatoButton primary as="a" href="/">
                        Link with Tomato Button styles & primary
                    </TomatoButton>
                </section>
                <section>
                    <h2> Styling any component </h2>
                    <Link>Unstyled, boring Link</Link>
                    <br />
                    <StyledLink>Styled, exciting Link</StyledLink>
                </section>
                <section>
                    <h2> Animations </h2>
                    <Rotate>&lt; 💅 &gt;</Rotate>
                </section>
            </Main>
            <AppFooter>
                Made with <span style={{ color: 'red' }}>❤</span> by{' '}
                <WhiteLink href="https://iampava.com"> Pava </WhiteLink>
            </AppFooter>
        </div>
    );
}

export default StyledApp;
