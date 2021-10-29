import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import UploadDisplay from '../S3Upload/S3Upload';

import { Button, TextField, Select, MenuItem, InputLabel, Box } from '@mui/material';

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
    // get list of grades
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
        <Box sx={{display: 'flex', flexDirection: 'column' }}>
        <form onSubmit={ updateClimb }>
            <InputLabel htmlFor="grade" id="edit-grade-label">Grade</InputLabel> 
            <Select autoWidth
                    name="grade" 
                    labelId="edit-grade-label"
                    label="Grade"
                    id="grade" 
                    type="text" 
                    value={editedClimb.grade_id} 
                    onChange={ (event) => setEditedClimb({...editedClimb, grade_id: event.target.value})}>
                        {/* get grades from redux and map to selector */}
                        <MenuItem>-select the grade-</MenuItem>
                        {grades.map((grade) => {
                            return(
                                <MenuItem key={grade.id} value={grade.id}>{grade.difficulty}</MenuItem>
                            )

                        })}
            </Select>
            <InputLabel htmlFor="color" id="edit-color-label">Color</InputLabel>
            <Select autoWidth
                    labelId="edit-color-label"
                    label="Color"
                    name="color" 
                    id="color"
                    value={editedClimb.color}
                    onChange={ (event) => setEditedClimb({...editedClimb, color: event.target.value})}>
                <MenuItem>-select a color-</MenuItem>
                <MenuItem value="Red">Red</MenuItem>
                <MenuItem value="Orange">Orange</MenuItem>
                <MenuItem value="Yellow">Yellow</MenuItem>
                <MenuItem value="Green">Green</MenuItem>
                <MenuItem value="Blue">Blue</MenuItem>
                <MenuItem value="Pink">Pink</MenuItem>
                <MenuItem value="Purple">Purple</MenuItem>
                <MenuItem value="Teal">Teal</MenuItem>
                <MenuItem value="Black">Black</MenuItem>
                <MenuItem value="White">White</MenuItem>
                <MenuItem value="Grey">Grey</MenuItem>
                <MenuItem value="Tan">Tan</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
            </Select>
            
            <TextField label="MovementStyle" 
                   id="movement" 
                   type="text" 
                   sx={{marginBottom: '1em', marginLeft: '1em'}}
                   value={editedClimb.movement_style}
                   onChange={ (event) => setEditedClimb({...editedClimb, movement_style: event.target.value})}
            />
            <Button label="MovementStyle" type="submit" value="Save Changes">Save Changes</Button>
        </form>
        </Box>
    )
}

export default EditClimbForm;