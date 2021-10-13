import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchClimbs(action) {
    try{
        const config = {
            headers: { 'Content-Type': 'application/json'},
            withCredentials: true,
        }
        const gymId = action.payload.gymId;
        const styleId = action.payload.styleId;
        console.log('Saga Sending to router at location: ', gymId, styleId);
        
        // setting what we get back to a variable
        const response = yield axios.get(`/api/climbs/${gymId}/${styleId}`, config);
        console.log("Got some climbs from the server", response.data);

        if(response.data) {
            // send dispatch and payload to reducer
        yield put({ type: 'SET_CLIMBS_LIST', payload: response.data})
        } else {
            yield put({ type: 'RESET_CLIMBS' });
        }
        
    } catch (error) {
        console.log('Error climb list saga:', error);
    }
}

function* climblistSaga() {
    yield takeLatest('FETCH_ALL_CLIMBS', fetchClimbs);
}

export default climblistSaga;