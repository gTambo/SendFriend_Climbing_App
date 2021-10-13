import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchGyms() {
    try{ 
        const config = {
            headers: { 'Content-Type': 'application/json'},
            withCredentials: true,
        }
        // setting what we get back to a variable
        const response = yield axios.get('/api/gym', config);
        console.log("show me the gyms: ", response.data);
        // send dispatch and payload to reducer
        yield put({ type: 'SET_GYMS', payload: response.data});
    } catch (error) {
        console.log('error in gym saga', error);
    }
}

// Add Gym will go here

function* gymSaga() {
    yield takeLatest('FETCH_GYMS', fetchGyms);
}

export default gymSaga;