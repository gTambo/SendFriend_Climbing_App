import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';

function* fetchGrades() {
    try {
        // verify login
        const config = {
            headers: { 'Content-Type': 'application/json'},
            withCredentials: true,
        }
        const response = yield axios.get('/api/climbs/grades', config);
        console.log('Got the grades:', response.data);
        yield put({ type: 'SET_GRADES', payload: response.data });
    } catch (error) {
        console.log('error fetching grades: ', error);
    }
}

function* gradesSaga() {
    yield takeEvery('FETCH_ALL_GRADES', fetchGrades);
}

export default gradesSaga;