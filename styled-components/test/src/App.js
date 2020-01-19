import React from "react";
import logo from "./logo.svg";
// import styled, { css } from "styled-components";
import styled, { css } from "./stolen-styled-components";
import "./App.css";

const StyledImage = styled.img`
  /* This renders the buttons above... Edit me! */
  display: inline-block;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 11rem;
  background: transparent;
  color: white;
  ${props =>
    props.primary
      ? css`
          border: ${props => (props.primary && Date.now() % 2 ? "1px" : "15px")}
            solid ${props => (props.primary ? "blue" : "red")} !important;
        `
      : `border: 2px solid red`};
`;

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <StyledImage
          as="picture"
          onClick={() => console.log('click')}
          className={`bob-class ${true ? "bobi-also" : "not"}`}
        >
          <img src={logo} />
        </StyledImage>
        <StyledImage
          primary
          src={logo}
          className={`bob-class ${true ? "bobi-also" : "not"}`}
        />
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
