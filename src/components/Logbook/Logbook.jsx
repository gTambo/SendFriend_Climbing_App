import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
const moment = require('moment');


function Logbook() {
    const reduxStore = useSelector((store) => store);
    const { user } = reduxStore

    return(
        <div>
            <p>Welcome, {user.username}. This is your Logbook.</p>
            <table>
                <thead>
                    <tr>
                        <th>Here be a climb you climb'd</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>e.g.Red V4</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Logbook;