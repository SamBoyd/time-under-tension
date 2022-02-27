import React from 'react'
import { useDispatch, useSelector } from "react-redux";

import {exercises, PAGE} from '../constants'
import {pickExerciseForTemplateWorkoutAction, pickExerciseForWorkoutAction} from "../reducers/actions"
import {selectUiState} from "../reducers/uiStateReducer";

const PickExercise = () => {
    const uiState = useSelector(selectUiState)
    const dispatch = useDispatch()

    const selectExercise = exercise => () => {
        if (uiState.redirectTo === PAGE.workout) {
            pickExerciseForWorkoutAction(exercise)(dispatch)
        } else if (uiState.redirectTo === PAGE.createTemplateWorkout) {
            pickExerciseForTemplateWorkoutAction(exercise)(dispatch)
        }
    }

    return (
        <div>
            <p>Pick an exercise</p>
            <ul>
                { exercises.map(
                    (exercise, index) => <li key={index} onClick={selectExercise(exercise)}>{exercise.name}</li>
                ) }
            </ul>
        </div>
    )
}

export default PickExercise