import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
const moment = require('moment');

// MaterialUI styling here

import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

function ClimbDetail() {
    const [value, setValue] = useState(4);
    // use dispatch to get details
    const dispatch = useDispatch();
    const history = useHistory();

    // use local state to store rating
    const [rating, setRating] = useState(0);
    //  use Selector to get details from redux
    const climbDetails = useSelector(store => store.climbDetails);
    // use params to get climb ID
    const { gymId, climbId, styleId } = useParams();
    const addDate = moment(climbDetails.date_added).format("dddd, MMMM, do YYYY");
    // On page load, get climb details, using id from params
    useEffect( () => {
        dispatch({ type: "FETCH_CLIMB_DETAILS", payload: {id: climbId}})
    }, [climbId])

    // useState returns a number
    let avgRating = parseInt(climbDetails.coalesce);
    let ratingToAdd = parseInt(rating);
    console.log("rating: ", rating);
    console.log("coalesce: ", avgRating);

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

    const rateClimb = (event) => {
        event.preventDefault();
        console.log('rating to add: ', rating);
        dispatch({ type: 'ADD_RATING', payload: {climb_id: climbId, rating: rating }});
        dispatch({ type: "FETCH_CLIMB_DETAILS", payload: {id: climbId}})
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
            <Typography component="legend">Current Rating</Typography>
            <Rating name="read-only" max={4} value={avgRating} readOnly />
            <p>Date added {addDate}</p>
            <p>Movement style: {climbDetails.movement_style}</p>
            {/* <label htmlFor="rating">Rate This Climb</label>
            <select name="rate-climb" 
                    id="rating" 
                    value={rating}
                    onChange={(event) => setRating(event.target.value)}
                >
                <option value="">select rating</option>
                <option value="1">1 star</option>
                <option value="2">2 stars</option>
                <option value="3">3 stars</option>
                <option value="4">4 stars</option>
            </select> */}
            <Box
                sx={{
                    '& > legend': { mt: 2 },
                }}
                >

                <Typography component="legend">Rate this climb!</Typography>
                <Rating
                    name="simple-controlled"
                    max={4}
                    value={ratingToAdd}
                    onChange={(event) => setRating(event.target.value)}
                />
            </Box>
            <button onClick={ rateClimb }>Save Rating</button>
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