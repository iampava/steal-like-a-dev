// ✅ styled.whatever``
// styled(constructor)``
//✅  as="" // dynamically change
// ✅❌ - comsi-comsa Note how the inputColor prop is not passed to the DOM, but type and defaultValue are. That is styled-components being smart enough to filter non-standard attributes automatically for you.

import React from "react";
import SHA256 from "crypto-js/sha256";

let currentComponentProps = {};

function styled() {}

let handler = {
  get: function(obj, prop) {
    return function(strings, ...rest) {
      return props => {
        currentComponentProps = props;

        let tagToRender = props.as || prop;
        let cssString = computeFinalCSS(strings, rest, props);
        let styledClassName = getHash(cssString);

        addStyle(styledClassName, cssString);

        currentComponentProps = {};

        return React.createElement(tagToRender, {
          ...sanitizeProps(props, tagToRender),
          className: props.className
            ? `${props.className} ${styledClassName}`
            : styledClassName
        });
      };
    };
  }
};

function computeFinalCSS(strings, rest, props) {
  let result = "";

  strings.forEach((string, index) => {
    result += string;

    if (rest.length <= index) {
      return;
    }

    if (typeof rest[index] === "function") {
      result += rest[index](props);
    } else {
      result += rest[index];
    }
  });

  return result;
}

function addStyle(className, css) {
  if (document.head.querySelector(`style[data-class="${className}"]`)) {
    console.info(`ℹ Already inserted style for this className: ${className}`);
    return;
  }

  let styleElement = document.createElement("style");
  styleElement.setAttribute("data-class", className);
  styleElement.innerHTML = `.${className} { ${css} }`;

  document.head.appendChild(styleElement);
}

function getHash(content) {
  if (Array.isArray(content)) {
    content = content.join("__");
  }

  return `styled__${SHA256(content)
    .toString()
    .substr(0, 8)}`;
}

function sanitizeProps(props, tagToRender) {
  if (typeof tagToRender === "string") {
    let newProps = Object.assign({}, props);
    delete newProps.as;

    return newProps;
  }

  return props;
}

export default new Proxy(styled, handler);
export const css = (strings, ...rest) =>
  computeFinalCSS(strings, rest, currentComponentProps);
