import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
const moment = require('moment');

// MUI styles here
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

function ClimbDetail() {
    const [value, setValue] = useState(4);
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
    }, [climbId])

    const logRoute = () => {
        // STRETCH TO DO: Navigate to log route page
        console.log('clicked log route!');
        alert("Okay, log the route!");
    }

    const deleteClimb = (id) => {
        console.log('confirmed delete climb: ', id);
        dispatch({ type: 'DELETE_CLIMB_TAG', payload: id });
        alert(`Deleted Climb: #${id}`);
        history.push(`/climbs/${gymId}/${styleId}`);
    }

    const toEditPage = () => {
        history.push(`/climbs/${gymId}/${styleId}/edit/${climbId}`);
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
            {/* <Box
                sx={{
                    '& > legend': { mt: 2 },
                }}
                >
                <Typography component="legend">Rating</Typography>
                <Rating
                    name="read-only"
                    max={4}
                    value={4}
                />
            </Box> */}
            <button onClick={ logRoute }>Log Your Send</button>
            {/* <button onClick={ confirmDelete } >Delete Climb</button> */}
            <button onClick={ toEditPage } >Edit Climb</button>
            <button  onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) deleteClimb(climbId) } }>
              Delete
            </button>
        </div>
    )

}

export default ClimbDetail;