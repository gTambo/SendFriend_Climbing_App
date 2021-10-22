import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* addToLogbook(action) {
    try {
        console.log(' in add to logbook saga', action.payload);
        const config = {
            headers: { 'Content-Type': 'application/json'},
            withCredentials: true,
        }
        const climbToLog = action.payload;
        console.log('logging climb: ', climbToLog);
        const postRes = yield axios.post('/api/logbook', climbToLog, config);
        console.log('Response from server, expecting id: ', postRes.data.id);
        yield put({ type: 'SET_CLIMB_ID', payload: postRes.data});
    } catch (error) {
        console.log('ERROR adding to logbook', error);
    }
}

function* fetchLogbook() {
    try {
        console.log('Fetching logged climbs ');
        const config = {
            headers: { 'Content-Type': 'application/json'},
            withCredentials: true,
        }
        const response = yield axios.get('/api/logbook', config);
        console.log("User's logged climbs: ", response.data);
        if(response.data) {
            // send dispatch and payload to reducer
        yield put({ type: 'SET_LOGBOOK', payload: response.data})
        } else {
            // if no climbs match the request, don't show anything already in reducer
            yield put({ type: 'RESET_LOGBOOK' });
        }
    } catch (error) {
        
    }
}

function* logbookSaga() {
    yield takeLatest('ADD_TO_LOGBOOK', addToLogbook);
    yield takeLatest('FETCH_LOGBOOK', fetchLogbook);
}

export default logbookSaga;