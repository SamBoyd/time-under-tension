import React from "react";
import { useDispatch } from "react-redux";

import Set from './set'
import {addSet, changeRestTime, changeWorkTime, removeSet} from "../reducers/workoutReducer";
import {DEFAULT_REST_TIME, DEFAULT_WORK_TIME_LOWER, DEFAULT_WORK_TIME_UPPER} from "../constants";
import {Button, Text, TextInput, View} from "react-native";
import InputSpinner from "react-native-input-spinner";

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
    const fireChangeRestTime = value => {
        dispatch(changeRestTime({
            workId: props.id,
            restTime: value
        }))
    }

    const fireChangeWorkTimeStart = value => {
        dispatch(changeWorkTime({
            workId: props.id,
            workTime: {
                start: value,
                end: workTimeEnd
            }
        }))
    }

    const fireChangeWorkTimeEnd = value => {
        dispatch(changeWorkTime({
            workId: props.id,
            workTime: {
                start: workTimeStart,
                end: value
            }
        }))
    }

    return (
        <View>
            <Text>{props.exercise.name}</Text>

            <Text htmlFor="restTimeInput">Rest time</Text>
            <InputSpinner id="restTimeInput" onChange={fireChangeRestTime} value={restTime.toString()} />

            <Text htmlFor="workTimeInputStart">Work time</Text>
            <InputSpinner id="workTimeInputStart" onChange={fireChangeWorkTimeStart} value={workTimeStart} />
            <InputSpinner id="workTimeInputEnd" onChange={fireChangeWorkTimeEnd} value={workTimeEnd} />

            <View>
                {props.sets.map((set, index) => {
                    return <View key={index}>
                        <Set index={index} {...set} />
                        <Button data-testid={"removeSet" + set.id} onPress={fireRemoveSetById(set.id)} title="Remove" />
                    </View>
                })}
            </View>
            <Button onPress={fireAddSet} title="Add Set" />
        </View>
    )
}

export default Work
