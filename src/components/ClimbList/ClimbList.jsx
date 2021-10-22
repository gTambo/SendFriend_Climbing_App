import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams, Link, NavLink } from 'react-router-dom';

import ClimbTag from './ClimbTag';
import './ClimbList.css';

// Mui styles
import { Grid, Box, } from '@mui/material';

function ClimbList() {
    const history = useHistory();
    const dispatch = useDispatch();
    // useSelector to get climbs for render
    const reduxStore = useSelector(store => store);
    const { climbList } = reduxStore;
    // uses params to get gym id and style id selected on GymSelect page
    const { gymId, styleId } = useParams();

    useEffect( () => {
        dispatch({ type: 'FETCH_ALL_CLIMBS', payload: {gymId: gymId, styleId: styleId }});
        dispatch({ type: 'UNSET_COMMENTS'})
    }, [gymId, styleId])

    const addNewClimb = () => {
        history.push(`/climbs/${gymId}/${styleId}/addclimb`)
    }
    return(
        <div>
            <button onClick={ addNewClimb }>ADD A NEW CLIMB!</button>
            <p>list of climbs here</p>
            {/* {JSON.stringify(climbList)} */}
            <Grid container 
                direction="column"
                justifyContent="center"
                alignItems="flex-start">
                {climbList.map(climb => {
                    return(
                        <ClimbTag key={climb.id} gymId={gymId} styleId={styleId} climb={climb}/>
                    )
                })}
            </Grid>
        </div>
    )
}

export default ClimbList;