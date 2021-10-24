
const grades = (state = [{difficulty: 'V0'}], action) => {
    switch(action.type) {
        case 'SET_GRADES':
            return action.payload;
        case 'UNSET_GRADES':
            return [];
        default:
            return state;
    }
}

export default grades;