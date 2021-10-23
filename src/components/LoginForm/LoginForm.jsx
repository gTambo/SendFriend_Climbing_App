import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import { 
  Button,
  Grid,
  Box,
} from '@mui/material';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

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
    <Box>
      <Grid container alignItems="center" justifyContent="center">
        <form className="formPanel" onSubmit={login}>
          <Grid item><h2>Login</h2>
            {errors.loginMessage && (
              <h3 className="alert" role="alert">
                {errors.loginMessage}
              </h3>
            )}
          </Grid>
          <Grid item>
            <label htmlFor="username">
              Username:
              <input
                type="text"
                name="username"
                required
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </label>
          </Grid>
          <Grid item>
            <label htmlFor="password">
              Password:
              <input
                type="password"
                name="password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </label>
          </Grid>
          <Box justifyContent="center">
            <Grid item alignItems="center" justifyContent="center">
              {/* <div> */}
              {/* <input className="btn" type="submit" name="submit" /> */}
              <center><Button variant="contained" type="submit" name="submit" value="Log In">Doo-doo</Button></center>
              {/* </div> */}
            </Grid>
          </Box>
        </form>
      </Grid>
    </Box>
  );
}

export default LoginForm;
