import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import ClimbTag from './ClimbTag';

function ClimbList() {

    const dispatch = useDispatch();
    // useSelector to get climbs for render
    const reduxStore = useSelector(store => store);
    const { climbList } = reduxStore;
    // uses params to get gym id and style id selected on GymSelect page
    const { gymId, styleId } = useParams();

    useEffect( () => {
        dispatch({ type: 'FETCH_ALL_CLIMBS', payload: {gymId: gymId, styleId: styleId }})
    }, [dispatch])
    return(
        <div>
            <p>list of climbs here</p>
            {JSON.stringify(gymId)}
            {JSON.stringify(styleId)}
            {JSON.stringify(climbList)}
            <ul>
                <ClimbTag />
            </ul>
        </div>
    )
}

export default ClimbList;