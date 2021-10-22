import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import './ClimbDetail.css';
const moment = require('moment');

// MaterialUI styling here

import { 
    Box, 
    Rating, 
    Typography, 
    TextField,
    Button, 
} from '@mui/material';


function ClimbDetail() {
    // use dispatch to get details
    const dispatch = useDispatch();
    const history = useHistory();

    // use local state to store rating, comments
    const [rating, setRating] = useState(0);
    const [newComment, setNewComment] = useState('');
    // const [isContributor, setIsContributor] = useState(false);
    // const [comments, setComments] = useState([]);
    //  use Selector to get details from redux
    const reduxStore = useSelector(store => store);
    const { climbDetails, comments, user } = reduxStore;
    // use params to get climb ID
    const { gymId, climbId, styleId } = useParams();
    // use moment.js to make the date look nice
    const addDate = moment(climbDetails.date_added).format("MMMM, YYYY");
    // On page load, get climb details, using id from params
    useEffect( () => {
        dispatch({ type: "FETCH_CLIMB_DETAILS", payload: {id: climbId}});
        dispatch({ type: 'FETCH_COMMENTS', payload: climbId });
        // setComments(climbDetails.comment);
        // commentsRefresh
    }, [climbId])

    // useState returns a number
    // const commentsRefresh = () => {
    //     setComments(climbDetails.comment);
    // }
    let avgRating = parseInt(climbDetails.coalesce);
    let ratingToAdd = parseInt(rating);

    // Compare logged in user to climb contributor
    const checkUsername = () => {
        if (user.username === climbDetails.username) {
            return true;
        } else {
            return false;
        }
    }

    const logRoute = () => {
        // STRETCH TO DO: Navigate to log route page
        console.log('clicked log route!');
        dispatch({ type: 'UNSET_GRADES' });
        history.push(`/climbs/${gymId}/${styleId}/logsend/${climbId}`);
    }

    const deleteClimb = () => {
        console.log('clicked delete climb: ', climbId);
        dispatch({ type: 'DELETE_CLIMB_TAG', payload: {idToDelete: climbId, gymId: gymId, styleId: styleId}});
        // alert(`Deleted Climb: #${id}`);
        history.push(`/climbs/${gymId}/${styleId}`);
    }

    const toEditPage = () => {
        history.push(`/climbs/${gymId}/${styleId}/edit/${climbId}`);
    }

    const toEditPhoto = () => {
        dispatch({ type: 'SET_CLIMB_ID', payload: {id: climbId} });
        history.push(`/climbs/${gymId}/${styleId}/addPhoto`);
    }

    const rateClimb = (event) => {
        event.preventDefault();
        console.log('rating to add: ', rating);
        dispatch({ type: 'ADD_RATING', payload: {climb_id: climbId, rating: rating }});
        setRating(0);
        dispatch({ type: "FETCH_CLIMB_DETAILS", payload: {id: climbId}});
    }

    const addNewComment = (event) => {
        event.preventDefault();
        console.log('new comment: ', newComment);
        dispatch({ type: 'ADD_COMMENT', payload: {climb_id: climbId, comment: newComment }});
        setNewComment('');
        dispatch({ type: "FETCH_CLIMB_DETAILS", payload: {id: climbId}});
    }

    const handleGoBack = () => {
        history.goBack();
        dispatch({ type: 'UNSET_DETAILS' });
    } 

    return(
        <div>
            <p>Details here</p>
            <button onClick={ handleGoBack }>Back to Climbs</button>
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
            <label htmlFor="comments-field">Comments:</label>
            <ul className="comments" id="comments-field">
                {comments.map((aComment, i) => {
                    return(
                        <li key={aComment.id}>
                            "{aComment.comment}" - {aComment.username}, {moment(aComment.created_at).format("MMMM do YYYY")}
                        </li>
                    )
                })}
            </ul>
            {/* <p>{JSON.stringify(comments)}</p> */}
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
                >
                <TextField 
                            id="filled-basic" 
                            label="Leave a Comment" 
                            variant="filled" 
                            value={newComment}
                            onChange={ (event) => setNewComment(event.target.value) }
                />
                <Button onClick={ addNewComment } >Save Comment</Button>
            </Box>
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
            {checkUsername() ? (<p>You contributed this climb</p>) : (<p>Contribued by: {climbDetails.username}</p>)}
            <button onClick={ rateClimb }>Save Rating</button>
            <button onClick={ logRoute }>Log Your Send</button>
            {/* <button onClick={ confirmDelete } >Delete Climb</button> */}
            <button onClick={ toEditPage } >Edit Climb Info</button>
            <button onClick={ toEditPhoto }>Edit Photo</button>
            {checkUsername() && (<button  onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) deleteClimb() } }>
              Delete
            </button>)}
        </div>
    )

}

export default ClimbDetail;