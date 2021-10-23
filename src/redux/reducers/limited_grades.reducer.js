const limitGrades = (state = [], action) => {
    switch(action.type) {
        case 'SET_SOME_GRADES':
            return action.payload;
        case 'UNSET_SOME_GRADES':
            return [];
        default:
            return state;
    }
}

export default limitGrades;