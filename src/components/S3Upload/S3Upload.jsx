import React from 'react';
import DropzoneS3Uploader from 'react-dropzone-s3-uploader';
import './S3Upload.css';

function UploadDisplay ({setNewClimb, newClimb }) {

    const dropStyles ={
        width: '220px',
        height: '60px',
        border: '1px solid black',
        'border-radius': '5px', 
        'background-color': '#00d3d6',
    }

    const handleFinishedUpload = info => {
        console.log("image info: ", info);
        // console.log('File uploaded with filename', info.filename)
        console.log('Access it on s3 at', info.fileUrl);
        setNewClimb({...newClimb, photo: info.fileUrl})
      }

    const uploadOptions = {
        server: 'http://localhost:5000',
        // signingUrlQueryParams: {uploadType: 'avatar'},
    }

    const s3Url = 'https://climbtags1.s3.amazonaws.com';

    const innerDropElement = (
        <div className="inner-drop">
            <p>Click or Drop photo here</p>
        </div>
    );

    return (
        <DropzoneS3Uploader
            children={innerDropElement}
            onFinish={(event) => handleFinishedUpload(event)}
            s3Url={s3Url}
            style={dropStyles}
            maxSize={1024 * 1024 * 5}
            upload={uploadOptions}
        />
    )
}

export default UploadDisplay;