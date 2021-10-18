import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import GymSelect from '../GymSelect/GymSelect';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import ClimbList from '../ClimbList/ClimbList';
import ClimbDetail from '../ClimbDetail/ClimbDetail';
import AddNewClimb from '../AddClimbPage/AddClimbPage';
import EditClimb from '../EditClimb/EditClimb';
import UploadPhoto from '../S3Upload/S3Upload';

import './App.css';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />

          {/* Visiting localhost:3000/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
          >
            <UserPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows AddNewClimb else shows LoginPage
            exact
            path="/climbs/:gymId/:styleId/addclimb"
          >
            <AddNewClimb />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows AddNewClimb else shows LoginPage
            exact
            path="/climbs/:gymId/:styleId/addPhoto"
          >
            <UploadPhoto />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows GymSelect else shows LoginPage
            exact
            path="/gym"
          >
            <GymSelect />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/climbs/:gymId/:styleId"
          >
            <ClimbList />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows ClimbDetail else shows LoginPage
            exact
            path="/climbs/:gymId/:styleId/climbdetail/:climbId"
          >
            <ClimbDetail />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows ClimbDetail else shows LoginPage
            exact
            path="/climbs/:gymId/:styleId/edit/:climbId"
          >
            <EditClimb />
          </ProtectedRoute>

          <Route
            exact
            path="/login"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect to the /user page
              <Redirect to="/gym" />
              :
              // Otherwise, show the login page
              <LoginPage />
            }
          </Route>

          <Route
            exact
            path="/registration"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/gym" />
              :
              // Otherwise, show the registration page
              <RegisterPage />
            }
          </Route>

          <Route
            exact
            path="/home"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/gym" />
              :
              // Otherwise, show the Landing page
              <LandingPage />
            }
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
