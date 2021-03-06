import React, { useState, useEffect, } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams, Link, NavLink } from 'react-router-dom';

import ClimbTag from './ClimbTag';
import './ClimbList.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { makeStyles } from '@mui/styles'; 

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

const useStyles = makeStyles({
    gridItem: {
        display: 'flex',
        marginTop: 10,
        marginBottom: 10,
        display: 'block',
    }
})

function ClimbList(props) {
    const classes = useStyles();
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
    // console.log('gym: ', gymName, ', style: ', styleName);

    const addNewClimb = () => {
        history.push(`/climbs/${gymId}/${styleId}/addclimb`)
    }

    // variables to wait for data arriveal, to be used for contditional render on page load
    const showHeader = (gymName === '') ? false : true;
    const showList = climbList ? true : false;
    const noClimbs = () => { 
        if(climbList[0].name === 0){
            return true;
         } else {
          return false;
        }
    }

    return(
        <>
        {noClimbs && (
        <div style={{display: 'flex', alignItmes: 'center', justifyContent: 'center'}}>
            <h4>{climbList[0].message}</h4>
        </div>) }
        <div>
            {!showHeader && <LinearProgress />}
            {showHeader && (
                <Box key={'yougetakey!'} sx={{ margin: '1em', }}>
                    
                    <Grid key={'andYOUgetakey!'} container direction="row" justifyContent="space-between"  >
                        <Grid item xs={6} key={'asdfohjg'}>
                            <Paper key={'fasldjnla;'} elevation={3} sx={{marginBottom: '1em'}}>
                                <Typography key={'bhctsgtj'} variant="body1" style={{ padding: '0.5em', "backgroundColor": '#0872af', "color": '#ffca58', fontSize: '1.4em' }}>
                                    Viewing {styleName}s at {gymName}
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid key={'byebyewarning'} item xs={3} >
                            <Paper key={'everychild'} elevation={2} marginright='1.5em' >
                                <Typography key={'nochildleftbehind'} variant="body2" sx={{ "fontStyle": "italic", color: '#7a7a7a', textAlign: 'center'}}>
                                    Total: {climbList.length} climbs
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>

                    <Button key={'keysallaround'} variant="contained" color="warning" sx={{marginBottom: '1em'}} onClick={addNewClimb}>ADD A NEW CLIMB!</Button>
                    
                    <Box key={'thismightalsobeachild'} sx={{display: 'flex'}}><Typography variant="body1" sx={{ "fontStyle": "italic", color: '#7a7a7a'}}>Click Tag for details<ArrowDownwardIcon/></Typography></Box>
                    
                </Box>
                
            )}
            {/* {JSON.stringify(climbList)} */}
            {!showList && <LinearProgress />}
            {showList && (
                <Grid container 
                key={'parentsgetkeystoo'}
                      sx={{margin: 'auto', display: 'flex' }}
                      direction="column"
                      justifyContent="center"
                      alignItems="center"
                      rowSpacing={1}
                >
                {climbList.map((climb, i) => {
                    return(
                        <ClimbTag key={i, climb.id} gymId={gymId} styleId={styleId} climb={climb}/>
                    )
                })}
            </Grid>)}
        </div>
    </>)
}

export default ClimbList;