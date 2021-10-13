import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// To Do: import MUI Select components for dropdown

function GymForm () {
    // TO DO: use (redux?) state to hold gym and climb style 
    // STRETCH TO DO: Use selector to pull gym-specific information to populate select dropdowns
    const dispatch = useDispatch();

    const handleSubmit = () => {
        console.log('Clicked Submit');
    }

    return(
        <form className="entry-form" >
            <h2>Gym Selection</h2>
            <p>**gym selector here**</p>
            <select defaultValue="select a gym">
                <option>select a gym</option>
                <option>Baoulder Gym</option>
            </select>
            <p>route style selector here</p>
            <select defaultValue="type of climbing">
                <option>type of climbing</option>
                <option value="boulder">Baouldering</option>
            </select>
        </form>
    )
}

export default GymForm;