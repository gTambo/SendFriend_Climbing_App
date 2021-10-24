// import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import AddClimbForm from './AddClimbForm';

import { Button, Box } from '@mui/material';

function AddNewClimb() {
    const history = useHistory();
    // const reduxStore = useSelector(store => store);
    // const { climbList } = reduxStore;
    const allParams = useParams();
    const { gymId, styleId } = allParams;


    return(
        <Box sx={{margin: '1em'}}>

            {/* Climblist:{JSON.stringify(climbList)}
            Params: {JSON.stringify(allParams)} */}
            <h2>Add a new climb!</h2>
            <AddClimbForm gymId={gymId} styleId={styleId} />
            <Button variant="outlined" onClick={ () => history.goBack() }>Cancel</Button>
        </Box>
    )
}

export default AddNewClimb;