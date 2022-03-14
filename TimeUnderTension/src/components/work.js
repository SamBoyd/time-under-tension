import React from "react";
import { useDispatch } from "react-redux";

import Set from './set'
import {addSet, changeRestTime, changeWorkTime, removeSet} from "../reducers/workoutReducer";
import {DEFAULT_REST_TIME, DEFAULT_WORK_TIME_LOWER, DEFAULT_WORK_TIME_UPPER} from "../constants";
import {View} from "react-native";
import InputSpinner from "react-native-input-spinner";
import {TextBold, TextNormal} from "./styled/text";
import {FlexRowView} from "./styled/view";
import {Button} from "./styled/button";

const Work = props => {

    const dispatch = useDispatch()

    const restTime = props.restTime || DEFAULT_REST_TIME;
    const workTimeStart = props.workTime ? props.workTime.start: DEFAULT_WORK_TIME_LOWER;
    const workTimeEnd = props.workTime? props.workTime.end: DEFAULT_WORK_TIME_UPPER;

    const fireAddSet = () => {
        dispatch(addSet({workId: props.id}))
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
            <TextBold>{props.exercise.name}</TextBold>

            <FlexRowView>
                <TextNormal htmlFor="restTimeInput">Rest time</TextNormal>
                <InputSpinner id="restTimeInput" type="square" onChange={fireChangeRestTime} value={restTime.toString()} />
            </FlexRowView>


            <TextNormal htmlFor="workTimeInputStart">Work time</TextNormal>
            <FlexRowView>
                <TextNormal>start</TextNormal>
                <InputSpinner id="workTimeInputStart" onChange={fireChangeWorkTimeStart} value={workTimeStart} />
                <TextNormal>end</TextNormal>
                <InputSpinner id="workTimeInputEnd" onChange={fireChangeWorkTimeEnd} value={workTimeEnd} />
            </FlexRowView>

            <View>
                {props.sets.map((set, index) => {
                    return  <Set key={index} index={index} {...set} workId={props.id}/>
                })}
            </View>
            <Button onPress={fireAddSet} title="Add Set" />
        </View>
    )
}

export default Work
