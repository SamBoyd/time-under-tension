import React from 'react'
import {useDispatch} from "react-redux";

import {moveToManageExercises, moveToWorkout} from "../reducers/uiStateReducer";
import TemplateWorkouts from "../components/templateWorkouts";
import History from "../components/history";
import {ScrollView, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {Button} from "../components/styled/button";


function MainPage() {
    const dispatch = useDispatch()

    const newBlankWorkout = () => {
        dispatch(moveToWorkout())
    }

    const clickManageExercises = () => {
        dispatch(moveToManageExercises())
    }

    return (
        <SafeAreaView>
            <ScrollView>
                <Button onPress={newBlankWorkout} title="New blank workout" />
                <TemplateWorkouts />
                <History />

                <Button onPress={clickManageExercises} title="Manage Exercises" />
            </ScrollView>
        </SafeAreaView>
    )
}

export default MainPage;