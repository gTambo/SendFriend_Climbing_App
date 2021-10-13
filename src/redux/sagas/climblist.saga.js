import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchClimbs() {
    try{
        const config = {
            headers: { 'Content-Type': 'application/json'},
            withCredentials: true,
        }
        // setting what we get back to a variable
        const response = yield axios.get('/api/climbs', config);
        console.log("Got some climbs from the server", response.data);
        // send dispatch and payload to reducer
        yield put({ type: 'SET_CLIMBS_LIST', payload: response.data})
    } catch (error) {
        console.log('Error climb list saga:', error);
    }
}

function* climblistSaga() {
    yield takeLatest('FETCH_ALL_CLIMBS', fetchClimbs);
}

export default climblistSaga;