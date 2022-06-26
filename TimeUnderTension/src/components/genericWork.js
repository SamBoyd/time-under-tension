import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import Set from './set'
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
import {changeActiveWork, resetTimerCount, selectTimer} from "../reducers/timerReducer";
import EditWorkOverlay from "./editWorkOverlay";
import {selectSettings} from "../reducers/settingsReducer";
import WarmupSet from "./warmupSet";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const GenericWork = props => {
    const [showActionsOverlay, setShowActionsOverlay] = useState(false)
    const dispatch = useDispatch()
    const settingsState = useSelector(selectSettings)
    const timerState = useSelector(selectTimer)
    const setState = useSelector(selectSet)
    const sets = loadSetsByIds(props.sets, setState)
    const numWarmupSets = sets.filter(s => s.warmupSet).length

    const restTime = props.restTime !== null ? props.restTime : settingsState.defaultRestTime;
    const workTimeStart = props.restTime !== null ? props.workTimeStart : settingsState.defaultWorkTimeStart;
    const workTimeEnd = props.restTime !== null ? props.workTimeEnd : settingsState.defaultWorkTimeEnd;

    const toggleShowWorkActionsOverlay = () => {
        setShowActionsOverlay(!showActionsOverlay)
    }

    const changeActiveWorkPress = () => {
        if (timerState.activeWorkId !== props.id) {
            dispatch(changeActiveWork(props.id))
            dispatch(resetTimerCount())
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

        addSetButtonContainers: {
            width: '100%',
            justifyContent: 'space-around'
        },

        addSet: {
            width: '60%',
            alignSelf: 'center',
            marginTop: 10,
        },

        addWarmUpSet: {
            width: '20%',
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

    const getSet = (index, set) => {
        if (set.warmupSet) {
            return <WarmupSet
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
        }

        return <Set
            key={index}
            index={index + 1 - numWarmupSets}
            {...set}
            workId={props.id}
            workName={props.exercise.name}
            workTimeStart={workTimeStart}
            workTimeEnd={workTimeEnd}
            active={props.active && active === index}
            fireRemoveSet={props.fireRemoveSet}
            previousSet={props.previousSets[index]}
        />
    }

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
                            testId='toggleEditWork'
                        />
                    </FlexRowView>
                </View>

                <Card.Divider/>

                <WorkTime
                    workId={props.id}
                    workTimeStart={workTimeStart}
                    workTimeEnd={workTimeEnd}
                />

                <RestTime workId={props.id} value={restTime}/>

                <View style={styles.setsContainer}>
                    {sets.map((set, index) => {
                        return getSet(index, set)
                    })}
                </View>

                <FlexRowView viewStyle={styles.addSetButtonContainers}>
                    <Button onPress={props.fireAddSet} title="Add Set" containerStyle={styles.addSet}/>
                    <Button onPress={props.fireAddWarmupSet} title="+WU" containerStyle={styles.addWarmUpSet}/>
                </FlexRowView>


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
