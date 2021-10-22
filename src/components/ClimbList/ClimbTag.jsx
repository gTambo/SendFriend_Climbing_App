// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './ClimbList.css';

// MUI styles
import {
    Grid, 
    Box,
    Card,
    CardContent,
    CardMedia,
    Typography,
    CardActionArea,
    CardActions,
    Button,
    Fab,

 } from '@mui/material';

function ClimbTag({gymId, styleId, climb}) {
    //  use history to view details page
    const history = useHistory();

    let photoUrl;
    if(climb.thumb_url) {
        photoUrl = climb.thumb_url;
    } else {
        photoUrl = climb.photo;
    }

    const viewClimbDetails = () => {
        history.push(`/climbs/${gymId}/${styleId}/climbdetail/${climb.id}`)
    }

    return(
        <Grid item sx={12} >
            <Card>
                <CardActionArea onClick={ viewClimbDetails }>
                    
                    <CardContent>
                        <Typography> {climb.color} &nbsp; {climb.difficulty}</Typography>
                        <Typography></Typography></CardContent>
                    {/* <img className="small-photo" src={photoUrl} /> */}
                    <CardContent>
                        <CardMedia  component="img"
                        height="200"
                        maxWidth="200"
                        image={climb.photo}
                        alt="a photo" />
                    {/* <Button variant="outlined" onClick={ viewClimbDetails }>View Details</Button> */}
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    )
}

export default ClimbTag;