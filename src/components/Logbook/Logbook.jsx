import React, { useState, useEffect } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
const moment = require('moment');


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
            <h2>Welcome, {user.username}. This is your Logbook.</h2>
            {/* {JSON.stringify(logbook)} */}
            <br/>
            <br/>
            <h4>Climbs you Climbed</h4>
            <table>
                <thead>
                    <tr>
                        <th>Edit</th>
                        <th>Grade</th>
                        <th>Color</th>
                        <th>Attempts</th>
                        <th>Style</th>
                        <th>Date Sent</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {logbook.map((log, index) => (<tr key={log.id}>
                        <td><button onClick={() => editRow(index, log.climb_id) }>Edit Row</button></td>
                        <td>{log.difficulty}</td>
                        <td>{log.color}</td>
                        <td>{log.attempts}</td>
                        <td>{log.style}</td>
                        <td>{moment(log.send_date).format('dddd, MMMM do YYYY')}</td>
                        <td><button onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) deleteRow(log.id) }}>Delete Row</button></td>
                    </tr>))}
                </tbody>
            </table>
            <button onClick={() => { handleBackToGym() } }>Back to Climb List</button>
        </div>
    )
}

export default Logbook;