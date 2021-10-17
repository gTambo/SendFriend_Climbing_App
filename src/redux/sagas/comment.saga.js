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
        yield put({ type: 'FETCH_COMMENTS', payload: action.payload.climb_id });
    } catch (err) {
        console.log('Error in rating saga: ', err);
    }
}

function* fetchComments(action) {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json'},
            withCredentials: true,
        }
        // const idToRate = action.payload.id;
        console.log('req to get comments for climb: ', action.payload);
        const commentsResponse = yield axios.get(`/api/details/comment/${action.payload}`, config);
        console.log('Got the comments: ', commentsResponse.data);
        yield put({ type: 'SET_CLIMB_COMMENTS', payload: commentsResponse.data });
    } catch (err) {
        console.log('Error in rating saga: ', err);
    }
}

function* commentSaga() {
    yield takeLatest('ADD_COMMENT', addComment);
    yield takeLatest('FETCH_COMMENTS', fetchComments);
}

export default commentSaga;