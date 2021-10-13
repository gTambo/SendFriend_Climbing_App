import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchStyles() {
    try{ 
        const config = {
            headers: { 'Content-Type': 'application/json'},
            withCredentials: true,
        }
        // setting what we get back to a variable
        const response = yield axios.get('/api/style', config);
        console.log("show me the styles: ", response.data);
        // send dispatch and payload to reducer
        yield put({ type: 'SET_CLIMB_STYLES', payload: response.data});
    } catch (error) {
        console.log('error in climbstyles saga', error);
    }
}

function* styleSaga() {
    yield takeLatest('FETCH_CLIMB_STYLES', fetchStyles);
}

export default styleSaga;