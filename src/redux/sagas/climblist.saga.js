import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchClimbs(action) {
    try{
        const config = {
            headers: { 'Content-Type': 'application/json'},
            withCredentials: true,
        }
        const gymId = action.payload.gymId;
        const styleId = action.payload.styleId;
        console.log('Saga Sending to router at location: ', gymId, styleId);
        
        // setting what we get back to a variable
        const response = yield axios.get(`/api/climbs/${gymId}/${styleId}`, config);
        console.log("Got some climbs from the server", response.data);

        if(response.data) {
            // send dispatch and payload to reducer
        yield put({ type: 'SET_CLIMBS_LIST', payload: response.data})
        } else {
            yield put({ type: 'RESET_CLIMBS' });
        }
        
    } catch (error) {
        console.log('Error climb list saga:', error);
    }
}


// try {
//     const { selectedFile, resizedFile } = action.payload;
//     // The name seems to be dropped on resize, send the name from the
//     // original selected file instead.
//     const fileName = encodeURIComponent(selectedFile.name);
//     const fileType = encodeURIComponent(resizedFile.type);
//     const fileSize = encodeURIComponent(resizedFile.size);
//     // const fileData = encodeURIComponent(resizedFile);
//     console.log('File name/type: ', fileName, fileType,);
//     const formData = new FormData();
//     formData.append('image', resizedFile );
//     console.log(resizedFile);
//     console.log('Saga posting to the server: ', formData);
//     const resp = yield axios.post(`/api/climbs/s3?name=${fileName}&type=${fileType}&size=${fileSize}`,  formData );
//     console.log(resp);
// } catch (error) {
//     alert('Something went wrong when uploading a photo');
//     console.log('Photo Upload - post request failed', error);
// }


function* addClimb(action) {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json'},
            withCredentials: true,
        }

        const newClimb = action.payload.newClimb;
        console.log('Add Climb Saga: ', newClimb);
        const postRes = yield axios.post('/api/climbs', newClimb, config);
        console.log('Response from server, expecting id: ', postRes.data.id);
        yield put({ type: 'NEW_CLIMB', payload: {newId: postRes.data.id, gymId: action.payload.gymId, styleId: action.payload.styleId}});
        // yield put({ type: 'FETCH_ALL_CLIMBS', payload: action.payload});
    } catch (err) {
        console.log('Error adding new Climb ', err);
        alert("Unable to add Climb.");
    }
}

function* climblistSaga() {
    yield takeLatest('FETCH_ALL_CLIMBS', fetchClimbs);
    yield takeLatest('ADD_CLIMB', addClimb);
}

export default climblistSaga;