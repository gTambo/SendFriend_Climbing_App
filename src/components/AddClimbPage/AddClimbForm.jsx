import React, { useState } from 'react';
import { useSelector } from 'react-redux';

function AddClimbForm({gymId, styleId}) {

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
    //  Use Redux to store grades
    // To Do: get Grades 

    return(
        <form>
            <label htmlFor="grade">Grade</label> 
            <select name="grade" 
                    required 
                    id="grade" 
                    type="text" 
                    value={newClimb.grade_id} 
                    onChange={ (event) => setNewClimb({...newClimb, grade_id: event.target.value})}>
                        {/* get grades from redux and map to selector */}
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
            <input required
                   id="photo" 
                   type="text" 
            />
            <label htmlFor="movement">Movement Style</label>
            <input id="movement" 
                   type="text" 
            />
            <input type="submit" value="Save Climb" />
        </form>
    )
}

export default AddClimbForm;