
const climbDetails = (state = {}, action) => {
    switch(action.type) {
        case 'SET_CLIMB_DETAILS':
            return action.payload;
        case 'UNSET_DETAILS':
            return {};
        default:
          return state;
      }
}

export default climbDetails;