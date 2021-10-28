
const climbsList = (state = [{name: '', style: ''}], action) => {
    if(action.type === 'SET_CLIMBS_LIST') {
        return action.payload;
    } else if (action.type === 'RESET_CLIMBS') {
        return [{name: 0, style: 0, message: 'No climbs have been added here yet'}];
    }
    return state;
}

export default climbsList;