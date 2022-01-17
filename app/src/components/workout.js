import React from 'react';
import { useSelector, useDispatch } from "react-redux";

import {addWork, moveWorkDown, moveWorkUp, removeWork, selectWorkout} from "../reducers/workoutreducers";
import Work from './work'

const Workout = () => {
    const dispatch = useDispatch()
    const workout = useSelector(selectWorkout)

    const addNewWork = () => {
        dispatch(addWork())
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

    const workActionsWrapper = (work, index) => {
        return(
            <div key={index}>
                {work}
                <button onClick={removeWorkByIndex(index)}> Remove work {index}</button>
                <button data-testid={"moveWork"+index+"UpBtn"} onClick={moveWorkUpByIndex(index)}>Up</button>
                <button data-testid={"moveWork"+index+"DownBtn"} onClick={moveWorkDownByIndex(index)}>Down</button>
            </div>
        )
    }

    const workComponent = workout.work.map((work, i) => {
        return workActionsWrapper(<Work num={i} {...work}/>, i)
    })

    return (
        <div>
            <p>Workout</p>
            <div>
                { workComponent }
            </div>
            <button onClick={addNewWork}>Add work</button>
        </div>
    )
}

export default Workout
