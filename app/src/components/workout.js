import React from 'react';
import { useSelector, useDispatch } from "react-redux";

import {moveWorkDown, moveWorkUp, removeWork, selectWorkout} from "../reducers/workoutReducer";
import Work from './work'
import {moveToMainPage, moveToPickExerciseForWorkout} from "../reducers/uiStateReducer";
import {finishWorkoutAndMoveToMainPage} from "../reducers/actions";

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
            <div key={i}>
                <Work
                    {...work} />
                <button onClick={removeWorkByIndex(i)}> Remove work {i}</button>
                <button data-testid={"moveWork"+i+"UpBtn"} onClick={moveWorkUpByIndex(i)}>Up</button>
                <button data-testid={"moveWork"+i+"DownBtn"} onClick={moveWorkDownByIndex(i)}>Down</button>
            </div>
        )
    })

    return (
        <div>
            <button onClick={goBack}>back</button>
            <button onClick={finishWorkout}>finish</button>
            <p>Workout</p>
            <div>
                { workComponents }
            </div>
            <button onClick={addNewWork}>Add work</button>
        </div>
    )
}

export default Workout
