import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { 
    Button, 
    Box, 
    TextField 
} from '@mui/material';
function AddComment({newComment, setNewComment}) {
    // const dispatch = useDispatch();

    // use local state to store comments
    // const [newComment, setNewComment] = useState('');


    // const addNewComment = (event) => {
    //     event.preventDefault();
    //     console.log('new comment: ', newComment);
    //     dispatch({ type: 'ADD_COMMENT', payload: {climb_id: climbId, comment: newComment }});
    //     setNewComment('');
    //     dispatch({ type: "FETCH_CLIMB_DETAILS", payload: {id: climbId}});
    // }

    return(
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
                {/* <Button variant="text" onClick={ addNewComment } >Save Comment</Button> */}
            </Box>
    )
}

export default AddComment;