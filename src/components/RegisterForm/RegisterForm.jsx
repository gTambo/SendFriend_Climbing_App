import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Moment.js
const moment = require('moment');


function RegisterForm() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [hometown, setHometown] = useState('');
  const [climbingExp, setClimbingExp] = useState('')
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
        hometown: hometown,
        climbing_start_date: climbingExp,
      },
    });
  }; // end registerUser

  return (
    <form className="formPanel" onSubmit={registerUser}>
      <h2>Register User</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div>
        <label htmlFor="username">
          Username:
          <input
            type="text"
            name="username"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="hometown">
          Hometown:
          <input
            type="text"
            name="hometown"
            value={hometown}
            required
            onChange={(event) => setHometown(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="climbing-experience">
          When did you start climbing?
          <input
            type="date"
            min="1921-01-01"
            name="climbing-experience"
            value={climbingExp}
            required
            onChange={(event) => setClimbingExp(event.target.value)}
          />
        </label>
      </div>
      <div>
        <input className="btn" type="submit" name="submit" value="Register" />
      </div>
    </form>
  );
}

export default RegisterForm;
