
const grades = (state = [], action) => {
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