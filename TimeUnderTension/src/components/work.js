import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {addSet, changeRestTime, changeWorkTime, moveWorkDown, moveWorkUp, removeWork} from "../reducers/workoutReducer";
import {DEFAULT_REST_TIME, DEFAULT_WORK_TIME_LOWER, DEFAULT_WORK_TIME_UPPER} from "../constants";
import {Dimensions} from "react-native";
import GenericWork from "./genericWork";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Work = props => {
    const [showActionsOverlay, setShowActionsOverlay] = useState(false)
    const dispatch = useDispatch()

    const restTime = props.restTime || DEFAULT_REST_TIME;
    const workTimeStart = props.workTime ? props.workTime.start : DEFAULT_WORK_TIME_LOWER;
    const workTimeEnd = props.workTime ? props.workTime.end : DEFAULT_WORK_TIME_UPPER;

    const fireAddSet = () => {
        dispatch(addSet({workId: props.id}))
    }

    const fireChangeRestTime = value => {
        dispatch(changeRestTime({
            workId: props.id,
            restTime: value
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

    const removeWorkByIndex = index => () => {
        dispatch(removeWork({index: index}))
    }

    const moveWorkDownByIndex = index => () => {
        dispatch(moveWorkDown({index: index}))
    }

    const moveWorkUpByIndex = index => () => {
        dispatch(moveWorkUp({index: index}))
    }

    const toggleShowWorkActionsOverlay = () => {
        setShowActionsOverlay(!showActionsOverlay)
    }

    return (
        <GenericWork
            {...props}
            workIndex={props.workIndex}
            fireAddSet={fireAddSet}
            fireChangeRestTime={fireChangeRestTime}
            fireChangeWorkTimeStart={fireChangeWorkTimeStart}
            fireChangeWorkTimeEnd={fireChangeWorkTimeEnd}
            removeWorkByIndex={removeWorkByIndex}
            moveWorkUpByIndex={moveWorkUpByIndex}
            moveWorkDownByIndex={moveWorkDownByIndex}
        />
    )
}

export default Work
