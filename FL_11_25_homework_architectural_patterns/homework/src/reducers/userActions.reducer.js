export const usersReducer = (currentState, action) => {
    let nextState ={...currentState};
    switch (action.type) {
    case 'addItems':
        {
            console.log(action.value);
            if ( action.value && action.value + currentState.items < currentState.usersData.length) {
                console.log(action.value);
                nextState.items+= action.value;
                console.log(nextState.items);
                nextState.visibleUsers = nextState.usersData.slice(0, nextState.items);
            } else if (action.value) {
                nextState.visibleUsers= nextState.usersData;
                nextState.items= nextState.usersData.length;
            }
        }
        break;
    case 'removeItem':
        {
            console.log(action.value);
            console.log(currentState.usersData.length);
            if (action.value) {
                nextState.usersData.splice(nextState.usersData.findIndex((user) => user.id === action.value), 1 );
                nextState.visibleUsers = nextState.usersData.slice(0, nextState.items);
            }
        }
        break;
    case 'searchItems': {
        if ( action.value != '') {
            nextState.visibleUsers= nextState.usersData.filter( (el) => {
                return el.name.toLowerCase().includes(action.value.toLowerCase());
            });
            nextState.search= true;
            nextState.items= nextState.visibleUsers.length;
        } else {
            if (nextState.usersData.length>5) {
                nextState.visibleUsers= nextState.usersData.slice(0, 5);
                nextState.items= 5;
            } else {
                nextState.visibleUsers= nextState.usersData;
                nextState.items= nextState.usersData.length;
            }
            nextState.search= false;
        }
    }
        break;
    default:
        return currentState;
    }
    return nextState;
};