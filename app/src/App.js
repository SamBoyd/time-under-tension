import {useSelector} from "react-redux";

import {selectUiState} from "./reducers/uiStateReducer";
import {PAGE} from './constants';
import Workout from "./components/workout";
import PickExercise from "./components/pickExercise";

import './App.css';


function App() {
    const uiState = useSelector(selectUiState)

    return (
        <div className="App">
            {uiState.page === PAGE.workout && (
                <Workout />
            )}

            {uiState.page === PAGE.pickExercise && (
                <PickExercise />
            )}
        </div>
    );
}

export default App;
