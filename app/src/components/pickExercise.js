import React from 'react'
import { useDispatch } from "react-redux";

import {exercises} from '../constants'
import {pickExerciseAction} from "../reducers/actions"

const PickExercise = () => {

    const dispatch = useDispatch()

    const selectExercise = exercise => () => {
        pickExerciseAction(exercise)(dispatch)
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