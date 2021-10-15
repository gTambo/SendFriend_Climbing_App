import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import UploadDisplay from '../S3Upload/S3Upload';

function AddClimbForm({gymId, styleId}) {

    const dispatch = useDispatch();
    const history = useHistory();
    // Use Redux to store grades
    const grades = useSelector(store => store.grades);
    // use local state to assemble new climb details as an object
    let defaultClimb = {
        grade_id: '',
        color: '',
        photo: '',
        movement_style: '',
        gym_id: gymId,
        climb_style_id: styleId,
    };

    const [newClimb, setNewClimb] = useState(defaultClimb);
    
    // To Do: get Grades 
    useEffect( () => {
        dispatch({ type: 'FETCH_ALL_GRADES' })
    }, [dispatch]);

    const saveNewClimb = (event) => {
        event.preventDefault();
        console.log('climb to add: ', newClimb);
        dispatch({ type: 'ADD_CLIMB', payload: newClimb});
        setNewClimb(defaultClimb);
        alert("Climb added!");
        history.push(`/climbs/${gymId}/${styleId}`);
    }

    return(
        <>
        {/* {JSON.stringify(grades)} */}
        <form onSubmit={ saveNewClimb }>
            <label htmlFor="grade">Grade</label> 
            <select name="grade" 
                    required 
                    id="grade" 
                    type="text" 
                    value={newClimb.grade_id} 
                    onChange={ (event) => setNewClimb({...newClimb, grade_id: event.target.value})}>
                        {/* get grades from redux and map to selector */}
                        <option>Select the grade</option>
                        {grades.map((grade) => {
                            return(
                                <option key={grade.id} value={grade.id}>{grade.difficulty}</option>
                            )

                        })}
            </select>
            <label htmlFor="color">Color</label>
            <select required
                    name="color" 
                    id="color"
                    value={newClimb.color}
                    onChange={ (event) => setNewClimb({...newClimb, color: event.target.value})}>
                <option>select a color</option>
                <option value="Red">Red</option>
                <option value="Orange">Orange</option>
                <option value="Yellow">Yellow</option>
                <option value="Green">Green</option>
                <option value="Blue">Blue</option>
                <option value="Pink">Pink</option>
                <option value="Purple">Purple</option>
                <option value="Teal">Teal</option>
                <option value="Black">Black</option>
                <option value="White">White</option>
                <option value="Grey">Grey</option>
                <option value="Tan">Tan</option>
                <option value="Other">Other</option>
            </select>
            <label htmlFor="photo">Photo</label>
            {/* <input required
                   id="photo" 
                   type="text"
                   value={newClimb.photo}
                   onChange={ (event) => setNewClimb({...newClimb, photo: event.target.value})} 
            /> */}
            <UploadDisplay id="photo" setNewClimb={setNewClimb} newClimb={newClimb} />
            <label htmlFor="movement">Movement Style</label>
            <input id="movement" 
                   type="text" 
                   value={newClimb.movement_style}
                   onChange={ (event) => setNewClimb({...newClimb, movement_style: event.target.value})}
            />
            <input type="submit" value="Save Climb" />
        </form>
        
        </>
    )
}

export default AddClimbForm;