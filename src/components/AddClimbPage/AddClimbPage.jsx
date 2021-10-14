import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

function AddNewClimb() {
    const history = useHistory();
    const reduxStore = useSelector(store => store);
    const { climbList } = reduxStore;
    const allParams = useParams();


    return(
        <div>
            Climblist:{JSON.stringify(climbList)}
            Params: {JSON.stringify(allParams)}
            <p>add new climb here!</p>
            <button onClick={ () => history.goBack() }>Back</button>
        </div>
    )
}

export default AddNewClimb;