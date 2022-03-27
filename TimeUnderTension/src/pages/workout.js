import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Dimensions, StyleSheet, View} from "react-native";


import {selectWorkout} from "../reducers/workoutReducer";
import Work from '../components/work'
import {moveToMainPage, moveToPickExerciseForWorkout} from "../reducers/uiStateReducer";
import {finishWorkoutAndMoveToMainPage} from "../reducers/actions";
import Timer from "../components/timer";
import {TextH1} from "../components/styled/text";
import {Button} from "../components/styled/button";

import theme from '../theme'
import {Divider} from "react-native-elements";
import BasePage from "../components/basePage";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

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
        backButton: {},

        finishButton: {},

        addWorkButton: {
            marginTop: 20,
            width: 200,
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

    return (
        <>
            <BasePage
                headerTitle="Workout"
                leftHeaderComponent={<Button onPress={goBack} title="back" containerStyle={styles.backButton}/>}
                rightHeaderComponent={<Button onPress={finishWorkout} title="finish"
                                              containerStyle={styles.finishButton}/>}
            >
                {workComponents}
                <Divider/>
                <Button onPress={addNewWork} title="Add work" containerStyle={styles.addWorkButton}/>

            </BasePage>
            <Timer/>
        </>
    )
}

export default Workout
