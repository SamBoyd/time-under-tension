import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";

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
import {FlexColumnView, FlexRowView} from "./styled/view";
import {Button} from "./styled/button";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';


import RestTime from "./restTime";
import WorkTime from "./workTime";
import {Card, Divider, Icon, Overlay, ThemeProvider} from "react-native-elements";
import theme from "../theme";
import {selectSet} from "../reducers/setReducer";
import {loadSetsByIds} from "../utils/stateUtils";
import {TextH1} from "./styled/text";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const GenericWork = props => {
    const [showActionsOverlay, setShowActionsOverlay] = useState(false)
    const dispatch = useDispatch()
    const setState = useSelector(selectSet)
    const sets = loadSetsByIds(props.sets, setState)

    const restTime = props.restTime || DEFAULT_REST_TIME;
    const workTimeStart = props.workTimeStart || DEFAULT_WORK_TIME_LOWER;
    const workTimeEnd = props.workTimeEnd || DEFAULT_WORK_TIME_UPPER;

    const toggleShowWorkActionsOverlay = () => {
        setShowActionsOverlay(!showActionsOverlay)
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
                text: {
                    color: theme.colors.white
                }
            },

            containerStyle: {
                backgroundColor: theme.colors.grey0,
                borderRadius: theme.borderRadius,
                borderWidth: 0,
                padding: 10,

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

        overlay: {
            backdrop: {
                backgroundColor: 'rgba(20, 14, 8, 0.8)',
            },
            view: {
                minWidth: wp(50),
                backgroundColor: theme.colors.tertiary
            },

        },

        addSet: {
            width: '60%',
            alignSelf: 'center',
            marginTop: 10,
        }
    })

    let active = -1
    for (const [i, set] of sets.entries()) {
        if (!set.finished) {
            active = i
            break;
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Card containerStyle={styles.card.containerStyle}>
                <Card.Title style={styles.card.titleBar.text}>{props.exercise.name}</Card.Title>

                <Icon
                    name='menu'
                    onPress={toggleShowWorkActionsOverlay}
                    containerStyle={styles.card.titleBar.actionsIcon.container}
                />
                <Card.Divider/>

                <FlexRowView viewStyle={styles.timingContainer}>
                    <RestTime
                        onChangeText={props.fireChangeRestTime}
                        value={restTime}
                    />

                    <WorkTime
                        workTimeStart={workTimeStart}
                        workTimeEnd={workTimeEnd}
                        fireChangeWorkTimeStart={props.fireChangeWorkTimeStart}
                        fireChangeWorkTimeEnd={props.fireChangeWorkTimeEnd}
                    />
                </FlexRowView>

                <View style={styles.setsContainer}>
                    {sets.map((set, index) => {
                        return <Set
                            key={index}
                            index={index}
                            {...set}
                            workId={props.id}
                            active={props.active && active === index}
                            fireRemoveSet={props.fireRemoveSet}
                        />
                    })}
                </View>

                <Button onPress={props.fireAddSet} title="Add Set" containerStyle={styles.addSet}/>

                <Overlay
                    isVisible={showActionsOverlay}
                    onBackdropPress={toggleShowWorkActionsOverlay}
                    overlayStyle={styles.overlay.view}
                    backdropStyle={styles.overlay.backdrop}
                >
                    <FlexColumnView rowGap={theme.internalPadding}>
                        <TextH1>{props.exercise.name}</TextH1>
                        <Button onPress={props.removeWorkByIndex(props.workIndex)}
                                title={`Remove`}/>
                        <Button onPress={props.moveWorkUpByIndex(props.workIndex)} title={`Move up`}/>
                        <Button onPress={props.moveWorkDownByIndex(props.workIndex)} title={`Move down`}/>
                    </FlexColumnView>
                </Overlay>
            </Card>
        </ThemeProvider>
    )
}

export default GenericWork
