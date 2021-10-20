import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import UploadDisplay from '../S3Upload/S3Upload';


function EditClimbForm({ gymId, styleId, climbId, climb }) {
    const dispatch = useDispatch();
    const history = useHistory();
    // Use Redux to store grades
    const grades = useSelector(store => store.grades);
    let defaultClimb = {
        id: climbId,
        grade_id: climb.grade_id,
        color: climb.color,
        photo: climb.photo,
        movement_style: climb.movement_style,
        gym_id: gymId,
        climb_style_id: styleId,
    };
    const [editedClimb, setEditedClimb] = useState(defaultClimb);
    // get grades
    useEffect(() => {
        dispatch({ type: 'FETCH_ALL_GRADES' })
    }, [dispatch]);

    const updateClimb = (event) => {
        event.preventDefault();
        console.log('climb to update: ', editedClimb);
        dispatch({ type: 'EDIT_CLIMB_TAG', payload: editedClimb });
        setEditedClimb(defaultClimb);
        alert("Climb updated!");
        history.push(`/climbs/${gymId}/${styleId}`);
    }

    return(
        <form onSubmit={ updateClimb }>
            <label htmlFor="grade">Grade</label> 
            <select 
                    name="grade" 
                    id="grade" 
                    type="text" 
                    value={editedClimb.grade_id} 
                    onChange={ (event) => setEditedClimb({...editedClimb, grade_id: event.target.value})}>
                        {/* get grades from redux and map to selector */}
                        <option>Select the grade</option>
                        {grades.map((grade) => {
                            return(
                                <option key={grade.id} value={grade.id}>{grade.difficulty}</option>
                            )

                        })}
            </select>
            <label htmlFor="color">Color</label>
            <select
                    name="color" 
                    id="color"
                    value={editedClimb.color}
                    onChange={ (event) => setEditedClimb({...editedClimb, color: event.target.value})}>
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
            <label htmlFor="photo">Photo</label>
            {/* <input 
                   id="photo" 
                   type="text"
                   value={editedClimb.photo}
                   onChange={ (event) => setEditedClimb({...editedClimb, photo: event.target.value})} 
            /> */}
            {/* <UploadDisplay id="photo" setClimbToAdd={setEditedClimb} climbToAdd={editedClimb} /> */}
            <label htmlFor="movement">Movement Style</label>
            <input 
                   id="movement" 
                   type="text" 
                   value={editedClimb.movement_style}
                   onChange={ (event) => setEditedClimb({...editedClimb, movement_style: event.target.value})}
            />
            <input type="submit" value="Save Changes" />
        </form>
    )
}

export default EditClimbForm;