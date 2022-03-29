import React, {useState} from "react";
import {useDispatch} from "react-redux";

import Set from './set'
import {addSet, changeRestTime, moveWorkDown, moveWorkUp, removeWork} from "../reducers/workoutReducer";
import {DEFAULT_REST_TIME, DEFAULT_WORK_TIME_LOWER, DEFAULT_WORK_TIME_UPPER} from "../constants";
import {Dimensions, StyleSheet, View} from "react-native";
import {FlexRowView} from "./styled/view";
import {Button} from "./styled/button";


import RestTime from "./restTime";
import WorkTime from "./workTime";
import {Card, Icon, Overlay} from "react-native-elements";
import theme from "../theme";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';

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

    const styles = StyleSheet.create({
        card: {
            titleBar: {
                actionsIcon: {
                    container: {
                        position: 'absolute',
                        top: hp(1),
                        right: hp(1),
                    }
                },
            },

            containerStyle: {
                borderRadius: theme.borderRadius,
                borderWidth: 1,
                borderColor: theme.colors.secondary,
                padding: wp(0),
                backgroundColor: theme.colors.tertiary,

                flexDirection: 'column'
            },
            wrapperStyle: {
                width: wp(100),
            },
        },


        setsContainer: {
            marginTop: hp(0),
        },

        title: {
            containerStyle: {
                paddingTop: hp(2)
            },
        },
        timingContainer: {
            paddingHorizontal: wp(6),
            flexDirection: "row",
            justifyContent: 'space-between',
        },

        overlay: {},

        addSet: {
            width: '60%',
            alignSelf: 'center',
            marginTop: hp(1),
        }
    })

    let active = -1
    for (const [i, set] of props.sets.entries()) {
        if (!set.finished) {
            active = i
            break;
        }
    }

    return (
        <Card containerStyle={styles.card.containerStyle}>

            <Card.Title style={styles.title.containerStyle}>{props.exercise.name}</Card.Title>

            <Icon
                name='menu'
                onPress={toggleShowWorkActionsOverlay}
                containerStyle={styles.card.titleBar.actionsIcon.container}
            />
            <Card.Divider/>

            <FlexRowView viewStyle={styles.timingContainer}>
                <RestTime
                    onChangeText={fireChangeRestTime}
                    value={restTime}
                />

                <WorkTime
                    workId={props.id}
                    workTimeStart={workTimeStart}
                    workTimeEnd={workTimeEnd}
                />
            </FlexRowView>

            <View style={styles.setsContainer}>
                {props.sets.map((set, index) => {
                    return <Set
                        key={index}
                        index={index}
                        {...set}
                        workId={props.id}
                        active={props.active && active === index}
                    />
                })}
            </View>

            <Button onPress={fireAddSet} title="Add Set" containerStyle={styles.addSet}/>

            <Overlay
                isVisible={showActionsOverlay}
                onBackdropPress={toggleShowWorkActionsOverlay}
                overlayStyle={styles.overlay}
            >
                <Button onPress={removeWorkByIndex(props.workIndex)} title={`Remove work ${props.workIndex}`}/>
                <Button onPress={moveWorkUpByIndex(props.workIndex)} title={`Move work up`}/>
                <Button onPress={moveWorkDownByIndex(props.workIndex)} title={`Move work down`}/>
            </Overlay>
        </Card>
    )
}

export default Work
