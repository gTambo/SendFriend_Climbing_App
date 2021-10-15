import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* addRating(action) {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json'},
            withCredentials: true,
        }
        // const idToRate = action.payload.id;
        console.log('request to rate: ', action.payload);
        yield axios.post(`/api/details/rating`, action.payload, config);
        yield put({ type: 'FETCH_ALL_CLIMBS' });
    } catch (err) {
        console.log('Error in rating saga: ', err);
    }
}

function* ratingSaga() {
    yield takeLatest('ADD_RATING', addRating);
}

export default ratingSaga;