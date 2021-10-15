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

function* deleteClimbTag(action) {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json'},
            withCredentials: true,
        }
        const idToDelete = action.payload;
        console.log('request to delete: ', idToDelete);
        yield axios.delete(`/api/climbs/${idToDelete}`, config);
        yield put({ type: 'FETCH_ALL_CLIMBS' })
    } catch (err) {
        console.log('Error in delete saga: ', err);
    }
}


function* climbDetailSaga() {
    yield takeLatest('FETCH_CLIMB_DETAILS', fetchClimbDetails);
    yield takeLatest('DELETE_CLIMB_TAG', deleteClimbTag);
}

export default climbDetailSaga;