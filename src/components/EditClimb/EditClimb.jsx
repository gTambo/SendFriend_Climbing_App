import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import EditClimbForm from './EditClimbForm';

import { Button, Box } from '@mui/material';

function EditClimb() {
    // get params to navigate back to climblist on success
    const allParams = useParams();
    const { gymId, styleId, climbId } = allParams;
    const climbDetails = useSelector(store => store.climbDetails);
    // use local state to set object with edits
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect( () => {
        dispatch({ type: "FETCH_CLIMB_DETAILS", payload: {id: climbId}});
    }, [])


    return(
        <Box sx={{margin: '1em'}}>
            <h1>Update This Tag!</h1>
            <EditClimbForm  gymId={gymId} styleId={styleId} climbId={climbId} climb={climbDetails}/>
            <Button variant="outlined" onClick={ () => history.goBack() }>Cancel Edits</Button>
        </Box>
    )
}

export default EditClimb;