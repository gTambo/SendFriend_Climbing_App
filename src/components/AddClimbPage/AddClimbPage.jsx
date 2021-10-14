import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import AddClimbForm from './AddClimbForm';

function AddNewClimb() {
    const history = useHistory();
    const reduxStore = useSelector(store => store);
    const { climbList } = reduxStore;
    const allParams = useParams();
    const { gymId, styleId } = allParams;


    return(
        <div>

            Climblist:{JSON.stringify(climbList)}
            Params: {JSON.stringify(allParams)}
            <p>add new climb here!</p>
            <AddClimbForm gymId={gymId} styleId={styleId} />
            <button onClick={ () => history.goBack() }>Cancel</button>
        </div>
    )
}

export default AddNewClimb;