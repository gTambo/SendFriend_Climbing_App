import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';

function* fetchGrades() {
    try {
        // verify login
        const config = {
            headers: { 'Content-Type': 'application/json'},
            withCredentials: true,
        }
        const response = yield axios.get('/api/grades', config);
        console.log('Got the grades:', response.data);
        yield put({ type: 'SET_GRADES', payload: response.data });
    } catch (error) {
        console.log('error fetching grades: ', error);
    }
}

function* getTheseGrades(action) {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json'},
            withCredentials: true,
        }
        // set grade id to 3 less than the grade_id in the payload
        let grade_id = Math.max(0, (action.payload.id - 3)); 
        console.log('Grade Id to fetch', grade_id);
        const response = yield axios.get(`/api/grades/${grade_id}`, config);
        console.log('Got the grades:', response.data);
        yield put({ type: 'SET_SOME_GRADES', payload: response.data });
    } catch (error) {
        console.log('Error Fetching grades', error);
    }
}

function* gradesSaga() {
    yield takeLatest('FETCH_ALL_GRADES', fetchGrades);
    yield takeLatest('GET_THESE_GRADES', getTheseGrades)
}

export default gradesSaga;