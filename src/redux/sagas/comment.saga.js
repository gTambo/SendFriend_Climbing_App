import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* addComment(action) {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json'},
            withCredentials: true,
        }
        // const idToRate = action.payload.id;
        console.log('req to add comment: ', action.payload);
        yield axios.post(`/api/details/comment`, action.payload, config);
        yield put({ type: 'FETCH_CLIMB_DETAILS' });
    } catch (err) {
        console.log('Error in rating saga: ', err);
    }
}

function* commentSaga() {
    yield takeLatest('ADD_COMMENT', addComment);
}

export default commentSaga;