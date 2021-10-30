import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { readAndCompressImage } from 'browser-image-resizer';

import { 
    Button, 
    TextField, 
    Select, 
    MenuItem, 
    InputLabel, 
    Box, 
    Snackbar, 
} from '@mui/material';

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
    // const [snackState, setSnackState] = useState({
    //     open: false,
    //     vertical: 'top',
    //     horizontal: 'center',
    //   });
    
    
    // To Do: get Grades 
    useEffect( () => {
        dispatch({ type: 'FETCH_ALL_GRADES' })
    }, [dispatch]);

    
    const saveNewClimb = (event) => {
        event.preventDefault();
        console.log('climb to add: ', newClimb);
        // including gymId and styleId for dispatch to FETCH_ALL_CLIMBS

        dispatch({ type: 'ADD_CLIMB', payload: {newClimb: newClimb,  gymId: gymId, styleId: styleId} });
        history.push(`/climbs/${gymId}/${styleId}/addPhoto`);
    }

  
    return(
        <Box sx={{display: 'flex', flexDirection: 'column', }}>
        {/* {JSON.stringify(grades)} */}
            
        <form onSubmit={ saveNewClimb }>
            {/* <InputLabel htmlFor="grade" id="grade-label">Grade</InputLabel>  */}
            <TextField select name="grade" 
                    label="Grade"
                    required 
                    id="grade" 
                    width="auto"
                    sx={{marginRight: '1em'}}
                    value={newClimb.grade_id} 
                    onChange={ (event) => setNewClimb({...newClimb, grade_id: event.target.value})}>
                        {/* get grades from redux and map to selector */}
                        <MenuItem key={'7fhnr8d9'}>-select the grade-</MenuItem>
                        {grades.map((grade, i) => {
                            return(
                                <MenuItem key={i, grade.id} value={grade.id}>{grade.difficulty}</MenuItem>
                            )

                        })}
            </TextField>
            {/* <InputLabel htmlFor="color" id="color-label">Color</InputLabel> */}
            <TextField select required
                    label="Color"
                    name="color" 
                    id="color"
                    width="auto"
                    sx={{marginRight: '1em'}}
                    value={newClimb.color}
                    onChange={ (event) => setNewClimb({...newClimb, color: event.target.value})}>
                <MenuItem key={'cl0'} >-select a color-</MenuItem>
                <MenuItem key={'cl1'} value="Red">Red</MenuItem>
                <MenuItem key={'cl2'} value="Orange">Orange</MenuItem>
                <MenuItem key={'cl3'} value="Yellow">Yellow</MenuItem>
                <MenuItem key={'cl4'} value="Green">Green</MenuItem>
                <MenuItem key={'cl5'} value="Blue">Blue</MenuItem>
                <MenuItem key={'cl6'} value="Pink">Pink</MenuItem>
                <MenuItem key={'cl7'} value="Purple">Purple</MenuItem>
                <MenuItem key={'cl8'} value="Teal">Teal</MenuItem>
                <MenuItem key={'cl9'} value="Black">Black</MenuItem>
                <MenuItem key={'cla'} value="White">White</MenuItem>
                <MenuItem key={'clb'} value="Grey">Grey</MenuItem>
                <MenuItem key={'cld'} value="Tan">Tan</MenuItem>
                <MenuItem key={'cle'} value="Other">Other</MenuItem>
            </TextField>
            
            <TextField id="movement" 
                   type="text" 
                   label="Movement Style"
                   sx={{marginBottom: '1em'}}
                   value={newClimb.movement_style}
                   onChange={ (event) => setNewClimb({...newClimb, movement_style: event.target.value})}
            />
            <br/>
            
            <Button type="submit" variant="contained" sx={{marginBottom: '1em'}}>
                Add A Photo
            </Button>
   
        </form>
       
        </Box>
    )
}

export default AddClimbForm;