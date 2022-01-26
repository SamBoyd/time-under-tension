import React from 'react';
import { useSelector, useDispatch } from "react-redux";

import {moveWorkDown, moveWorkUp, removeWork, selectWorkout} from "../reducers/workoutreducers";
import Work from './work'
import {moveToPickExercise} from "../reducers/uiStateReducer";

const Workout = () => {
    const dispatch = useDispatch()
    const workout = useSelector(selectWorkout)

    const addNewWork = () => {
        dispatch(moveToPickExercise())
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
            <p>Workout</p>
            <div>
                { workComponents }
            </div>
            <button onClick={addNewWork}>Add work</button>
        </div>
    )
}

export default Workout
