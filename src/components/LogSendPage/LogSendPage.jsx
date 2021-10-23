import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { 
    Button,
    TextField,
    Select,
    InputLabel,
    MenuItem,
    Box,
    FormControl, 
    Typography,
    LinearProgress,
} from '@mui/material';

function LogASend() {
    // get climbId from params
    const allParams = useParams();
    const climbId = allParams.climbId;

    // get climb details from redux
    const reduxStore = useSelector(store => store);
    const { limitGrades, climbDetails, comments, ratings } = reduxStore;
    // prepare dispatch and history
    const dispatch = useDispatch();
    const history = useHistory();

    // climbDetails should still be inreducer from previous page
    // get the grade and use to set grades in selector
    let gradeId = climbDetails.grade_id;
    // use local state object to store climb to log
    let defaultClimb = {
        climb_id: climbId,
        attempts: '',
        grade_id: '',
    };
    const [climbToLog, setClimbToLog] = useState(defaultClimb)
    
    // get grades on page load
    useEffect(() => {
        console.log('grade_id, expecting an integer: ', gradeId);
        dispatch({ type: 'GET_THESE_GRADES', payload: {id: gradeId}})
    }, [dispatch])

    // handle form submission
    const logASend = (event) => {
        event.preventDefault();
        dispatch({ type: 'ADD_TO_LOGBOOK', payload: climbToLog });
        history.push('/logbook');
    }

    const showForm = limitGrades ? true : false;

    return(
        <div>
            <h2>You are logging this climb:</h2>
            {/* <p>Climb details: {JSON.stringify(climbDetails)}</p> */}
            <p>{climbDetails.color}, &nbsp; {climbDetails.difficulty}</p>
            <p>at {climbDetails.name}</p>
            {!showForm && <LinearProgress />}
            {showForm && (
            // <FormControl fullWidth>
            <form onSubmit={logASend}>
                <Typography variant="h6" >How many atempts this session?</Typography>
                <TextField select
                        autoWidth
                        label="attempts"
                        id="attempts" 
                        type="text" 
                        value={climbToLog.attempts} 
                        onChange={ (event) => setClimbToLog({...climbToLog, attempts: event.target.value}) }>
                    <MenuItem value="">''</MenuItem>
                    <MenuItem value="flash">flash</MenuItem>
                    <MenuItem value="2">2</MenuItem>
                    <MenuItem value="3">3</MenuItem>
                    <MenuItem value="4">4</MenuItem>
                    <MenuItem value="over 4">Over 4</MenuItem>
                </TextField>
                <br/>
                {/* <label htmlFor=""></label> */}
                <Typography variant="h6">What grade would you give it?</Typography> 
                <TextField select
                        label="Grade" 
                        required 
                        id="grade" 
                        type="text" 
                        autoWidth
                        value={climbToLog.grade_id} 
                        onChange={ (event) => setClimbToLog({...climbToLog, grade_id: event.target.value})}>
                            {/* get grades from redux and map to selector */}
                            <MenuItem>Select Your grade</MenuItem>
                            {limitGrades.map((grade) => {
                                return(
                                    <MenuItem key={grade.id} value={grade.id}>{grade.difficulty}</MenuItem>
                                )

                            })}
                </TextField>
                <Button type="submit">Log It!</Button>
            </form>
            // </FormControl>
            )}
            <Button onClick={() => history.goBack()}>Cancel</Button>
            <p>Grades: {JSON.stringify(limitGrades)}</p>
            
        </div>
    )
}

export default LogASend;