import React from 'react';
import SHA256 from 'crypto-js/sha256';

const insertedClasses = {};
const styleEl = document.createElement('style');
styleEl.setAttribute('data-styled-components', true);
document.head.appendChild(styleEl);

function styled(Component) {
    return tagTemplateFactory(Component)
}

export default new Proxy(styled, {
    get(target, tagName) {
        return tagTemplateFactory(tagName);

    }
});

export const css = (strings, ...rest) => {
    return props => computeCSSProps(props, strings, rest)
}

export const keyframes = (strings, ...rest) => {
    return (props) => {
        let animationCSS = computeCSSProps(props, strings, rest)
        let animationName = `styled-animation__${SHA256(animationCSS).toString().substr(0, 8)}`;

        appendCSS(animationName, `@keyframes ${animationName} { ${animationCSS} }`);

        //  append to head

        return animationName;
    }
}


/**** Functions */

function tagTemplateFactory(tagNameOrComponent) {
    return (strings, ...rest) => {
        return (props) => {
            let cssProps = computeCSSProps(props, strings, rest)
            let cssClassName = `styled__${SHA256(cssProps).toString().substr(0, 8)}`;

            appendCSS(cssClassName, `.${cssClassName} { ${cssProps} }`);

            let sanitizedProps = {
                ...props,
                className: props.className ? `${props.className} ${cssClassName}` : cssClassName
            }

            Object.keys(sanitizedProps).forEach(key => {
                if (typeof sanitizedProps[key] !== 'string') {
                    delete sanitizedProps[key]
                }
            })

            return React.createElement(tagNameOrComponent, sanitizedProps);
        }
    }
}

function computeCSSProps(props, strings, rest) {
    let result = '';

    strings.forEach((s, index) => {
        result += s;
        if (typeof rest[index] === 'function') {
            let fn = rest[index];
            while (typeof fn === 'function') {
                fn = fn(props)
            }
            result += fn;
        } else {
            result += rest[index];
        }
    })

    return result;
}

function appendCSS(id, css) {
    if (insertedClasses[id]) {
        console.info('ℹ Trying to insert a class already inserted.')
        return
    }

    insertedClasses[id] = true
    styleEl.innerHTML += css
}