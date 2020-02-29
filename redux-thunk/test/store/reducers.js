const DEFAULT_STATE = {
    myMoney: 30,
    sandwiches: {
        list: [],
        isShopOpen: true
    },
    apologizes: []
};

function rootReducer(state = DEFAULT_STATE, { type, ...rest }) {
    switch (type) {
        case 'MAKE_SANDWICH':
            return Object.assign({}, state, {
                sandwiches: {
                    list: [...state.sandwiches.list, `🥪 For ${rest.forPerson} with ${rest.secretSauce}`],
                    isShopOpen: state.sandwiches.isShopOpen
                }
            });
        case 'APOLOGIZE': {
            let error = rest.error || 'No 💲💲💲';
            return Object.assign({}, state, {
                apologizes: [...state.apologizes, `${rest.fromPerson} just apologized to ${rest.toPerson} because: ${error}`]
            })
        }

        case 'WITHDRAW':
            return Object.assign({}, state, {
                myMoney: state.myMoney - rest.amount
            });
        default:
            return state;
    }
}

/************************************** THUNK ACTION CREATORS */
function makeSandwichesForEverybody() {
    return function(dispatch, getState) {
        if (!getState().sandwiches.isShopOpen) {
            return Promise.resolve();
        }

        return dispatch(makeASandwichWithSecretSauce('My Grandma'))
            .then(() =>
                Promise.all([
                    dispatch(makeASandwichWithSecretSauce('Me')),
                    dispatch(makeASandwichWithSecretSauce('My wife'))
                ])
            )
            .then(() => dispatch(makeASandwichWithSecretSauce('Our kids')))
            .then(() => dispatch(getState().myMoney > 42 ? withdrawMoney(42) : apologize('Me', 'The Sandwich Shop')));
    };
}

function makeASandwichWithSecretSauce(forPerson) {
    return function(dispatch) {
        return fetchSecretSauce().then(
            sauce => dispatch(makeASandwich(forPerson, sauce)),
            error => dispatch(apologize('The Sandwich Shop', forPerson, error))
        );
    };
}

/************************************** USUAL ACTION CREATORS */
function makeASandwich(forPerson, secretSauce) {
    return {
        type: 'MAKE_SANDWICH',
        forPerson,
        secretSauce
    };
}

function apologize(fromPerson, toPerson, error) {
    return {
        type: 'APOLOGIZE',
        fromPerson,
        toPerson,
        error
    };
}

function withdrawMoney(amount) {
    return {
        type: 'WITHDRAW',
        amount
    };
}

/************************************** UTILITY FUNCTIONS */
function fetchSecretSauce() {
    let secretSouces = ['X Ingredient', 'Fairy Wings', 'Pixie Powder'];
    let shouldCrash = Math.random() > 0.5;

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let randomSauce = secretSouces[Math.floor(Math.random() * secretSouces.length)];

            shouldCrash ? reject(`Oups, out of ${randomSauce}`) : resolve(randomSauce);
        }, 1000);
    });
}

export { makeSandwichesForEverybody, makeASandwichWithSecretSauce, apologize, withdrawMoney, rootReducer as default };
