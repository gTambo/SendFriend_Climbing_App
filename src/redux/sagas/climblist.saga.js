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

        if(response.data.length > 0) {
            // send dispatch and payload to reducer
        yield put({ type: 'SET_CLIMBS_LIST', payload: response.data})
        } else {
            // if no climbs match the request, don't show anything already in reducer
            yield put({ type: 'RESET_CLIMBS' });
        }
        
    } catch (error) {
        console.log('Error climb list saga:', error);
    }
}


function* addClimb(action) {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json'},
            withCredentials: true,
        }

        const newClimb = action.payload.newClimb;
        console.log('Add Climb Saga: ', newClimb);
        const postRes = yield axios.post('/api/climbs', newClimb, config);
        console.log('Response from server, expecting id: ', postRes.data.id);
        yield put({ type: 'SET_CLIMB_ID', payload: postRes.data});
        yield put({ type: 'FETCH_ALL_CLIMBS', payload: action.payload});
    } catch (err) {
        console.log('Error adding new Climb ', err);
        alert("Unable to add Climb.");
    }
}

function* climblistSaga() {
    yield takeLatest('FETCH_ALL_CLIMBS', fetchClimbs);
    yield takeLatest('ADD_CLIMB', addClimb);
}

export default climblistSaga;



 // :     🤌🏼