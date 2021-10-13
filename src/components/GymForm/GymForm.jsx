import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// To Do: import MUI Select components for dropdown

function GymForm () {
    // local state variables
    const [chosenGym, setChosenGym] = useState('');
    const [chosenStyle, setChosenStyle] = useState('');

    // TO DO: use (redux?) state to hold gym and climb style 
    const gyms = useSelector(store => store.gyms);
    const dispatch = useDispatch();
    // const { gyms } = reduxStore;
    // STRETCH TO DO: Use selector to pull gym-specific information to populate select dropdowns
    // **STRETCH TODO: Add a gym

    useEffect( () => {
        dispatch({ type: 'FETCH_GYMS' })
    }, [dispatch]);

    const handleSubmit = () => {
        console.log('Clicked Submit');
    }

    return(
        <div>
            <p>{JSON.stringify(gyms)}</p>
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
                                value={gym.id}
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
                <option value="boulder">Baouldering</option>
            </select>
        </form>
        </div>
    )
}

export default GymForm;