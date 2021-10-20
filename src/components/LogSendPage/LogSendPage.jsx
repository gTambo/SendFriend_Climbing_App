import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

function LogASend() {
    // get climbId from params
    const allParams = useParams();
    const climbId = allParams.climbId;

    // prepare dispatch and history
    const dispatch = useDispatch();
    const history = useHistory();

    // use local state object to store climb to log
    let defaultClimb = {
        climb_id: climbId,
        attempts: '',
    };
    const [climbToLog, setClimbToLog] = useState(defaultClimb)
    
    // handle form submission
    const addToLogbook = (event) => {
        event.preventDefault();
        dispatch({ type: })
    }

    return(
        <div>
            <p>log your send information here</p>
            <form onSubmit={addToLogbook}>
                <label htmlFor="attempts"></label>
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
            </form>
        </div>
    )
}

export default LogASend;