import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

// import { 
//     Button,
//     Select,
//     InputLabel,
//     MenuItem,
//     Box,
//     FormControl, 
// } from '@mui/material';

function EditASend() {
    // get climbId from params
    const allParams = useParams();
    const rowIndex = allParams.id;

    // get climb details from redux
    const reduxStore = useSelector(store => store);
    const { limitGrades, climbDetails, logbook, newClimb } = reduxStore;
    // prepare dispatch and history
    const dispatch = useDispatch();
    const history = useHistory();
    
    const climbId = logbook[rowIndex].climb_id;
    console.log('Climb id: ', climbId);

    let gradeId = climbDetails.grade_id;
    // use local state object to store climb to log
    // set default climb from logbook
    let defaultClimb = logbook[rowIndex];
    console.log('Default Climb: ', defaultClimb);
    const [climbToLog, setClimbToLog] = useState(defaultClimb)
    
    // get grades on page load
    useEffect(() => {
        dispatch({ type: 'FETCH_CLIMB_DETAILS', payload: {id: climbId} })
        console.log('grade_id, expecting an integer: ', gradeId);
        dispatch({ type: 'GET_THESE_GRADES', payload: {id: gradeId}})
    }, [dispatch])

    // handle form submission
    const logASend = (event) => {
        event.preventDefault();
        console.log('Sending to logbook saga for edit:', climbToLog);
        dispatch({ type: 'EDIT_LOGGED_CLIMB', payload: climbToLog });
        history.push('/logbook');
    }

    return(
        <div>
            <h2>You are editing this logged climb:</h2>
            <p>Climb details: {JSON.stringify(climbDetails)}</p>
            <p>{climbDetails.color}, &nbsp; {climbDetails.difficulty}</p>
            <p>at {climbDetails.name}</p>
            <form onSubmit={logASend}>
                <label htmlFor="attempts">How many atempts this session?</label>
                <select id="attempts" 
                        type="text" 
                        value={climbToLog.attempts} 
                        onChange={ (event) => setClimbToLog({...climbToLog, attempts: event.target.value}) }>
                    <option value="">Number of attempts</option>
                    <option value="flash">flash</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="over 4">Over 4</option>
                </select>
                <br/>
                <label htmlFor=""></label>
                <label htmlFor="grade">What grade would you give it?</label> 
                <select name="grade" 
                        required 
                        id="grade" 
                        type="text" 
                        value={climbToLog.grade_id} 
                        onChange={ (event) => setClimbToLog({...climbToLog, grade_id: event.target.value})}>
                            {/* get grades from redux and map to selector */}
                            <option>Select Your grade</option>
                            {limitGrades.map((grade) => {
                                return(
                                    <option key={grade.id} value={grade.id}>{grade.difficulty}</option>
                                )

                            })}
                </select>
                <input type="submit" value="Save Edit!" />
            </form>
            <button onClick={() => history.goBack()}>Cancel</button>
            <p>Grades: {JSON.stringify(limitGrades)}</p>
        </div>
    )
}

export default EditASend;