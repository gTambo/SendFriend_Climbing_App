import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
// import UploadPhoto from '../S3Upload/S3Upload';
import { readAndCompressImage } from 'browser-image-resizer';

function AddClimbForm({gymId, styleId}) {

    const dispatch = useDispatch();
    const history = useHistory();
    // Use Redux to store grades
    const grades = useSelector(store => store.grades);
    // use local state to assemble new climb details as an object
    let defaultClimb = {
        grade_id: '',
        color: '',
        photo: '',
        movement_style: '',
        gym_id: gymId,
        climb_style_id: styleId,
    };

    const [newClimb, setNewClimb] = useState(defaultClimb);
    
    // To Do: get Grades 
    useEffect( () => {
        dispatch({ type: 'FETCH_ALL_GRADES' })
    }, [dispatch]);

    

    // code for aws-sdk /s3Bucket
    const imageConfig = {
        quality: 1.0,
        maxHeight: 300,
        autoRotate: false,
    };
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

    const saveNewClimb = (event) => {
        event.preventDefault();
        console.log('climb to add: ', newClimb);
        // including gymId and styleId for dispatch to FETCH_ALL_CLIMBS
        // If including files for adding photos to s3Bucket
        // use: selectedFile: selectedFile, resizedFile: resizedFile,
        dispatch({ type: 'ADD_CLIMB', payload: {newClimb: newClimb,  gymId: gymId, styleId: styleId} });
        // sendFormDataToServer();
        // setNewClimb(defaultClimb);
        // alert("Climb added!");
        // setPreview('');
        // setSelectedFile('');
        // setResizedFile('');
        history.push(`/climbs/${gymId}/${styleId}/addPhoto`);
    }

    // const sendFormDataToServer = () => {
    //     // console.log('sending to saga: ', formData.has('image'));
    //     dispatch({ type: 'UPLOAD_PHOTO', payload: {selectedFile, resizedFile}});
    //     setPreview('');
    // }

    return(
        <>
        {/* {JSON.stringify(grades)} */}
        <form onSubmit={ saveNewClimb }>
            <label htmlFor="grade">Grade</label> 
            <select name="grade" 
                    required 
                    id="grade" 
                    type="text" 
                    value={newClimb.grade_id} 
                    onChange={ (event) => setNewClimb({...newClimb, grade_id: event.target.value})}>
                        {/* get grades from redux and map to selector */}
                        <option>Select the grade</option>
                        {grades.map((grade) => {
                            return(
                                <option key={grade.id} value={grade.id}>{grade.difficulty}</option>
                            )

                        })}
            </select>
            <label htmlFor="color">Color</label>
            <select required
                    name="color" 
                    id="color"
                    value={newClimb.color}
                    onChange={ (event) => setNewClimb({...newClimb, color: event.target.value})}>
                <option>select a color</option>
                <option value="Red">Red</option>
                <option value="Orange">Orange</option>
                <option value="Yellow">Yellow</option>
                <option value="Green">Green</option>
                <option value="Blue">Blue</option>
                <option value="Pink">Pink</option>
                <option value="Purple">Purple</option>
                <option value="Teal">Teal</option>
                <option value="Black">Black</option>
                <option value="White">White</option>
                <option value="Grey">Grey</option>
                <option value="Tan">Tan</option>
                <option value="Other">Other</option>
            </select>
            
            {/* { preview && (
                <img
                    className="placeholder-photo-preview"
                    src={preview}
                    alt="Photo preview"
                />)
            }
            <input id="photoInput" type="file" accept="image/*" encType="multipart/form-data" onChange={onFileChange} /> */}
            {/* <button onClick={() => sendFormDataToServer()}>Save Photo</button> */}

            <label htmlFor="movement">Movement Style</label>
            <input id="movement" 
                   type="text" 
                   value={newClimb.movement_style}
                   onChange={ (event) => setNewClimb({...newClimb, movement_style: event.target.value})}
            />
            <input type="submit" value="Add Photo" />
        </form>
        {/* <label htmlFor="photo">Photo</label> */}
            {/* <input required
                   id="photo" 
                   type="text"
                   value={newClimb.photo}
                   onChange={ (event) => setNewClimb({...newClimb, photo: event.target.value})} 
            /> */}
            {/* <UploadDisplay id="photo" setNewClimb={setNewClimb} newClimb={newClimb} /> */}
        </>
    )
}

export default AddClimbForm;