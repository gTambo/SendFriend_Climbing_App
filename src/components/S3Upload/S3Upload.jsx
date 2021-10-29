import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
// import DropzoneS3Uploader from 'react-dropzone-s3-uploader';

import './S3Upload.css';
// TO DO: REPLACE WITH MORE CURRENT VERSION OF S3BUCKET
import { readAndCompressImage } from 'browser-image-resizer';

import { 
    Button, 
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
    const newClimb = useSelector(store => store.newClimb);

    // snackbar stuff
    // const [state, setState] = useState({
    //     open: false,
    //     vertical: 'top',
    //     horizontal: 'center',
    //     Transition: 'Fade',
    //   });
    
    //   const { vertical, horizontal, open } = state;
    
    //   const handleClick = (Transition) => () => {
    //     setState({ open: true, Transition });
    //   };
    
    //   const handleClose = () => {
    //     setState({ ...state, open: false });
    //   };

    // code for aws-sdk /s3Bucket
    const imageConfig = {
        quality: 1,
        maxHeight: 400,
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

    let photoInfo = { climbId: newClimbId, selectedFile: selectedFile, resizedFile: resizedFile, gymId, styleId};

    const sendFormDataToServer = () => {
        // handleClick({
        //     vertical: 'bottom',
        //     horizontal: 'center',
        // });

        console.log('sending to saga: ', photoInfo);
        dispatch({ type: 'UPLOAD_PHOTO', payload: photoInfo});
        setPreview('');
        history.push(`/climbs/${gymId}/${styleId}`);
    }

    return(
        <>

            <form style={{'marginLeft': '2em'}} onSubmit={sendFormDataToServer}>
                {preview && (
                    <img
                        className="placeholder-photo-preview"
                        src={preview}
                        alt="Photo preview"
                    />)
                }
                {/* {!preview ? ( */}
                    <input id="photo-input" type="file" accept="image/*" onChange={onFileChange} />
                {/* ) : ( */}
                    <Button type="submit" variant="contained" value="Save Photo" sx={{marginBottom: '1em'}}
                    // onClick={handleClick({
                    //     vertical: 'bottom',
                    //     horizontal: 'center',
                    // })}
                >
                    {/* <Snackbar
                        anchorOrigin={{ vertical, horizontal }}
                        open={open}
                        onClose={handleClose}
                        message="Photo Added"
                        key={vertical + horizontal}
                        /> */}
                Save Photo
            </Button>
                {/* )
            } */}
            </form>

            <Button onClick={() => history.push(`/climbs/${gymId}/${styleId}`)}>Skip Photo</Button>
        </>
    )
}

export default UploadPhoto;

