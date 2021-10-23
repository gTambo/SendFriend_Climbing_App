const gymChoice = (state = {gymId: '', styleId: ''}, action) => {
    switch(action.type) {
        case 'SET_GYM_CHOICE':
            return action.payload;
        case 'UNSET_GYM_CHOICE':
            return {};
        default:
          return state;
      }
}

export default gymChoice;