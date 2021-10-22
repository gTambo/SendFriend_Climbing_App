import React, { useState, useEffect } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
const moment = require('moment');


function Logbook() {
    const reduxStore = useSelector((store) => store);
    const { user, logbook } = reduxStore;
    // 
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect( () => {
        dispatch({ type: 'FETCH_LOGBOOK' });
    }, []);

    const editRow = () => {
        console.log('okay, edit row');
        // dispatch something
    }

    const deleteRow = () => {
        console.log('Okay, delete row');
        // dispatch something
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
                    {logbook.map(log => (<tr key={log.id}>
                        <td><button onClick={ editRow }>Edit Row</button></td>
                        <td>{log.difficulty}</td>
                        <td>{log.color}</td>
                        <td>{log.attempts}</td>
                        <td>{log.style}</td>
                        <td>{moment(log.send_date).format('dddd, MMMM do YYYY')}</td>
                        <td><button onClick={ deleteRow }>Delete Row</button></td>
                    </tr>))}
                </tbody>
            </table>
        </div>
    )
}

export default Logbook;