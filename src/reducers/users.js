const initialState = {loggedIn: false, user: {}};

function currentUser(state=initialState, action){
    switch (action.type){
        case 'login':
            return({loggedIn: true, user: action.payload});
        case 'logout':
            return({loggedIn: false, user: {}});
        default:
            return state;
    }
}

export default currentUser;