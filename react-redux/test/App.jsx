import React from 'react';
import { render } from 'react-dom';
import { connect, Provider } from '@steal-like-a-dev/react-redux';

import state from './store/store';
import { deleteUser, addedUser } from './store/users/users.actions';
import { changeBackground } from './store/workspace/workspace.actions';

let ConnectedHeader = connect(headerMapStateToProps)(Header);
let ConnectedBody = connect(bodyMapStateToProps)(Body);

function Root() {
    return (
        <Provider store={state}>
            <ConnectedHeader title={'React Redux'} />
            <ConnectedBody />
        </Provider>
    );
}

function Header(props) {
    console.log('header did render');
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
        props.dispatch(
            addedUser({
                id: Math.floor(Math.random() * 10000),
                name: e.target.name.value
            })
        );

        e.target.reset();
    }

    function onColorChange(e) {
        props.dispatch(changeBackground(e.target.value));
    }

    console.log('body did render');

    return (
        <>
            <form onSubmit={addUser} style={{ color: props.color }}>
                <label>
                    <p> Add user:</p>
                    <input required type="text" name="name" placeholder="name"></input>
                </label>
                <button type="submit"> Add </button>
            </form>
            <br /> <br /> <br /> <br />
            <input value={props.color} type="color" onChange={e => onColorChange(e)} />
        </>
    );
}

function bodyMapStateToProps(state) {
    return {
        color: state.workspace.color
    };
}

render(<Root />, document.getElementById('app'));
