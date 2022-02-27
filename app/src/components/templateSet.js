import React from "react";
import { useDispatch } from "react-redux";
import {changeSetReps, changeSetWeight} from "../reducers/templateWorkoutReducer";

const TemplateSet = props => {

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

    return (
        <div>
            <label>{props.index}</label>
            <input onChange={updateReps} value={props.numberReps} />
            x
            <input onChange={updateWeight} value={props.weight} />
        </div>
    )
}

export default TemplateSet
