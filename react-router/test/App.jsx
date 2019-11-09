import React from 'react';
import { render } from 'react-dom';

import { Route, Link } from '../index';

function Root() {
    return (
        <React.Fragment>
            <Link to="/team/22">Go to team 22</Link>
            <br />
            <Link to="/">Go to root</Link>
            <h1> Hello world! </h1>
            <Route path="/team/:teamId" component={teamId} />
        </React.Fragment>
    );
}

function teamId(props) {
    return (
        <div>
            <p> {props.match.params.teamId} </p>
            <p> {props.match.params.adminId} </p>
        </div>
    );
}

render(<Root />, document.getElementById('app'));
