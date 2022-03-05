import React from 'react'
import { useDispatch, useSelector } from "react-redux";

import {PAGE} from '../constants'
import {pickExerciseForTemplateWorkoutAction, pickExerciseForWorkoutAction} from "../reducers/actions"
import {selectUiState} from "../reducers/uiStateReducer";
import {removeExercise, selectExercises} from "../reducers/exercisesReducer";
import styled from "styled-components";

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

    const CategoryHeader = styled.div`
    
`

    const CategoryExerciseList = styled.div`
    margin: auto;
`

    const CategoryExerciseListItem = styled.div`
    margin: auto;
    font-weight: lighter;
`

    const Category = (props) => {
        const dispatch = useDispatch()

        if (props.exercises.length === 0) {
            return <></>
        }

        const removeExerciseId = exerciseId => () => {
            dispatch(removeExercise({id: exerciseId}))
        }

        return (
            <div>
                <CategoryHeader>{props.name}</CategoryHeader>
                <CategoryExerciseList>
                    {props.exercises.map((ex, i) => {
                        return <CategoryExerciseListItem key={i} onClick={selectExercise(ex)}>
                            {ex.name}
                        </CategoryExerciseListItem>
                    })}
                </CategoryExerciseList>
            </div>
        )
    }

    const sortedExercises = {}
    exercises.categories.forEach(cat => {
        sortedExercises[cat] = exercises.exercises.filter(e => e.category === cat)
    })


    return (
        <div>
            <p>Pick an exercise</p>
            {Object.keys(sortedExercises).map((cat, i) => <Category key={i} name={cat} exercises={sortedExercises[cat]}/>)}
        </div>
    )
}

export default PickExercise