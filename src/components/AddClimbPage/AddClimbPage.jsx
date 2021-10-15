// import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import AddClimbForm from './AddClimbForm';

function AddNewClimb() {
    const history = useHistory();
    // const reduxStore = useSelector(store => store);
    // const { climbList } = reduxStore;
    const allParams = useParams();
    const { gymId, styleId } = allParams;


    return(
        <div>

            {/* Climblist:{JSON.stringify(climbList)}
            Params: {JSON.stringify(allParams)} */}
            <h2>Add a new climb!</h2>
            <AddClimbForm gymId={gymId} styleId={styleId} />
            <button onClick={ () => history.goBack() }>Cancel</button>
        </div>
    )
}

export default AddNewClimb;