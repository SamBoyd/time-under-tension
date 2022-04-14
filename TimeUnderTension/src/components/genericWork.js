import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import Set from './set'
import {DEFAULT_REST_TIME} from "../constants";
import {Dimensions, StyleSheet, View} from "react-native";
import {FlexRowView} from "./styled/view";
import {Button} from "./styled/button";
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'


import RestTime from "./restTime";
import WorkTime from "./workTime";
import {Card, Icon, ThemeProvider} from "react-native-elements";
import theme from "../theme";
import {selectSet} from "../reducers/setReducer";
import {loadSetsByIds} from "../utils/stateUtils";
import {changeActiveWork, resetTimer, selectTimer} from "../reducers/timerReducer";
import EditWorkOverlay from "./editWorkOverlay";
import {isRealValue} from "../utils/utils";
import {selectSettings} from "../reducers/settingsReducer";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const GenericWork = props => {
    const [showActionsOverlay, setShowActionsOverlay] = useState(false)
    const dispatch = useDispatch()
    const settingsState = useSelector(selectSettings)
    const timerState = useSelector(selectTimer)
    const setState = useSelector(selectSet)
    const sets = loadSetsByIds(props.sets, setState)

    const restTime = isRealValue(props.restTime) ? props.restTime : DEFAULT_REST_TIME;
    const workTimeStart = isRealValue(props.workTimeStart) ? props.workTimeStart : settingsState.defaultWorkTimeStart;
    const workTimeEnd = isRealValue(props.workTimeEnd) ? props.workTimeEnd : settingsState.defaultWorkTimeEnd;

    const toggleShowWorkActionsOverlay = () => {
        setShowActionsOverlay(!showActionsOverlay)
    }

    const changeActiveWorkPress = () => {
        if (timerState.activeWorkId !== props.id) {
            dispatch(changeActiveWork(props.id))
            dispatch(resetTimer())
        }
    }

    const styles = StyleSheet.create({
        card: {
            titleBar: {
                actionsIcon: {
                    container: {}
                },

                container: {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                },

                text: {
                    color: theme.colors.white,
                    // fontFamily: theme.fontFamily,
                },

                changeActiveWorkButton: {
                    color: theme.colors.white,
                },
            },

            containerStyle: {
                backgroundColor: theme.colors.tertiary,
                borderRadius: theme.borderRadius,
                borderWidth: 0,
            },
            wrapperStyle: {
                // marginTop: 10,
                width: windowWidth,
            },

        },

        setsContainer: {
            marginTop: 0,
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

    const showChangeActiveButton = props.displayChangeActiveWork && !props.active && sets.some(s => !s.finished)
    return (
        <ThemeProvider theme={theme}>
            <View style={styles.card.containerStyle}>
                <View style={styles.card.titleBar.container}>

                    <Card.Title style={styles.card.titleBar.text}>{props.exercise.name}</Card.Title>

                    <FlexRowView>
                        {showChangeActiveButton && (
                            <MaterialCommunityIcon
                                name='target'
                                onPress={changeActiveWorkPress}
                                containerStyle={styles.card.titleBar.changeActiveWorkButton}
                                color={theme.Icon.color}
                                size={theme.Icon.size}
                            />
                        )}

                        <Icon
                            name='menu'
                            onPress={toggleShowWorkActionsOverlay}
                            containerStyle={styles.card.titleBar.actionsIcon.container}
                        />
                    </FlexRowView>
                </View>

                <Card.Divider/>

                <WorkTime
                    workTimeStart={workTimeStart}
                    workTimeEnd={workTimeEnd}
                />

                <RestTime value={restTime}/>

                <View style={styles.setsContainer}>
                    {sets.map((set, index) => {
                        return <Set
                            key={index}
                            index={index + 1}
                            {...set}
                            workId={props.id}
                            workName={props.exercise.name}
                            workTimeStart={workTimeStart}
                            workTimeEnd={workTimeEnd}
                            active={props.active && active === index}
                            fireRemoveSet={props.fireRemoveSet}
                            previousSet={props.previousSets[index]}
                        />
                    })}
                </View>

                <Button onPress={props.fireAddSet} title="Add Set" containerStyle={styles.addSet}/>


                {showActionsOverlay && (
                    <EditWorkOverlay
                        workId={props.id}
                        workName={props.exercise.name}
                        workTimeStart={workTimeStart}
                        workTimeEnd={workTimeEnd}
                        restTime={restTime}
                        toggleOverlay={toggleShowWorkActionsOverlay}
                        removeWork={props.removeWork}
                        moveWorkUp={props.moveWorkUp}
                        moveWorkDown={props.moveWorkDown}
                    />
                )}
            </View>
        </ThemeProvider>
    )
}

export default GenericWork
