import { connect } from 'react-redux';
import React from 'react';
import { makeASandwichWithSecretSauce, makeSandwichesForEverybody } from '../store/reducers';

class SandwichShop extends React.Component {
    constructor() {
        super();

        this.makeSandwich = this.makeSandwich.bind(this);
    }

    makeSandwich(e) {
        e.preventDefault();

        let form = e.target;
        if (!form.checkValidity()) {
            return;
        }

        this.props.dispatch(makeASandwichWithSecretSauce(form.forPerson.value)).then(() => {
            form.reset();
        });
    }

    render() {
        return (
            <>
                <form onSubmit={this.makeSandwich}>
                    <input type="text" name="forPerson" required placeholder="For person..." />
                    <button type="submit"> Make sandwich </button>
                </form>
                <hr />
                <p> Sandwitches: </p>
                {this.props.sandwiches.map(sandwich => (
                    <p key={sandwich}>{sandwich}</p>
                ))}
                <hr />
                <button type="button" onClick={() => this.props.dispatch(makeSandwichesForEverybody())}>
                    Make sanviches for everybody{' '}
                </button>
            </>
        );
    }
}

export default connect(state => ({
    sandwiches: state.sandwiches.list
}))(SandwichShop);
