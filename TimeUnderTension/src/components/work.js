import React, {useState} from "react";
import {useDispatch} from "react-redux";

import Set from './set'
import {
    addSet,
    changeRestTime,
    changeWorkTime,
    moveWorkDown,
    moveWorkUp,
    removeSet,
    removeWork
} from "../reducers/workoutReducer";
import {DEFAULT_REST_TIME, DEFAULT_WORK_TIME_LOWER, DEFAULT_WORK_TIME_UPPER} from "../constants";
import {Dimensions, StyleSheet, View} from "react-native";
import {TextH1} from "./styled/text";
import {FlexRowView} from "./styled/view";
import {Button} from "./styled/button";


import RestTime from "./resetTime";
import WorkTime from "./workTime";
import {Card, Divider, Icon, Overlay} from "react-native-elements";
import theme from "../theme";

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


    if (workTimeStart > workTimeEnd) {
        fireChangeWorkTimeEnd(workTimeStart+1)
    }


    const styles = StyleSheet.create({

        card: {
            titleBar: {
                actionsIcon: {
                    container: {
                        position: 'absolute',
                        top: 0,
                        right: 0,
                    }
                },
            },

            containerStyle: {
                borderRadius: theme.borderRadius,
                borderWidth: 1,
                borderColor: theme.colors.secondary,
                padding: 10,
                backgroundColor: theme.colors.tertiary,

                flexDirection: 'column'
            },
            wrapperStyle: {
                // marginTop: 10,
                width: windowWidth,
            },
        },


        setsContainer: {
            marginTop: 10,
        },

        title: {
            containerStyle: {
                height: 30,
                justifyContent: 'center'
            },
        },
        timingContainer: {
            marginLeft: 50,
            marginRight: 50,
            flexDirection: "row",
            justifyContent: 'space-between',
        },

        overlay: {},

        addSet: {
            width: '60%',
            alignSelf: 'center',
            marginTop: 10,
        }
    })

    return (
        <Card containerStyle={styles.card.containerStyle}>
                <Card.Title>{props.exercise.name}</Card.Title>

                <Icon
                    name='menu'
                    onPress={toggleShowWorkActionsOverlay}
                    containerStyle={styles.card.titleBar.actionsIcon.container}
                />
            <Card.Divider />

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

            <View style={styles.setsContainer}>
                {props.sets.map((set, index) => {
                    return <Set key={index} index={index} {...set} workId={props.id}/>
                })}
            </View>

            <Button onPress={fireAddSet} title="Add Set" containerStyle={styles.addSet}/>

            <Overlay
                isVisible={showActionsOverlay}
                onBackdropPress={toggleShowWorkActionsOverlay}
                overlayStyle={styles.overlay}
            >
                <Button onPress={removeWorkByIndex(props.workIndex)} title={`Remove work ${props.workIndex}`} />
                <Button onPress={moveWorkUpByIndex(props.workIndex)} title={`Move work up`} />
                <Button onPress={moveWorkDownByIndex(props.workIndex)} title={`Move work down`} />
            </Overlay>
        </Card>
    )
}

export default Work
