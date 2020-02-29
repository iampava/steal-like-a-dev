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
        const { sandwiches, dispatch, apologizes } = this.props
        return (
            <>
                <form onSubmit={this.makeSandwich}>
                    <input type="text" name="forPerson" required placeholder="For person..." />
                    <button type="submit"> Make sandwich </button>
                </form>
                <hr />
                <p> Sandwitches: </p>
                {sandwiches.map(sandwich => (
                    <p key={sandwich}>{sandwich}</p>
                ))}
                <hr />
                <button type="button" onClick={() => dispatch(makeSandwichesForEverybody())}>
                    Make sanviches for everybody{' '}
                </button>
                <hr />
                {apologizes.length ? <>
                    <h3> Apologizes </h3>
                    {apologizes.map(apologize => <p style={{ color: 'red' }}>{apologize}</p>)}
                </> : null}
            </>
        );
    }
}

export default connect(state => ({
    sandwiches: state.sandwiches.list,
    apologizes: state.apologizes
}))(SandwichShop);
