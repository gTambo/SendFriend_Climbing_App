import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams, Link, NavLink } from 'react-router-dom';

import ClimbTag from './ClimbTag';
import './ClimbList.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// Mui styles
import { 
    Grid, 
    Box,
    Paper,
    Typography,
    LinearProgress,
    Button,
    
} from '@mui/material';

import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

function ClimbList(props) {
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
                <Box fullWidth sx={{ margin: '1em', width: '100%' }}>
                    
                    <Grid container direction="row" justifyContent="space-between" >
                        <Grid item xs={6} >
                            <Paper elevation={3} sx={{marginBottom: '1em'}}>
                                <Typography variant="body1" style={{ padding: '0.5em', "backgroundColor": '#0872af', "color": '#ffca58' }}>
                                    Viewing {styleName}s at {gymName}
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={3} >
                            <Paper elevation={2} marginright='1.5em' >
                                <Typography variant="body2" sx={{ "fontStyle": "italic", color: '#7a7a7a', textAlign: 'center'}}>
                                    Total: {climbList.length} climbs
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>

                    <Button variant="outlined" color="secondary" sx={{marginBottom: '1em'}} onClick={addNewClimb}>ADD A NEW CLIMB!</Button>
                    
                    <Box sx={{display: 'flex'}}><Typography variant="body1" sx={{ "fontStyle": "italic", color: '#7a7a7a'}}>Click Tag for details<ArrowDownwardIcon/></Typography></Box>
                    
                </Box>
                
            )}
            {/* {JSON.stringify(climbList)} */}
            {!showList && <LinearProgress />}
            {showList && (
                <Grid container 
                      sx={{marginLeft: '1em'}}
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