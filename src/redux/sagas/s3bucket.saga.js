import React from 'react';
import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* uploadPhoto(action) {
    try {
        const { selectedFile, resizedFile, climbId, gymId, styleId } = action.payload;
        // The name seems to be dropped on resize, send the name from the
        // original selected file instead.
        const fileName = encodeURIComponent(selectedFile.name);
        const fileType = encodeURIComponent(resizedFile.type);
        const fileSize = encodeURIComponent(resizedFile.size);
        // const fileData = encodeURIComponent(resizedFile);
        console.log('File name/type: ', fileName, fileType,);
        const formData = new FormData();
        formData.append('image', resizedFile);
        formData.append('climbId', climbId);
        console.log(resizedFile);
        console.log('Saga posting to the server: ', formData);
        for(let [name, value] of formData){
            console.log(`${name} = ${value}`);
        }
        const resp = yield axios.put(`/api/climbs/s3?name=${fileName}&type=${fileType}&size=${fileSize}`, formData );
        console.log('s3 response data', resp);
        yield put({ type: 'FETCH_ALL_CLIMBS', payload: {gymId: gymId, styleId: styleId}});
    } catch (error) {
        alert('Something went wrong when uploading a photo');
        console.log('Photo Upload - post request failed', error);
    }
}

function* postPhoto(action) {
    try{
        let fileName = {selectedFile: action.payload}
        axios.post('/climbs/photourl', fileName);
        yield put({ type: 'FETCH_ALL_CLIMBS' });
    } catch (err) {
        console.log('error posting photo', err);
    }
}

function* photoSaga() {
    yield takeLatest('UPLOAD_PHOTO', uploadPhoto);
    yield takeLatest('POST_PHOTO', postPhoto);
}

export default photoSaga;