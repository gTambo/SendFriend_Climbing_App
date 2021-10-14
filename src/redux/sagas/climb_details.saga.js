import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchClimbDetails(action) {
    try{
        const config = {
            headers: { 'Content-Type': 'application/json'},
            withCredentials: true,
        }
        // set id from payload to var
        const climbId = action.payload.id;

        const response = yield axios.get(`/api/details/${climbId}`, config);
        console.log('Got the deets: ', response);
        yield put({ type: 'SET_CLIMB_DETAILS', payload: response.data[0]});
    } catch (error) {
        console.log('Error fetching details', error);
    }
}

function* climbDetailSaga() {
    yield takeLatest('FETCH_CLIMB_DETAILS', fetchClimbDetails);
}

export default climbDetailSaga;