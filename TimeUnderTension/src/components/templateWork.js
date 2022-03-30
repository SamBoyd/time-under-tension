import React from "react";
import {useDispatch} from "react-redux";

import TemplateSet from "./templateSet";
import {
    addSet,
    changeRestTime,
    changeWorkTime,
    moveWorkDown, moveWorkUp,
    removeSet,
    removeWork
} from "../reducers/newTemplateWorkoutReducer";
import {DEFAULT_REST_TIME, DEFAULT_WORK_TIME_LOWER, DEFAULT_WORK_TIME_UPPER} from "../constants";
import {View, StyleSheet} from "react-native";
import InputSpinner from "react-native-input-spinner";
import {TextBold, TextH1, TextNormal} from "./styled/text";
import {FlexRowView} from "./styled/view";
import {Icon} from "react-native-elements";
import {Button} from "./styled/button";
import GenericWork from "./genericWork";
import {addSetAction} from "../reducers/actions";
import {updateRestOnWork, updateSetsOnWork, updateWorkTimeOnWork} from "../reducers/workReducer";

const Work = props => {
    const dispatch = useDispatch()

    const work = props.work

    const restTime = work.restTime || DEFAULT_REST_TIME;
    const workTimeStart = work.workTimeStart || DEFAULT_WORK_TIME_LOWER
    const workTimeEnd = work.workTimeEnd || DEFAULT_WORK_TIME_UPPER


    const fireAddSet = () => {
        addSetAction(dispatch, work.id)
    }

    const fireRemoveSet = setId => {
        const newSets = work.sets.filter(s => s !== setId)
        dispatch(updateSetsOnWork({
            workId: work.id,
            sets: newSets
        }))
    }

    const fireChangeRestTime = value => {
        dispatch(updateRestOnWork({
            workId: work.id,
            restTime: value
        }))
    }

    const fireChangeWorkTimeStart = value => {
        dispatch(updateWorkTimeOnWork({
            workId: work.id,
            workTimeStart: value,
            workTimeEnd: workTimeEnd
        }))
    }

    const fireChangeWorkTimeEnd = value => {
        dispatch(updateWorkTimeOnWork({
            workId: work.id,
            workTimeStart: workTimeStart,
            workTimeEnd: value
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

    return (
        <GenericWork
            {...work}
            workIndex={props.workIndex}
            fireAddSet={fireAddSet}
            fireRemoveSet={fireRemoveSet}
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
