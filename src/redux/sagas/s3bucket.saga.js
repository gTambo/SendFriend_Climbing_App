import React from 'react';
import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
const FormData = require('form-data');

function* uploadPhoto(action) {
    try {
        const { selectedFile, resizedFile, } = action.payload;
        // The name seems to be dropped on resize, send the name from the
        // original selected file instead.
        const fileName = encodeURIComponent(selectedFile.name);
        const fileType = encodeURIComponent(resizedFile.type);
        const fileSize = encodeURIComponent(resizedFile.size);
        // const fileData = encodeURIComponent(resizedFile);
        console.log('File name/type: ', fileName, fileType, 'resizedFile', formData);
        const formData = new FormData();
        formData.append('image', resizedFile, fileName);
        console.log(resizedFile);
        console.log('Saga posting to the server: ', formData);
        const resp = yield axios({
            method: 'POST',
            enctype: "multipart/form-data",
            url: `/api/climbs/s3?name=${fileName}&type=${fileType}&size=${fileSize}`,
            body: formData,
            });
        console.log(resp);
        yield put({ type: 'POST_PHOTO', payload: fileName});
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