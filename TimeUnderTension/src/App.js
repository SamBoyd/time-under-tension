import React from 'react'
import {Text, View} from "react-native";
import {useSelector} from "react-redux";

import {selectUiState} from "./reducers/uiStateReducer";
import {PAGE} from './constants';
import Workout from "./components/workout";
import PickExercise from "./pages/pickExercise";
import MainPage from "./pages/mainPage";
import CreateTemplateWorkout from "./pages/createTemplateWorkout";
import ManageExercises from "./pages/manageExercises";
import AddExercise from "./pages/addExercise";

// import './src/App.css';

function App() {
    const uiState = useSelector(selectUiState)

    return (
        <View className="App">
            {uiState.page === PAGE.main && (
                <MainPage />
            )}
            {uiState.page === PAGE.workout && (
                <Workout />
            )}

            {uiState.page === PAGE.pickExercise && (
                <PickExercise />
            )}

            {uiState.page === PAGE.createTemplateWorkout && (
                <CreateTemplateWorkout />
            )}

            {uiState.page === PAGE.manageExercises && (
                <ManageExercises />
            )}
            {uiState.page === PAGE.addExercise && (
                <AddExercise />
            )}
        </View>
    );
}

export default App;
