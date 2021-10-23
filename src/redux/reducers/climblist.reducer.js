
const climbsList = (state = [{name: '', style: ''}], action) => {
    if(action.type === 'SET_CLIMBS_LIST') {
        return action.payload;
    } else if (action.type === 'RESET_CLIMBS') {
        return [];
    }
    return state;
}

export default climbsList;