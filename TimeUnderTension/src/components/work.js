import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    moveWorkDown as moveWorkDownInWorkout,
    moveWorkUp as moveWorkUpInWorkout,
    removeWork as removeWorkInWorkout
} from "../reducers/workoutReducer";
import {DEFAULT_REST_TIME, DEFAULT_WORK_TIME_LOWER, DEFAULT_WORK_TIME_UPPER} from "../constants";
import {Dimensions} from "react-native";
import GenericWork from "./genericWork";
import {selectWork, updateRestOnWork, updateSetsOnWork, updateWorkTimeOnWork} from "../reducers/workReducer";
import {addSetAction} from "../reducers/actions";
import {loadPreviousSetsForExercise} from "../utils/stateUtils";
import {selectSet} from "../reducers/setReducer";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Work = props => {
    const [showActionsOverlay, setShowActionsOverlay] = useState(false)
    const workState = useSelector(selectWork)
    const setState = useSelector(selectSet)
    const dispatch = useDispatch()

    const restTime = props.restTime || DEFAULT_REST_TIME;
    const workTimeStart = props.workTimeStart || DEFAULT_WORK_TIME_LOWER;
    const workTimeEnd = props.workTimeEnd || DEFAULT_WORK_TIME_UPPER;

    const fireAddSet = () => {
        addSetAction(dispatch, props.id)
    }

    const fireRemoveSet = setId => {
        const newSets = props.sets.filter(s => s !== setId)
        dispatch(updateSetsOnWork({
            workId: props.id,
            sets: newSets
        }))
    }

    const fireChangeRestTime = value => {
        dispatch(updateRestOnWork({
            workId: props.id,
            restTime: value
        }))
    }

    const fireChangeWorkTimeStart = value => {
        dispatch(updateWorkTimeOnWork({
            workId: props.id,
            workTimeStart: value,
            workTimeEnd: workTimeEnd
        }))
    }

    const fireChangeWorkTimeEnd = value => {
        dispatch(updateWorkTimeOnWork({
            workId: props.id,
            workTimeStart: workTimeStart,
            workTimeEnd: value
        }))
    }

    const removeWork = () => {
        dispatch(removeWorkInWorkout(props.id))
    }

    const moveWorkDown = () => {
        dispatch(moveWorkDownInWorkout(props.id))
    }

    const moveWorkUp = () => {
        dispatch(moveWorkUpInWorkout(props.id))
    }

    const toggleShowWorkActionsOverlay = () => {
        setShowActionsOverlay(!showActionsOverlay)
    }

    const previousSets = loadPreviousSetsForExercise(props.exercise.id, workState, setState)

    return (
        <GenericWork
            id={props.id}
            exercise={props.exercise}
            sets={props.sets}
            restTime={props.restTime}
            workTimeStart={props.workTimeStart}
            workTimeEnd={props.workTimeEnd}
            finished={props.finished}
            active={props.active}
            workIndex={props.workIndex}
            fireAddSet={fireAddSet}
            fireRemoveSet={fireRemoveSet}
            fireChangeRestTime={fireChangeRestTime}
            fireChangeWorkTimeStart={fireChangeWorkTimeStart}
            fireChangeWorkTimeEnd={fireChangeWorkTimeEnd}
            removeWork={removeWork}
            moveWorkUp={moveWorkUp}
            moveWorkDown={moveWorkDown}
            displayChangeActiveWork={true}
            previousSets={previousSets}
        />
    )
}

export default Work
