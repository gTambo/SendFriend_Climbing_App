import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
// import DropzoneS3Uploader from 'react-dropzone-s3-uploader';

import './S3Upload.css';
// TO DO: REPLACE WITH MORE CURRENT VERSION OF S3BUCKET
import { readAndCompressImage } from 'browser-image-resizer';



function UploadPhoto () {
    // usingParams
    const allParams = useParams();
    const { gymId, styleId } = allParams;
    const dispatch = useDispatch();
    const history = useHistory();
    // get the New Climb ID
    const newClimb = useSelector(store => store.newClimb);
    // code for aws-sdk /s3Bucket
    const imageConfig = {
        quality: 1.0,
        maxHeight: 300,
        autoRotate: false,
    };
    const newClimbId = newClimb.id;
    console.log('Id for new climb: ', newClimbId);
    const [preview, setPreview] = useState('');
    const [selectedFile, setSelectedFile] = useState('');
    const [resizedFile, setResizedFile] = useState({});
    const onFileChange = async (event) => {
        const selectedFile = event.target.files[0];
        const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
        if (acceptedImageTypes.includes(selectedFile.type)) {
            const copyFile = new Blob([selectedFile], { type: selectedFile.type });
            const saveFile = await readAndCompressImage(copyFile, imageConfig);
            setSelectedFile(selectedFile);
            setResizedFile(saveFile);
            setPreview(URL.createObjectURL(saveFile));
            console.log('preview: ', preview);
            console.log('save file: ', saveFile);
            console.log('selected file: ', selectedFile);
        } else {
            alert('Invalid image file type. Must be gif, jpeg or png.');
        }
    }

    const sendFormDataToServer = () => {
        let photoInfo = { climbId: newClimbId, selectedFile: selectedFile, resizedFile: resizedFile, gymId, styleId};
        console.log('sending to saga: ', photoInfo);
        dispatch({ type: 'UPLOAD_PHOTO', payload: photoInfo});
        setPreview('');
        history.push(`/climbs/${gymId}/${styleId}`);
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
            <input id="photoInput" type="file" accept="image/*" encType="multipart/form-data" onChange={onFileChange} />
            <button onClick={() => sendFormDataToServer()}>Save Photo</button>
            <button onClick={ () => history.push(`/climbs/${gymId}/${styleId}`)}>Skip Photo</button>
        </div>
    )
}

export default UploadPhoto;

// BELOW: using react-dropzone-s3-uploader

// function UploadPhoto ({setNewClimb, newClimb }) {

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

