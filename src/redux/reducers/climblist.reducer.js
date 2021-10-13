
const climbsList = (state = [], action) => {
    if(action.type === 'SET_CLIMBS_LIST') {
        return action.payload;
    }
    return state;
}

export default climbsList;