import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchGrades(action) {
    try {
        // verify login
        const config = {
            headers: { 'Content-Type': 'application/json'},
            withCredentials: true,
        }
        const response = yield axios.get('/api/climbs/slyes', config);
        console.log('Got the grades:', response.data);
        yield put({ type: 'SET_GRADES', payload: response.data });
    } catch (error) {
        console.log('error fetching grades: ', error);
    }
}

function* gradesSaga() {
    takeLatest('FETCH_ALL_GRADES', fetchGrades);
}

export default gradesSaga;