// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function ClimbTag({gymId, styleId, climb}) {
    //  use history to view details page
    const history = useHistory();


    const viewClimbDetails = () => {
        history.push(`/climbs/${gymId}/${styleId}/climbdetail/${climb.id}`)
    }

    return(
        <li>
            <p>{climb.difficulty}</p>
            <p>{climb.color}</p>
            <img className="small-photo" src={climb.photo} />
            <button onClick={ viewClimbDetails }>View Details</button>
        </li>
    )
}

export default ClimbTag;