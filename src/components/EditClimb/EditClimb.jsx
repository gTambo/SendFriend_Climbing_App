import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import EditClimbForm from './EditClimbForm';

function EditClimb() {
    // get params to navigate back to climblist on success
    const allParams = useParams();
    const { gymId, styleId, climbId } = allParams;
    // use local state to set object with edits
    // const dispatch = useDispatch();
    const history = useHistory();

    return(
        <div>
            <h1>Update This Climb!</h1>
            <EditClimbForm  gymId={gymId} styleId={styleId} climbId={climbId} />
            <button onClick={ () => history.goBack() }>Cancel Edits</button>
        </div>
    )
}

export default EditClimb;