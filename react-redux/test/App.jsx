import React from 'react';
import { render } from 'react-dom';
// import { connect, Provider } from 'react-redux';
import { connect, Provider } from '@steal-like-a-dev/react-redux';

import state from './store/store';
import { deleteUser, addedUser } from './store/users/users.actions';
import { changeBackground } from './store/workspace/workspace.actions';

let ConnectedHeader = connect(headerMapStateToProps)(Header);
let ConnectedBody = connect(bodyMapStateToProps)(Body);

render(<Root />, document.getElementById('app'));

/*********************************************************8 */
function Root() {
    return (
        <Provider store={state}>
            <ConnectedHeader title={'React Redux'} />
            <ConnectedBody />
        </Provider>
    );
}

function Header(props) {
    return (
        <header>
            <h1> {props.title}</h1>
            {!props.users && <h2>Loading users </h2>}
            {props.users &&
                props.users.map(user => {
                    return (
                        <p key={user.id}>
                            <strong>{user.id}: </strong> <span>{user.name}</span>{' '}
                            <button type="button" onClick={() => props.dispatch(deleteUser(user.id))}>
                                ❌
                            </button>
                        </p>
                    );
                })}
        </header>
    );
}

function headerMapStateToProps(state) {
    return {
        users: state.users
    };
}

function Body(props) {
    function addUser(e) {
        e.preventDefault();
        let dispatchResult = props.dispatch(
            addedUser({
                id: Math.floor(Math.random() * 10000),
                name: e.target.name.value
            })
        );
        console.log(dispatchResult);

        e.target.reset();
    }

    function onColorChange(e) {
        props.dispatch(changeBackground(e.target.value));
    }

    return (
        <>
            <form onSubmit={addUser} style={{ color: props.color }}>
                <label>
                    <p> Add user:</p>
                    <input required type="text" name="name" placeholder="name"></input>
                </label>
                <button type="submit"> Add </button>
            </form>
            <button
                type="button"
                onClick={() =>
                    props.dispatch(getAsyncUser()).then(() => {
                        console.log('DONE async');
                    })
                }
            >
                Add async user
            </button>
            <br /> <br /> <br /> <br />
            <input value={props.color} type="color" onChange={e => onColorChange(e)} />
        </>
    );
}

function getAsyncUser() {
    return function(dispatch) {
        console.log('thunk: Starting to generate user');

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                dispatch(
                    addedUser({
                        id: Math.floor(Math.random() * 10000),
                        name: 'Random user'
                    })
                );
                console.log('thunk: Finished & dispatched user');

                resolve();
            }, 1000);
        });
    };
}

function bodyMapStateToProps(state) {
    return {
        color: state.workspace.color
    };
}
