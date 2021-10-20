const newClimb = (state = {}, action) => {
    switch(action.type) {
        case 'SET_CLIMB_ID':
            return action.payload;
        case 'UNSET_CLIMB_ID':
            return {};
        default:
          return state;
      }
}

export default newClimb;