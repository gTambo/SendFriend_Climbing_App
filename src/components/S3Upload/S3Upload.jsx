import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
// import DropzoneS3Uploader from 'react-dropzone-s3-uploader';

import './S3Upload.css';
// TO DO: REPLACE WITH MORE CURRENT VERSION OF S3BUCKET
import { readAndCompressImage } from 'browser-image-resizer';

import { 
    Button, 
    LinearProgress,
    Snackbar, 
    TextField, 
    Select, 
    MenuItem, 
    InputLabel, 
    Box, 
    Fade,
} from '@mui/material';


function UploadPhoto () {
    // usingParams
    const allParams = useParams();
    const { gymId, styleId } = allParams;
    const dispatch = useDispatch();
    const history = useHistory();
    // get the New Climb ID
    const reduxStore = useSelector(store => store);
    const { newClimb } = reduxStore;

    // code for aws-sdk /s3Bucket
    const imageConfig = {
        quality: 1,
        maxHeight: 400,
        autoRotate: false,
    };
    const newClimbId = newClimb.id;
    // console.log('Id for new climb: ', newClimbId);
    const [addingPhoto, setAddingPhoto] = useState(false);
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

    const pushAfter2Seconds = () => {
        console.log("Adding photo...")
        return new Promise(resolve => {
          setTimeout(function() {
            resolve("photo add");
            history.push(`/climbs/${gymId}/${styleId}`);
            console.log("Add photo is done");
          }, 2000);
        });
      }
    
      const alertFor2Seconds = () => {
        console.log("Alerting...")
        return new Promise(resolve => {
          setTimeout(function() {
            resolve("photo alert");
            alert("Adding photo")
            console.log("Add photo is done");
          }, 2000);
        });
      }

    let photoInfo = { climbId: newClimbId, selectedFile: selectedFile, resizedFile: resizedFile, gymId, styleId};

    const sendFormDataToServer = async (event) => {
        event.preventDefault();
        setAddingPhoto(true);
        console.log('sending to saga: ', photoInfo);
        await dispatch({ type: 'UPLOAD_PHOTO', payload: photoInfo});
        await setPreview('');
        await pushAfter2Seconds();
    }

    const showPending = (addingPhoto) ? true : false
    return(
        <>
        {showPending && (<div><p>Adding photo... </p><LinearProgress /></div>)}
            {!showPending && (<div><form style={{'marginLeft': '2em'}} onSubmit={sendFormDataToServer}>
                {preview && (
                    <img
                        className="placeholder-photo-preview"
                        src={preview}
                        alt="Photo preview"
                    />)}
               
                    <input id="photo-input" type="file" accept="image/*" onChange={onFileChange} />
                
                    <Button type="submit" variant="contained" sx={{marginBottom: '1em'}}>
                        Save Photo
                    </Button>

            </form>
            
            <Button onClick={() => history.push(`/climbs/${gymId}/${styleId}`)}>Skip Photo</Button></div>)}
        </>
    )
}

export default UploadPhoto;

