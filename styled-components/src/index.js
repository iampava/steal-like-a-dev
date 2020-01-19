import React from 'react';
import SHA256 from 'crypto-js/sha256';

let currentComponentProps = {};
let insertedStyles = [];

let styleEl = createStyleEl();
document.head.appendChild(styleEl);

let proxyHandler = {
    get(obj, prop) {
        return taggedTemplateFunctionFactory(prop);
    }
};

export default new Proxy(styled, proxyHandler);
export const css = (strings, ...rest) => computeFinalCSS(strings, rest, currentComponentProps);
export const keyframes = ([cssString]) => {
    const animationName = getHash(cssString, 'animation');
    let keyframeObject = {
        [Symbol.toPrimitive]() {
            appendStyle(animationName, `@keyframes ${animationName} { ${cssString} }`);
            return animationName;
        }
    };

    return keyframeObject;
};

/** Functions */
function styled(ReactComponent) {
    return taggedTemplateFunctionFactory(ReactComponent);
}

function taggedTemplateFunctionFactory(tagNameOrReactComponent) {
    return (strings, ...rest) => {
        return props => {
            currentComponentProps = props;

            let tagToRender =
                typeof tagNameOrReactComponent === 'function'
                    ? tagNameOrReactComponent
                    : props.as || tagNameOrReactComponent;
            let cssString = computeFinalCSS(strings, rest, props);
            let styledClassName = getHash(cssString);

            appendStyle(styledClassName, `.${styledClassName} { ${cssString} }`);

            currentComponentProps = {};

            return React.createElement(tagToRender, {
                ...sanitizeProps(props, tagToRender),
                className: props.className ? `${props.className} ${styledClassName}` : styledClassName
            });
        };
    };
}

function computeFinalCSS(strings, rest, props) {
    let result = '';

    strings.forEach((string, index) => {
        result += string;

        if (rest.length <= index) {
            return;
        }

        if (typeof rest[index] === 'function') {
            result += rest[index](props);
        } else {
            result += rest[index];
        }
    });

    return result;
}

function appendStyle(styleId, css) {
    if (insertedStyles.includes(styleId)) {
        console.info(`ℹ Already inserted style for this id: ${styleId}`);
        return;
    }

    insertedStyles.push(styleId);
    styleEl.innerHTML += css;
}

function createStyleEl() {
    const styleEl = document.createElement('style');
    styleEl.setAttribute('data-styled-components', true);
    styleEl.setAttribute('type', 'text/css');

    return styleEl;
}

function getHash(content, pre = 'styled') {
    return `${pre}__${SHA256(content)
        .toString()
        .substr(0, 8)}`;
}

function sanitizeProps(props, tagToRender) {
    if (typeof tagToRender === 'string') {
        let newProps = Object.assign({}, props);
        delete newProps.as;

        return newProps;
    }

    return props;
}
