import React from 'react';
import {useSelector, useDispatch} from "react-redux";
import {Button, ScrollView, Text, View} from "react-native";

import {moveWorkDown, moveWorkUp, removeWork, selectWorkout} from "../reducers/workoutReducer";
import Work from './work'
import {moveToMainPage, moveToPickExerciseForWorkout} from "../reducers/uiStateReducer";
import {finishWorkoutAndMoveToMainPage} from "../reducers/actions";
import SafeAreaView from "react-native/Libraries/Components/SafeAreaView/SafeAreaView";
import Timer from "./timer";

const Workout = () => {
    const dispatch = useDispatch()
    const workout = useSelector(selectWorkout)

    const goBack = () => {
        dispatch(moveToMainPage())
    }

    const finishWorkout = () => {
        finishWorkoutAndMoveToMainPage(dispatch, workout)
    }

    const addNewWork = () => {
        dispatch(moveToPickExerciseForWorkout())
    }

    const removeWorkByIndex = index => () => {
        dispatch(removeWork({index: index}))
    }

    const moveWorkDownByIndex = index => () => {
        dispatch(moveWorkDown({index: index}))
    }

    const moveWorkUpByIndex = index => () => {
        dispatch(moveWorkUp({index: index}))
    }

    const workComponents = workout.work.map((work, i) => {

        return (
            <View key={i}>
                <Work
                    {...work} />
                <Button onPress={removeWorkByIndex(i)} title={`Remove work ${i}`}/>
                <Button data-testid={"moveWork" + i + "UpBtn"} onPress={moveWorkUpByIndex(i)} title="Up"/>
                <Button data-testid={"moveWork" + i + "DownBtn"} onPress={moveWorkDownByIndex(i)} title="Down"/>
            </View>
        )
    })

    return (
        <SafeAreaView>
            <ScrollView contentInsetAdjustmentBehavior="automatic">
                <View>
                    <Button onPress={goBack} title="back"/>
                    <Button onPress={finishWorkout} title="finish"/>
                    <Text>Workout</Text>
                    <View>
                        {workComponents}
                    </View>
                    <Button onPress={addNewWork} title="Add work"/>
                </View>

                <Timer />
            </ScrollView>
        </SafeAreaView>
    )
}

export default Workout
