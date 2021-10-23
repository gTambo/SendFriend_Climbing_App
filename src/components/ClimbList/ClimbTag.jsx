// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './ClimbList.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

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
    Paper,
    CircularProgress,
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

    // variables to wait for data arriveal, to be used for contditional render on page load
    const showItem = climb ? true : false;

    return(
        <Grid item container direction="row" xs={12} >
            {!showItem && <CircularProgress />}
            {showItem && (
                <Card fullWidth
                    elevation={3}
                    variant="elevation"
                    sx={{ display: 'flex' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row' }} >
                        <Paper elevation={3} xs={12} sx={{backgroundColor: '#ffffff' }}>
                            <CardActionArea onClick={viewClimbDetails} sx={{ flex: '1 0 auto' }}>
                                {/* <Grid item xs={3}> */}
                                <CardContent >
                                    <Box sx={{display: 'flex', }} 
                                         direction="row" 
                                         justifyContent="space-around">
                                        <Typography variant="h3" element='h3' sx={{ color: '#70d0d9', 'text-shadow': 'black', backgroundColor: `${climb.color}` }}>
                                            {climb.color}
                                        </Typography>
                                        <Typography variant="h3" 
                                                    element='h3' >
                                            {climb.difficulty}
                                        </Typography>
                                    </Box>
                                
                                    
                                </CardContent>
                                {/* </Grid> */}
                                {/* <Grid item xs={6}> */}
                                <CardContent>
                                    <CardMedia component="img"
                                        sx={{ width: '17em' }}
                                        // height="200"
                                        // width="200em"
                                        image={climb.photo}
                                        alt="a photo of a climb" />
                                    {/* <Button variant="outlined" onClick={ viewClimbDetails }>View Details</Button> */}
                                </CardContent>
                                {/* </Grid> */}
                            </CardActionArea>
                        </Paper>
                    </Box>
            </Card>)
        }
        </Grid >
    )
}

export default ClimbTag;