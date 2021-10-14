import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function ClimbTag({climb}) {
    return(
        <li>
            <p>{climb.difficulty}</p>
            <p>{climb.color}</p>
            <img src={climb.photo} />
        </li>
    )
}

export default ClimbTag;