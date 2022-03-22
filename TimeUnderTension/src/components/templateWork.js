import React from "react";
import { useDispatch } from "react-redux";

import TemplateSet from "./templateSet";
import {
    addSet,
    changeRestTime,
    changeWorkTime,
    moveWorkDown, moveWorkUp,
    removeSet,
    removeWork
} from "../reducers/templateWorkoutReducer";
import {DEFAULT_REST_TIME, DEFAULT_WORK_TIME_LOWER, DEFAULT_WORK_TIME_UPPER} from "../constants";
import {View, StyleSheet} from "react-native";
import InputSpinner from "react-native-input-spinner";
import {TextBold, TextH1, TextNormal} from "./styled/text";
import {FlexRowView} from "./styled/view";
import {Icon} from "react-native-elements";
import {Button} from "./styled/button";
import GenericWork from "./genericWork";

const Work = props => {
    const dispatch = useDispatch()

    const work = props.work

    const fireAddSet = () => {
        dispatch(addSet({workId: work.id}))
    }

    const fireChangeRestTime = event => {
        dispatch(changeRestTime({
            workId: work.id,
            restTime: event.target.value
        }))
    }

    const fireChangeWorkTimeStart = event => {
        dispatch(changeWorkTime({
            workId: work.id,
            workTime: {
                start: event.target.value,
                end: workTimeEnd
            }
        }))
    }

    const fireChangeWorkTimeEnd = event => {
        dispatch(changeWorkTime({
            workId: work.id,
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

    return (
        <GenericWork
            {...work}
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
