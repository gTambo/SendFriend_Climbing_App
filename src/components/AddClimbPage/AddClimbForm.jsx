import React, { useState } from 'react';

function AddClimbForm() {

    const [grade, setGrade] = useState();

    // to 

    return(
        <form>
            <label htmlFor="grade">Grade</label> 
            <input id="grade" 
                   type="text" 
                   value={grade} 
                   onChange={ (event) => setGrade(event.target.value)}
            />
            <input type="text" />
            <input type="text" />

        </form>
    )
}

export default AddClimbForm;