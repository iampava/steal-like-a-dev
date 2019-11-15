import React from 'react';
import { render } from 'react-dom';

import { Switch, Route, Link, Redirect } from '@steal-like-a-dev/react-router';

function Root() {
    return (
        <React.Fragment>
            <p>
                <Link to="/team/22">Go to team 22</Link>
            </p>
            <p>
                <Link to="/team/22" replace>
                    <span> Child of link </span>
                    <span> Go to team 22 with REPLACE </span>
                </Link>
            </p>
            <p>
                <Link
                    to={{
                        pathname: '/user/Bob',
                        hash: 'ceva',
                        search: '?order=ASC',
                        state: {
                            value: 123
                        }
                    }}
                >
                    Go to user Bob
                </Link>
            </p>
            <p>
                <Link
                    to={pathname => ({
                        pathname: `${pathname}/another-page/23`
                    })}
                >
                    Go to another page
                </Link>
            </p>
            <p>
                <Link to="/not-found">Go to not-found</Link>
            </p>
            <h1> Hello world! </h1>

            {/* <div style={{ border: '5px dashed #2196f3', padding: '.5em', fontSize: '2em' }}>
                <Switch>
                    <Route  exact path="/team/:teamId" component={Team} />
                    <Route  exact path="/user/:userId" component={User} />
                    <Route component={NotFound} />
                </Switch>
            </div> */}

            <div style={{ border: '5px dashed #2196f3', padding: '.5em', fontSize: '2em' }}>
                <Switch>
                    <Route  exact path={["/team/:teamId", "/another-one/:teamId"]} component={Team} />
                    <Route  exact path="/user/:userId" component={User} />
                    <Route component={NotFound} />
                </Switch>
                <Redirect to="/user/Bob" from="/" exact push />
            </div>

            {/* Only redirects as children! */}
            {/* <div style={{ border: '5px dashed #2196f3', padding: '.5em', fontSize: '2em' }}>
                <Switch>
                    <Route exact path={['/team/:teamId', '/another-one/:teamId']} component={Team} />
                    <Route exact path="/user/:userId" component={User} />
                    <Redirect to="/team/22" from="/team" exact></Redirect>
                    <Redirect to="/user/Bobss" from="/user" exact></Redirect>
                    <Route component={NotFound} />
                </Switch>
            </div> */}
        </React.Fragment>
    );
}

function Team(props) {
    return (
        <React.Fragment>
            <p> Team: {props.match.params.teamId} </p>
        </React.Fragment>
    );
}

function User(props) {
    return (
        <p>
            User page: {props.match.params.userId} <br />
            State: {JSON.stringify(props.location.state)} <br />
            Search: {props.location.search} <br />
            Hash: {props.location.hash}
        </p>
    );
}

function NotFound() {
    return <p> Not found!</p>;
}

render(<Root />, document.getElementById('app'));
