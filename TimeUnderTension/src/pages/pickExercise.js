import React from 'react'
import { useDispatch, useSelector } from "react-redux";

import {PAGE} from '../constants'
import {pickExerciseForTemplateWorkoutAction, pickExerciseForWorkoutAction} from "../reducers/actions"
import {selectUiState} from "../reducers/uiStateReducer";
import {selectExercises} from "../reducers/exercisesReducer";
import {Text, View} from "react-native";
import SectionList from "react-native/Libraries/Lists/SectionList";


const PickExercise = () => {
    const uiState = useSelector(selectUiState)
    const exercises = useSelector(selectExercises)
    const dispatch = useDispatch()

    const selectExercise = exercise => () => {
        if (uiState.redirectTo === PAGE.workout) {
            pickExerciseForWorkoutAction(exercise)(dispatch)
        } else if (uiState.redirectTo === PAGE.createTemplateWorkout) {
            pickExerciseForTemplateWorkoutAction(exercise)(dispatch)
        }
    }

    const sortedExercises = []
    exercises.categories.forEach(cat => {
        sortedExercises.push({'title': cat, 'data': exercises.exercises.filter(e => e.category === cat)})
    })

    const Item = ({ exercise }) => (
        <View>
            <Text onPress={selectExercise(exercise)}>{exercise.name}</Text>
        </View>
    );

    return (
        <View>
            <Text>Pick an exercise</Text>
            <SectionList
                sections={sortedExercises}
                keyExtractor={exercise => exercise.id}
                renderItem={({item}) => <Item exercise={item} />}
                renderSectionHeader={({ section: { title } }) => (
                    <Text>{title}</Text>
                )}
            />
        </View>
    )
}

export default PickExercise