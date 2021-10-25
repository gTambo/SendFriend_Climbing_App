import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* setArchived(action) {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json'},
            withCredentials: true,
        }
        const idToArchive = action.payload.id; 
        console.log('archiving climb', idToArchive);
        yield axios.put(`/api/details/${idToArchive}`, config);
        yield put({ type: 'FETCH_ALL_CLIMBS', payload: action.payload})
    } catch (error) {
        console.log('ERROR', error);
    }
}

function* archiveSaga() {
    yield takeLatest('SET_ARCHIVED', setArchived);
}

export default archiveSaga;