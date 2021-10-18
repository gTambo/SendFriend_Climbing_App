const newClimb = (state = {}, action) => {
    switch(action.type) {
        case 'NEW_CLIMB':
            return action.payload;
        case 'UNSET_NEW_CLIMB':
            return {};
        default:
          return state;
      }
}

export default newClimb;