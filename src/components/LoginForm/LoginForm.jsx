import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import { 
  Button,
  Grid,
  Box,
  FormControl,
  InputLabel,
  Select,
  TextField,
  Typography,
  Paper,
} from '@mui/material';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    console.log('clicked log in');
    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
      <Paper className="login-form" elevation={6} style={{margin: '3em', 'paddingBottom': 30, paddingTop: 20}}>
      <Grid container 
            // rowSpacing={1} 
            // direction="column" 
            alignItems="center" 
            justifyContent="center"
            >
        <form  onSubmit={login}>
          <Grid item xs={6}><Typography variant="h4" style={{paddingBottom: 10}}>Login</Typography>
            {errors.loginMessage && (
              <h3 className="alert" role="alert">
                {errors.loginMessage}
              </h3>
            )}
          </Grid>
          <Grid item xs={12} style={{paddingBottom: '1em'}}>
            {/* <InputLabel htmlFor="username" > */}
             
              <TextField
                variant="outlined"
                type="text"
                name="username"
                label="Username"
                required
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            {/* </InputLabel> */}
          </Grid>
          <Grid item xs={12} style={{paddingBottom: '1em'}}>
            {/* <InputLabel htmlFor="password"> */}
              
              <TextField
                variant="outlined"
                type="password"
                name="password"
                label="Password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            {/* </InputLabel> */}
          </Grid>
          
          <Grid item xs={12} >
              {/* <div> */}
              <input className="btn" type="submit" name="submit" />
            <center><Button variant="contained" type="submit" name="submit" value="Log In">Log In</Button></center>
              {/* </div> */}
          </Grid>
          
        </form>
      </Grid>
      </Paper>
  );
}

export default LoginForm;
