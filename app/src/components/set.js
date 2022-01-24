import React from "react";
import { useDispatch } from "react-redux";
import {changeSetReps, changeSetWeight, finishSet} from "../reducers/workoutreducers";

const Set = props => {

    const dispatch = useDispatch()

    const updateReps = event => {
        dispatch(changeSetReps({
            setId: props.id,
            reps: event.target.value
        }))
    }

    const updateWeight = event => {
        dispatch(changeSetWeight({
            setId: props.id,
            weight: event.target.value
        }))
    }

    const finish = () => {
        dispatch(finishSet({
            setId: props.id
        }))
    }

    return (
        <div>
            <label>{props.index}</label>
            <input onChange={updateReps} value={props.numberReps} />
            x
            <input onChange={updateWeight} value={props.weight} />

            <input type="checkbox" onChange={finish} defaultChecked={props.finished} />

        </div>
    )
}

export default Set
