import React from 'react'
import {useDispatch} from "react-redux";

import {moveToManageExercises, moveToWorkout} from "../reducers/uiStateReducer";
import TemplateWorkouts from "../components/templateWorkouts";
import History from "../components/history";
import {Button, View} from "react-native";


function MainPage() {
    const dispatch = useDispatch()

    const newBlankWorkout = () => {
        dispatch(moveToWorkout())
    }

    const clickManageExercises = () => {
        dispatch(moveToManageExercises())
    }

    return (
        <View>
            <Button onPress={newBlankWorkout} title="New blank workout" />
            <TemplateWorkouts />
            <History />

            <Button onPress={clickManageExercises} title="Manage Exercises" />
        </View>
    )
}

export default MainPage;