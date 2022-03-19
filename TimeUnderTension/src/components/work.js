import React from "react";
import {useDispatch} from "react-redux";

import Set from './set'
import {addSet, changeRestTime, changeWorkTime, removeSet} from "../reducers/workoutReducer";
import {DEFAULT_REST_TIME, DEFAULT_WORK_TIME_LOWER, DEFAULT_WORK_TIME_UPPER} from "../constants";
import {StyleSheet, View} from "react-native";
import {TextH1} from "./styled/text";
import {FlexRowView} from "./styled/view";
import {Button} from "./styled/button";


import RestTime from "./resetTime";
import WorkTime from "./workTime";

const Work = props => {

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

    if (workTimeStart > workTimeEnd) {
        fireChangeWorkTimeEnd(workTimeStart+1)
    }


    const styles = StyleSheet.create({
        timingContainer: {
            marginLeft: 50,
            marginRight: 50,
            // alignItems: 'center',
            flexDirection: "row",
            justifyContent: 'space-between',
        }
    })

    return (
        <View>
            <TextH1>{props.exercise.name}</TextH1>

            <FlexRowView viewStyle={styles.timingContainer}>

                <RestTime
                    onChangeText={fireChangeRestTime}
                    value={restTime}
                />


                <WorkTime
                    workTimeStart={workTimeStart}
                    workTimeEnd={workTimeEnd}
                    fireChangeWorkTimeStart={fireChangeWorkTimeStart}
                    fireChangeWorkTimeEnd={fireChangeWorkTimeEnd}
                />
            </FlexRowView>

            <View>
                {props.sets.map((set, index) => {
                    return <Set key={index} index={index} {...set} workId={props.id}/>
                })}
            </View>
            <Button onPress={fireAddSet} title="Add Set" />
        </View>
    )
}

export default Work
