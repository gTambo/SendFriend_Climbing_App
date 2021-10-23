import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import gyms from './gym.reducer';
import climbStyles from './climb_style.reducer'
import climbList from './climblist.reducer';
import climbDetails from './climb_details.reducer';
import grades from './grades.reducer';
import comments from './comments.router';
import newClimb from './climb_ID.reducer';
import limitGrades from './limited_grades.reducer';
import logbook from './logbook.reducer';
import gymChoice from './chosen_gym_style.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  gyms, 
  climbStyles,
  climbList,
  climbDetails,
  grades,
  comments,
  newClimb,
  limitGrades,
  logbook,
  gymChoice,
});

export default rootReducer;
