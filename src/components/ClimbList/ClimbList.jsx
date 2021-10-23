import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams, Link, NavLink } from 'react-router-dom';

import ClimbTag from './ClimbTag';
import './ClimbList.css';

// Mui styles
import { 
    Grid, 
    Box,
    Paper,
    Typography,
    LinearProgress
} from '@mui/material';

function ClimbList() {
    const history = useHistory();
    const dispatch = useDispatch();
    // useSelector to get climbs for render
    const reduxStore = useSelector(store => store);
    const { climbList } = reduxStore;
    // uses params to get gym id and style id selected on GymSelect page
    const { gymId, styleId } = useParams();


    useEffect( () => {
        dispatch({ type: 'UNSET_COMMENTS'});
        dispatch({ type: 'FETCH_ALL_CLIMBS', payload: {gymId: gymId, styleId: styleId }});
    }, [gymId, styleId])

    const gymName = climbList[0].name;
    const styleName = climbList[0].style;
    console.log('gym: ', gymName, ', style: ', styleName);

    const addNewClimb = () => {
        history.push(`/climbs/${gymId}/${styleId}/addclimb`)
    }

    // variables to wait for data arriveal, to be used for contditional render on page load
    const showHeader = (gymName === '') ? false : true;
    const showList = climbList ? true : false;

    return(
        <div>
            {!showHeader && <LinearProgress />}
            {showHeader && (
                <Box sx={{ width: '100%' }}>
                    <button onClick={addNewClimb}>ADD A NEW CLIMB!</button>
                    <Grid container direction="row" justifyContent="space-between">
                        <Grid item sx={6} >
                            <Paper elevation={3}>
                                <Typography variant="h5" style={{ "backgroundColor": '#0872af', "color": '#ffca58' }}>
                                    {styleName}s at {gymName}
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item sx={6} style={{ "fontStyle": "italic" }}>
                            <Paper elevation={3}>
                                <Typography component="p">
                                    viewing: {climbList.length} climbs
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
            )}
            {/* {JSON.stringify(climbList)} */}
            {!showList && <LinearProgress />}
            {showList && (<Grid container 
                direction="column"
                justifyContent="center"
                alignItems="flex-start"
                spacing={2}
                >
                {climbList.map(climb => {
                    return(
                        <ClimbTag key={climb.id} gymId={gymId} styleId={styleId} climb={climb}/>
                    )
                })}
            </Grid>)}
        </div>
    )
}

export default ClimbList;