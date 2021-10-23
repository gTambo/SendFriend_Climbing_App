import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
// To Do: import MUI Select components for dropdown
import { 
    Button,
    TextField,
    Select,
    InputLabel,
    MenuItem,
    Box,
    FormControl, 
} from '@mui/material';

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
        dispatch({ type: 'SET_GYM_CHOICE', payload: {gymId: chosenGym, styleId: chosenStyle}})
        history.push(`/climbs/${chosenGym}/${chosenStyle}`);
    }

    return(
        <Box>
            {/* <p>{JSON.stringify(gyms)}</p>
            <p>{JSON.stringify(climbStyles)}</p> */}
        <FormControl className="entry-form" onSubmit={ handleSubmit }>
            <h3>Gym Name:</h3>
            
            <Select defaultValue="select a gym" 
                    onChange={ (event) => setChosenGym(event.target.value) }
            >
                <MenuItem>select a gym</MenuItem>
                {gyms.gymList.map(gym => {
                    return(
                        <MenuItem key={gym.id}
                                value={gym.id}
                        >
                            {gym.name}
                        </MenuItem>
                    )
                })}
            </Select>
            <h3>What type of climbing?</h3>
            <Select defaultValue="type of climbing"
                    onChange={ (event) => setChosenStyle(event.target.value) }
            >
                <MenuItem>type of climbing</MenuItem>
                {climbStyles.map(style => {
                    return(
                        <MenuItem key={style.id}
                                value={style.id}
                        >
                            {style.style}
                        </MenuItem>
                    )
                })}
            </Select>
            <br/>
            {/* <input type="submit" value="Submit" /> */}
            <Button type="submit" variant="outlined">Submit</Button>
        </FormControl>
        {/* <ul>
            <li>Chosen Gym: {chosenGym}</li>
            <li>Chosen Style: {chosenStyle}</li>
        </ul> */}
        </Box>
    )
}

export default GymForm;