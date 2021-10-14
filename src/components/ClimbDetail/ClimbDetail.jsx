import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

function ClimbDetail() {
    // use dispatch to get details
        const dispatch = useDispatch();
        const history = useHistory();
        //  use Selector to get details from redux
        const climbDetails = useSelector(store => store.climbDetails);
    // use params to get climb ID
    const { climbId } = useParams();

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
            {/* {JSON.stringify{climbDetails}} */}
            <button onClick={ logRoute }>Log Your Send</button>
            <button onClick={ () => history.goBack() }>Cancel</button>
        </div>
    )

}

export default ClimbDetail;