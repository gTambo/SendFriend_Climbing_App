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
    FormControlLabel,
    LinearProgress,
    Container,
    OutlinedInput,
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

    const showGyms = gyms ? true : false;

    return(
        <>
        {!showGyms && <LinearProgress key={'zed'} />}
        {showGyms && (<Box key={'nada'}>
            {/* <p>{JSON.stringify(gyms)}</p>
            <p>{JSON.stringify(climbStyles)}</p> */}
        <form onSubmit={ handleSubmit } 
              className="gym-form" 
              >
            <FormControl margin="normal" 
                         
                         color="primary"  
                         fullWidth >
            {/* <h3>Gym Name:</h3> */}
            {/* <InputLabel htmlFor="gym-select" id="gym-select-label">Gym</InputLabel> */}
            <TextField select
                    variant="standard"
                    // labelId="gym-select-label"
                    id="gym-select"
                    label="Gym" 
                    input={<OutlinedInput label="Gym"/>}
                    // style={{marginBottom: '1em'}}
                    value={chosenGym}
                    onChange={ (event) => setChosenGym(event.target.value) }
            >
                <MenuItem key={'gmslctopt0'} >-select a gym-</MenuItem>
                {gyms.gymList.map((gym, i) => {
                    return(
                        <MenuItem key={i, gym.id}
                                value={gym.id}
                        >
                            {gym.name}
                        </MenuItem>
                    )
                })}
            </TextField>

            </FormControl>
            <FormControl margin="normal" 
                         color="secondary"  
                         fullWidth>
            {/* <h3>What type of climbing?</h3> */}
            <br/>
            {/* <InputLabel htmlFor="style-select" id="style-select-label">Climbing Style</InputLabel> */}
            <TextField select
                    variant="standard"
                    // labelId="style-select-label"
                    id="style-select"
                    label="Climbing Style"
                    input={<OutlinedInput label="Climbing Style"/>}
                    value={chosenStyle}
                    onChange={ (event) => setChosenStyle(event.target.value) }
            >
                <MenuItem key={'rtmiky0'} >-select a style-</MenuItem>
                {climbStyles.map((style, i) => {
                    return(
                        <MenuItem key={i, style.id}
                                value={style.id}
                        >
                            {style.style}
                        </MenuItem>
                    )
                })}
            </TextField>

            </FormControl>
            <br/>
            {/* <input type="submit" value="Submit" /> */}
            <Button type="submit" variant="outlined" >Submit</Button>
        
        </form>
        
        </Box>)}
        </>
    )
}

export default GymForm;