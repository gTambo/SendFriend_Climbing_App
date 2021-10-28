import React, {useState} from 'react';
import { useDispatch } from 'react-redux';

import {
    Box,
    Rating,
    Typography,
    Button
} from '@mui/material';

function AddRating({ratingToAdd, setRating}) {
    // const dispatch = useDispatch();

    // use local state to store rating
    // const [rating, setRating] = useState(0);
    // let ratingToAdd = parseInt(rating);

    // const rateClimb = (event) => {
    //     event.preventDefault();
    //     console.log('rating to add: ', rating);
    //     dispatch({ type: 'ADD_RATING', payload: {climb_id: climbId, rating: rating }});
    //     setRating(0);
    //     dispatch({ type: "FETCH_CLIMB_DETAILS", payload: {id: climbId}});
    // }

    return(
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
                {/* <Button variant="text" onClick={ rateClimb }>Save Rating</Button> */}
            </Box>
    )
} 

export default AddRating;