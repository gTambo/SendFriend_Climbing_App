import { combineReducers } from "redux";

// Reducers go here

const gymList = (state = [], action) => {
    if(action.type === 'SET_GYMS') {
        return action.payload;
    }
    if(action.type === 'UNSET_GYMS') {
        return [];
    }
    return state;
}

export default combineReducers({
    gymList,
});