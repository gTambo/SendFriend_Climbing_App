import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
// import DropzoneS3Uploader from 'react-dropzone-s3-uploader';

import './S3Upload.css';
// TO DO: REPLACE WITH MORE CURRENT VERSION OF S3BUCKET
import { readAndCompressImage } from 'browser-image-resizer';



function UploadDisplay ({setNewClimb, newClimb }) {
    const imageConfig = {
        quality: 0.5,
        maxHeight: 300,
        autoRotate: false,
        debug: true
    };
    const dispatch = useDispatch();
    const [preview, setPreview] = useState('');
    const [selectedFile, setSelectedFile] = useState('');
    const [resizedFile, setResizedFile] = useState({});
    const onFileChange = async (event) => {
        const selectedFile = event.target.files[0];
        const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
        if (acceptedImageTypes.includes(selectedFile.type)) {
            const copyFile = new Blob([selectedFile], { type: selectedFile.type });
            const resizedFile = await readAndCompressImage(copyFile, imageConfig);
            setSelectedFile(selectedFile);
            setResizedFile(resizedFile);
            setPreview(URL.createObjectURL(resizedFile));
            console.log('preview: ', preview);
            console.log('resized file: ', resizedFile);
            console.log('selected file: ', selectedFile);
        } else {
            alert('Invalid image file type. Must be gif, jpeg or png.');
        }
    }

    const sendFormDataToServer = () => {
        const formData = new FormData();
        formData.append('image', resizedFile, {fileName: selectedFile.name});
        console.log('sending to saga: ', formData.has('image'));
        dispatch({ type: 'UPLOAD_PHOTO', payload: {selectedFile, resizedFile, formData}});
        // let action;
        // // The file name seems to be dropped on resize, send both the
        // // original and resized files.
        // action = {
        //     type: 'UPLOAD_PHOTO',
        //     payload: {
        //         // any other form data...
        //         selectedFile,
        //         resizedFile,
        //     },
        // };
        // dispatch(action);
        setPreview('');
    }

    return(
        <div>
            { preview && (
                <img
                    className="placeholder-photo-preview"
                    src={preview}
                    alt="Photo preview"
                />)
            }
            <input id="photoInput" type="file" accept="image/*" onChange={onFileChange} />
            <button onClick={() => sendFormDataToServer()}>Save Photo</button>
        </div>
    )
}


// BELOW: using react-dropzone-s3-uploader

// function UploadDisplay ({setNewClimb, newClimb }) {

//     const dropStyles ={
//         width: '220px',
//         height: '60px',
//         border: '1px solid black',
//         'border-radius': '5px', 
//         'background-color': '#00d3d6',
//     }

//     const handleFinishedUpload = info => {
//         console.log("image info: ", info);
//         // console.log('File uploaded with filename', info.filename)
//         console.log('Access it on s3 at', info.fileUrl);
//         setNewClimb({...newClimb, photo: info.fileUrl})
//       }

//     const uploadOptions = {
//         server: 'http://localhost:5000',
//         // signingUrlQueryParams: {uploadType: 'avatar'},
//     }

//     const s3Url = 'https://climbtags1.s3.amazonaws.com';

//     const innerDropElement = (
//         <div className="inner-drop">
//             <p>Click or Drop photo here</p>
//         </div>
//     );

//     return (
//         <DropzoneS3Uploader
//             children={innerDropElement}
//             onFinish={(event) => handleFinishedUpload(event)}
//             s3Url={s3Url}
//             style={dropStyles}
//             maxSize={1024 * 1024 * 5}
//             upload={uploadOptions}
//         />
//     )
// }

export default UploadDisplay;