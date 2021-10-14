
const grades = (state = [], action) => {
    switch(action.type) {
        case 'SET_GRADES':
            return action.payload;
        default:
            return state;
    }
}

export default grades;