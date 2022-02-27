import React from "react";
import { useDispatch } from "react-redux";

import TemplateSet from "./templateSet";
import {addSet, changeRestTime, changeWorkTime, removeSet} from "../reducers/templateWorkoutReducer";
import {DEFAULT_REST_TIME, DEFAULT_WORK_TIME_LOWER, DEFAULT_WORK_TIME_UPPER} from "../constants";

const Work = props => {

    const dispatch = useDispatch()

    const restTime = props.restTime || DEFAULT_REST_TIME;
    const workTimeStart = props.workTime ? props.workTime.start: DEFAULT_WORK_TIME_LOWER;
    const workTimeEnd = props.workTime? props.workTime.end: DEFAULT_WORK_TIME_UPPER;

    const fireAddSet = () => {
        dispatch(addSet({workId: props.id}))
    }
    const fireRemoveSetById = setId => () => {
        dispatch(removeSet({setId: setId, workId: props.id}))
    }
    const fireChangeRestTime = event => {
        dispatch(changeRestTime({
            workId: props.id,
            restTime: event.target.value
        }))
    }

    const fireChangeWorkTimeStart = event => {
        dispatch(changeWorkTime({
            workId: props.id,
            workTime: {
                start: event.target.value,
                end: workTimeEnd
            }
        }))
    }

    const fireChangeWorkTimeEnd = event => {
        dispatch(changeWorkTime({
            workId: props.id,
            workTime: {
                start: workTimeStart,
                end: event.target.value
            }
        }))
    }

    return (
        <div>
            <p>{props.exercise.name}</p>

            <label htmlFor="restTimeInput">Rest time</label>
            <input id="restTimeInput" onChange={fireChangeRestTime} value={restTime} />

            <label htmlFor="workTimeInputStart">Work time</label>
            <input id="workTimeInputStart" onChange={fireChangeWorkTimeStart} value={workTimeStart} />
            <input id="workTimeInputEnd" onChange={fireChangeWorkTimeEnd} value={workTimeEnd} />

            <div>
                {props.sets.map((set, index) => {
                    return <div key={index}>
                        <TemplateSet index={index} {...set} />
                        <button data-testid={"removeSet" + set.id} onClick={fireRemoveSetById(set.id)}>Remove</button>
                    </div>
                })}
            </div>
            <button onClick={fireAddSet}>Add Set</button>
        </div>
    )
}

export default Work
