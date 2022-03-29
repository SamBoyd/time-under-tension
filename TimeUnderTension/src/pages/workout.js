import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {StyleSheet, View} from "react-native";


import {selectWorkout} from "../reducers/workoutReducer";
import Work from '../components/work'
import {moveToMainPage, moveToPickExerciseForWorkout} from "../reducers/uiStateReducer";
import {finishWorkoutAndMoveToMainPage} from "../reducers/actions";
import Timer from "../components/timer";
import {Button} from "../components/styled/button";

import {standardHorizontalPadding, standardVerticalPadding} from '../theme'
import BasePage from "../components/basePage";


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

    const styles = StyleSheet.create({
        addWorkButton: {
            marginTop: standardVerticalPadding,
            paddingHorizontal: standardHorizontalPadding,
            alignSelf: "center",
        }
    })

    const workComponents = workout.work.map((work, i) => {
        return (
            <Work
                {...work}
                workIndex={i}
                active={workout.currentWork === i}
            />
        )
    })

    const workoutStarted = workout.started_at !== null

    const finishButton = workoutStarted
        ? <Button onPress={finishWorkout} title="finish" containerStyle={styles.finishButton}/>
        : <View></View>;

    return (
        <>
            <BasePage
                headerTitle="Workout"
                leftHeaderComponent={<Button onPress={goBack} title="back" containerStyle={styles.backButton}/>}
                rightHeaderComponent={finishButton}
            >
                {workComponents}

                <Button onPress={addNewWork} title="Add work" containerStyle={styles.addWorkButton}/>

            </BasePage>
            <Timer/>
        </>
    )
}

export default Workout
