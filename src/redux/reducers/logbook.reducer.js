
const logbook = (state = [], action) => {
    if(action.type === 'SET_LOGBOOK') {
        return action.payload;
    } else if (action.type === 'RESET_LOGBOOK') {
        return [];
    }
    return state;
}

export default logbook;