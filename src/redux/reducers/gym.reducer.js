import { combineReducers } from "redux";

// Reducers go here

const gymList = (state = [], action) => {
    if(action.type === 'SET_GYMS') {
        return action.payload;
    }
    return state;
}

export default combineReducers({
    gymList,
});