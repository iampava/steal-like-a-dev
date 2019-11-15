import React from 'react';
import { render } from 'react-dom';

import { Switch, Route, Link, Redirect } from '../src/index';

function Root() {
    return (
        <React.Fragment>
            <p>
                <Link to="/team/22">Go to team 22</Link>
            </p>
            <p>
                <Link to="/user/Bob">Go to user Bob</Link>
            </p>
            <p>
                <Link to="/not-found">Go to not-found</Link>
            </p>
            <h1> Hello world! </h1>

            <div style={{ border: '5px dashed #2196f3', padding: '.5em', fontSize: '2em' }}>
                <Switch>
                    <Route exact path="/team/:teamId" component={Team} />
                    <Route exact path="/user/:userId" component={User} />
                    <Route component={NotFound} />
                </Switch>
            </div>
        </React.Fragment>
    );
}

function Home() {
    return <p>Home </p>;
}

function Team(props) {
    return (
        <React.Fragment>
            <p> Team: {props.match.params.teamId} </p>
            <Redirect to="/404" />
        </React.Fragment>
    );
}

function User(props) {
    return <p> User page: {props.match.params.userId} </p>;
}

function NotFound() {
    return <p> Not found!</p>;
}

render(<Root />, document.getElementById('app'));
