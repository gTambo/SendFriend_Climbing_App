
const stylesList = (state = [], action) => {
    if(action.type === 'SET_CLIMB_STYLES') {
        return action.payload;
    }
    return state;
}

export default stylesList;