import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchClimbDetails(action) {
    try{
        const config = {
            headers: { 'Content-Type': 'application/json'},
            withCredentials: true,
        }
        // set id from payload to var
        const climbId = action.payload.id;
        console.log('in details saga', climbId);
        const response = yield axios.get(`/api/details/${climbId}`, config);
        console.log('Got the deets: ', response.data);
        yield put({ type: 'SET_CLIMB_DETAILS', payload: response.data[0]});
        yield put({ type: 'FETCH_COMMENTS', payload: climbId });
    } catch (error) {
        console.log('Error fetching details', error);
    }
}

function* deleteClimbTag(action) {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json'},
            withCredentials: true,
        }
        const idToDelete = action.payload.idToDelete;
        console.log('request to delete: ', idToDelete);
        const response = yield axios.delete(`/api/climbs/${idToDelete}`, config);
        console.log('DELETE response: ', response)
        console.log('Row Count: ', response.data.rCount);
        if(response.data.rCount === 0) {
            alert(response.data.message);
        } else {
            yield put({ type: 'FETCH_ALL_CLIMBS', payload: action.payload });
        }
        
    } catch (err) {
        console.log('Error in delete saga: ', err);
    }
}

function* editClimbTag(action) {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json'},
            withCredentials: true,
        }
        // set the Id to a variable
        const idToEdit = action.payload.id;
        console.log('Edit Saga: ', idToEdit, action.payload);
        // send to server 
        yield axios.put(`/api/climbs/edit/${idToEdit}`, action.payload, config);
        // update climbs list
        yield put({ type: 'FETCH_ALL_CLIMBS', payload: { gymId: action.payload.gym_id, styleId: action.payload.climb_style_id } });
    } catch (err) {
        console.log('Error in edit saga: ', err);
    }
}


function* climbDetailSaga() {
    yield takeLatest('FETCH_CLIMB_DETAILS', fetchClimbDetails);
    yield takeLatest('DELETE_CLIMB_TAG', deleteClimbTag);
    yield takeLatest('EDIT_CLIMB_TAG', editClimbTag);
}

export default climbDetailSaga;