import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import AddComment from '../AddComments/AddComments';
import AddRating from '../AddRating/AddRating';
import './ClimbDetail.css';
const moment = require('moment');

// MaterialUI styling here

import { 
    Box, 
    Rating, 
    Typography, 
    TextField,
    Button, 
    Paper,
} from '@mui/material';


function ClimbDetail() {
    // use dispatch to get details
    const dispatch = useDispatch();
    const history = useHistory();

    // const [isContributor, setIsContributor] = useState(false);
    // const [comments, setComments] = useState([]);
    //  use Selector to get details from redux
    const reduxStore = useSelector(store => store);
    const { climbDetails, comments, user } = reduxStore;
    // use params to get climb ID
    const { gymId, climbId, styleId } = useParams();
    // use moment.js to make the date look nice
    const addDate = moment(climbDetails.date_added).format("MMMM DD, YYYY");
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


    const handleGoBack = () => {
        history.goBack();
        dispatch({ type: 'UNSET_DETAILS' });
    } 

    return(
        <Box sx={{margin: '1em'}}>
            <Button onClick={ handleGoBack }>Back to Climbs</Button>
            {/* {JSON.stringify(climbDetails)}
            Gym Id:{JSON.stringify(gymId)}
            Style Id:{JSON.stringify(styleId)} */}
            <br/>
            <img 
                  className="big-photo" 
                  src={climbDetails.photo} />
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
                            "{aComment.comment}" - {aComment.username}, {moment(aComment.created_at).format("MMMM DD, YYYY")}
                        </li>
                    )
                })}
            </ul>
            {/* <p>{JSON.stringify(comments)}</p> */}
            
            {/* <AddComment climbId={climbId} /> */}
            
            {/* <AddRating climbId={climbId} /> */}
            
            {checkUsername() ? (<p>You contributed this climb</p>) : (<p>Contribued by: {climbDetails.username}</p>)}
            <Box >
            
            <Button variant="outlined" onClick={ logRoute }>Log Your Send</Button>
            {/* <Button onClick={ confirmDelete } >Delete Climb</Button> */}
            <Button variant="outlined" onClick={ toEditPage } >Edit Climb Info</Button>
            <Button variant="outlined" onClick={ toEditPhoto }>Edit Photo</Button>
            {checkUsername() && (<Button variant="outlined" onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) deleteClimb() } }>
              Delete
            </Button>)}
            </Box>
            <Button onClick={ handleGoBack }>Back to Climbs</Button>
        </Box>
    )

}

export default ClimbDetail;