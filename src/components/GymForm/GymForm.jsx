import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
// To Do: import MUI Select components for dropdown
import { Button } from '@mui/material';

function GymForm () {
    // local state variables
    const [chosenGym, setChosenGym] = useState('');
    const [chosenStyle, setChosenStyle] = useState('');

    // TO DO: use (redux?) state to hold gym and climb style 
    const reduxStore = useSelector(store => store);
    const { gyms, climbStyles } = reduxStore;
    const dispatch = useDispatch();
    const history = useHistory();
    
    // STRETCH TO DO: Use selector to pull gym-specific information to populate select dropdowns
    // **STRETCH TODO: Add a gym

    useEffect( () => {
        dispatch({ type: 'FETCH_GYMS' })
        dispatch({ type: 'FETCH_CLIMB_STYLES'})
    }, [dispatch]);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Clicked Submit');
        history.push(`/climbs/${chosenGym}/${chosenStyle}`);
    }

    return(
        <div>
            {/* <p>{JSON.stringify(gyms)}</p>
            <p>{JSON.stringify(climbStyles)}</p> */}
        <form className="entry-form" onSubmit={ handleSubmit }>
            <h3>Gym Name:</h3>
            
            <select defaultValue="select a gym" 
                    onChange={ (event) => setChosenGym(event.target.value) }
            >
                <option>select a gym</option>
                {gyms.gymList.map(gym => {
                    return(
                        <option key={gym.id}
                                value={gym.id}
                        >
                            {gym.name}
                        </option>
                    )
                })}
            </select>
            <h3>What type of climbing?</h3>
            <select defaultValue="type of climbing"
                    onChange={ (event) => setChosenStyle(event.target.value) }
            >
                <option>type of climbing</option>
                {climbStyles.map(style => {
                    return(
                        <option key={style.id}
                                value={style.id}
                        >
                            {style.style}
                        </option>
                    )
                })}
            </select>
            <br/>
            {/* <input type="submit" value="Submit" /> */}
            <Button type="submit" variant="outlined">Submit</Button>
        </form>
        {/* <ul>
            <li>Chosen Gym: {chosenGym}</li>
            <li>Chosen Style: {chosenStyle}</li>
        </ul> */}
        </div>
    )
}

export default GymForm;