import React, { useState, useEffect } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
const moment = require('moment');

import { 
    Typography, 
    Table, 
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button, 
} from '@mui/material';

function Logbook() {
    const reduxStore = useSelector((store) => store);
    const { user, logbook, gymChoice } = reduxStore;
    // 
    const dispatch = useDispatch();
    const history = useHistory();
    

    useEffect( () => {
        dispatch({ type: 'FETCH_LOGBOOK' });
    }, [dispatch]);

    const editRow = (rowIndex, climbId) => {
        console.log('okay, edit row', rowIndex);
        // dispatch something
        // dispatch({ type: 'EDIT_LOGGED_CLIMB', payload: {id: rowId} });
        
        dispatch({ type: 'SET_CLIMB_ID', payload: {id: climbId} });
        dispatch({ type: 'UNSET_GRADES' });
        dispatch({ type: 'FETCH_CLIMB_DETAILS', payload: {id: climbId} });
        history.push(`/logbook/edit/${rowIndex}`);
    }

    const deleteRow = (rowId) => {
        console.log('Okay, delete row', rowId);
        // dispatch something
        dispatch({ type: 'DELETE_LOGGED_CLIMB', payload: {id: rowId} });
    }

    const handleBackToGym = () => {
        // event.preventDefault();
        console.log('gymId: ', gymChoice.gymId, 'styleId: ', gymChoice.styleId);
        if (gymChoice.gymId != '') {
            history.push(`/climbs/${gymChoice.gymId}/${gymChoice.styleId}`);
        } else {
            history.push('/gym');
        }
    }

    return(
        <div>
            <Typography variant="h3" component="h3">Welcome, {user.username}. This is your Logbook.</Typography>
            {/* {JSON.stringify(logbook)} */}
            <br/>
            <br/>
            <h4>Climbs you Climbed</h4>
            <TableContainer  sx={{backgroundColor: '#ffca58', border: '2px solid #0872af', marginBottom: '1em'}}>
            <Table>
                <TableHead >
                    <TableRow  >
                        <TableCell>Edit</TableCell>
                        <TableCell>Grade</TableCell>
                        <TableCell>Color</TableCell>
                        <TableCell>Attempts</TableCell>
                        <TableCell>Style</TableCell>
                        <TableCell>Date Sent</TableCell>
                        <TableCell>Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {logbook.map((log, index) => (<TableRow gutterBottom key={log.id}>
                        <TableCell><Button onClick={() => editRow(index, log.climb_id) }>Edit Row</Button></TableCell>
                        <TableCell>{log.difficulty}</TableCell>
                        <TableCell>{log.color}</TableCell>
                        <TableCell>{log.attempts}</TableCell>
                        <TableCell>{log.style}</TableCell>
                        <TableCell>{moment(log.send_date).format('dddd, MMMM do YYYY')}</TableCell>
                        <TableCell><Button onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) deleteRow(log.id) }}>Delete Row</Button></TableCell>
                    </TableRow>))}
                </TableBody>
            </Table>
            </TableContainer>
            <Button variant="contained" onClick={() => { handleBackToGym() } }>Back to Climb List</Button>
        </div>
    )
}

export default Logbook;