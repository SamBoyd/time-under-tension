import {useSelector} from "react-redux";

import {selectUiState} from "./reducers/uiStateReducer";
import {PAGE} from './constants';
import Workout from "./components/workout";
import PickExercise from "./pages/pickExercise";
import Timer from "./components/timer";

import './App.css';
import MainPage from "./pages/mainPage";
import CreateTemplateWorkout from "./pages/createTemplateWorkout";


function App() {
    const uiState = useSelector(selectUiState)

    return (
        <div className="App">
            {uiState.page === PAGE.main && (
                <MainPage />
            )}
            {uiState.page === PAGE.workout && (
                <>
                    <Workout />
                    <Timer />
                </>
            )}

            {uiState.page === PAGE.pickExercise && (
                <PickExercise />
            )}

            {uiState.page === PAGE.createTemplateWorkout && (
                <CreateTemplateWorkout />
            )}
        </div>
    );
}

export default App;
