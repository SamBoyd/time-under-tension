import React from 'react'
import {useSelector} from "react-redux";

import {selectUiState} from "./reducers/uiStateReducer";
import {PAGE} from './constants';
import Workout from "./pages/workout";
import PickExercise from "./pages/pickExercise";
import MainPage from "./pages/mainPage";
import CreateTemplateWorkout from "./pages/createTemplateWorkout";
import ManageExercises from "./pages/manageExercises";
import AddExercise from "./pages/addExercise";
import {View} from "react-native";


function App() {
    const uiState = useSelector(selectUiState)

    if (uiState.page === PAGE.main) {
        return <MainPage />
    } else if (uiState.page === PAGE.workout) {
        return <Workout />
    } else if (uiState.page === PAGE.pickExercise) {
        return <PickExercise />
    } else if (uiState.page === PAGE.createTemplateWorkout) {
        return <CreateTemplateWorkout />
    } else if (uiState.page === PAGE.manageExercises) {
        return <ManageExercises />
    } else if (uiState.page === PAGE.addExercise) {
        return <AddExercise />
    } else {
        return <View>Nothing here</View>
    }
}

export default App;
