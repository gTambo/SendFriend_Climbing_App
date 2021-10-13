import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// To Do: import MUI Select components for dropdown

function GymForm () {
    // local state variables
    const [chosenGym, setChosenGym] = useState('');
    const [chosenStyle, setChosenStyle] = useState('');

    // TO DO: use (redux?) state to hold gym and climb style 
    const reduxStore = useSelector(store => store);
    const { gyms, climbStyles } = reduxStore;
    const dispatch = useDispatch();
    
    // STRETCH TO DO: Use selector to pull gym-specific information to populate select dropdowns
    // **STRETCH TODO: Add a gym

    useEffect( () => {
        dispatch({ type: 'FETCH_GYMS' })
        dispatch({ type: 'FETCH_CLIMB_STYLES'})
    }, [dispatch]);

    const handleSubmit = () => {
        console.log('Clicked Submit');

    }

    return(
        <div>
            <p>{JSON.stringify(gyms)}</p>
            <p>{JSON.stringify(climbStyles)}</p>
        <form className="entry-form" >
            <h2>Gym Selection</h2>
            <p>**gym selector here**</p>
            <select defaultValue="select a gym" 
                    onChange={ (event) => setChosenGym(event.target.value) }
            >
                <option>select a gym</option>
                {gyms.gymList.map(gym => {
                    return(
                        <option key={gym.id}
                                value={gym.name}
                        >
                            {gym.name}
                        </option>
                    )
                })}
            </select>
            <p>route style selector here</p>
            <select defaultValue="type of climbing"
                    onChange={ (event) => setChosenStyle(event.target.value) }
            >
                <option>type of climbing</option>
                {climbStyles.map(style => {
                    return(
                        <option key={style.id}
                                value={style.style}
                        >
                            {style.style}
                        </option>
                    )
                })}
            </select>
            <br/>
            <input type="submit" value="Submit" />
        </form>
        <ul>
            <li>Chosen Gym: {chosenGym}</li>
            <li>Chosen Style: {chosenStyle}</li>
        </ul>
        </div>
    )
}

export default GymForm;