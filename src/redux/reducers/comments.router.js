
const comments = (state = [], action) => {
    switch(action.type) {
        case 'SET_CLIMB_COMMENTS':
            return action.payload;
        case 'UNSET_COMMENTS':
            return [];
        default:
          return state;
      }
}

export default comments;