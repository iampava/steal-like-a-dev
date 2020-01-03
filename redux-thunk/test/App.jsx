import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import SandwichShop from './src/SandwichShop';

import state from './store/store';

render(<Root />, document.getElementById('app'));

function Root() {
    return (
        <Provider store={state}>
            <SandwichShop />
        </Provider>
    );
}
