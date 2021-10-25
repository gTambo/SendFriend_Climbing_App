import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';

import {
  IconButton,
  Button, 
  Menu, 
  MenuItem,
  Box,
} from '@mui/material';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

function Nav() {
  const user = useSelector((store) => store.user);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">SendFriend</h2>
      </Link>
      <Box sx={{color: 'white'}}>
      
      <IconButton aria-label="menu"
        variant="contained"
        color="primary"
        id="demo-positioned-button"
        aria-controls="demo-positioned-menu"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MenuRoundedIcon sx={{color: '#ffca58'}}/>
      </IconButton>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem> */}

      
      <div>
        {/* If no user is logged in, show these links */}
        {user.id === null &&
          // If there's no user, show login/registration links
          <MenuItem>
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
          </MenuItem>
        }

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
          <MenuItem sx={{displiay: 'flex'}}>
            <Link className="navLink" to="/user">
              Profile
            </Link>
          </MenuItem>
          <MenuItem>
            <Link className="navLink" to="/logbook">
              Logbook
            </Link>
          </MenuItem>
          <MenuItem>
            <Link className="navLink" to="/gym">
              Gym Select
            </Link>
          </MenuItem>
          <MenuItem><LogOutButton className="navLink" /></MenuItem>
          </>
        )}
        <MenuItem>
        <Link className="navLink" to="/about">
          About
        </Link>
        </MenuItem>
      </div>
      </Menu>
      </Box>
    </div>
  );
}

export default Nav;
