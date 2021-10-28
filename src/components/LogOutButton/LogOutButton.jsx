import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Button from '@mui/material/Button';

function LogOutButton(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    history.push('/');
  }

  return (
    <Button
      variant="contained"
      // This button shows up in multiple locations and is styled differently
      // because it's styled differently depending on where it is used, the className
      // is passed to it from it's parents through React props
      className={props.className}
      onClick={handleLogout}
    >
      Log Out
    </Button>
  );
}

export default LogOutButton;
