import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
const moment = require('moment');


function ClimbDetail() {
    // use dispatch to get details
        const dispatch = useDispatch();
        const history = useHistory();
        //  use Selector to get details from redux
        const climbDetails = useSelector(store => store.climbDetails);
    // use params to get climb ID
    const { gymId, climbId, styleId } = useParams();
    const addDate = moment(climbDetails.date_added).format("dddd, MMMM, do YYYY");
    // On page load, get climb details, using id from params
    useEffect( () => {
        dispatch({ type: "FETCH_CLIMB_DETAILS", payload: {id: climbId}})
    }, [])

    const logRoute = () => {
        // STRETCH TO DO: Navigate to log route page
        console.log('clicked log route!');
        alert("Okay, log the route!");
    }

    return(
        <div>
            <p>Details here</p>
            <button onClick={ () => history.goBack() }>Back to Climbs</button>
            {/* {JSON.stringify(climbDetails)}
            Gym Id:{JSON.stringify(gymId)}
            Style Id:{JSON.stringify(styleId)} */}
            <img className="big-photo" src={climbDetails.photo} />
            <p>Grade: {climbDetails.difficulty}</p>
            <p>Color: {climbDetails.color}</p>
            <p>Date added {addDate}</p>
            <p>Movement style: {climbDetails.movement_style}</p>

            <button onClick={ logRoute }>Log Your Send</button>
            <button>Delete Climb</button>
            <button>Edit Climb</button>
            
        </div>
    )

}

export default ClimbDetail;