import React from "react";
import { useDispatch } from "react-redux";

import TemplateSet from "./templateSet";
import {addSet, changeRestTime, changeWorkTime, removeSet} from "../reducers/templateWorkoutReducer";
import {DEFAULT_REST_TIME, DEFAULT_WORK_TIME_LOWER, DEFAULT_WORK_TIME_UPPER} from "../constants";
import {View} from "react-native";
import InputSpinner from "react-native-input-spinner";
import {TextBold, TextH1, TextNormal} from "./styled/text";
import {FlexRowView} from "./styled/view";
import {Icon} from "react-native-elements";
import {Button} from "./styled/button";

const Work = props => {
    const dispatch = useDispatch()

    const restTime = props.restTime || DEFAULT_REST_TIME;
    const workTimeStart = props.workTime ? props.workTime.start: DEFAULT_WORK_TIME_LOWER;
    const workTimeEnd = props.workTime? props.workTime.end: DEFAULT_WORK_TIME_UPPER;

    const fireAddSet = () => {
        dispatch(addSet({workId: props.id}))
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
        <View>
            <TextBold>{props.exercise.name}</TextBold>

            <FlexRowView>
                <TextNormal htmlFor="restTimeInput">Rest time</TextNormal>
                <InputSpinner id="restTimeInput" onChange={fireChangeRestTime} value={restTime.toString()} />
            </FlexRowView>

            <FlexRowView>
                <TextNormal htmlFor="workTimeInputStart">Work time</TextNormal>
                <InputSpinner id="workTimeInputStart" onChange={fireChangeWorkTimeStart} value={workTimeStart} />
                <InputSpinner id="workTimeInputEnd" onChange={fireChangeWorkTimeEnd} value={workTimeEnd} />
            </FlexRowView>

            <View>
                {props.sets.map((set, index) => {
                    return <View key={index}>
                        <TemplateSet index={index} {...set} workId={props.id}/>
                    </View>
                })}
            </View>
            <Button onPress={fireAddSet} title="Add Set" />
        </View>
    )
}

export default Work
