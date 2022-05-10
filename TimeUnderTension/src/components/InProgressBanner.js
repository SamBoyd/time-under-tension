import React, {useEffect, useRef, useState} from 'react';
import {FlexColumnView, FlexRowView} from "./styled/view";
import {TextNormal} from "./styled/text";
import {WorkoutDuration} from "./workoutDuration";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import {Pressable, StyleSheet, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {selectWorkout, startWorkoutIfNotStarted} from "../reducers/workoutReducer";
import {PAGE, TIMER_STATE} from "../constants";
import theme, {standardVerticalPadding} from "../theme";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {selectTimer} from "../reducers/timerReducer";
import {shortEnglishHumanizer} from "../utils/utils";
import ProgressBar from "./ProgressBar";
import {selectSettings} from "../reducers/settingsReducer";
import {getRestTimeOfActiveWork, getWorkTimeOfActiveWork} from "../utils/stateUtils";
import {selectSet} from "../reducers/setReducer";
import {selectWork} from "../reducers/workReducer";
import {getCurrentTimings} from "../services/workoutStateService";

const InProgressBanner = ({navigation, phase, enteredStateAt}) => {
    const workoutState = useSelector(selectWorkout)
    const timerState = useSelector(selectTimer)
    const settingsState = useSelector(selectSettings)
    const workState = useSelector(selectWork)
    const setState = useSelector(selectSet)
    const dispatch = useDispatch()

    const [duration, setDuration] = useState(0)
    const [percent, setPercent] = useState(0)

    const intervalId = useRef(null)


    const restTime = 0
    const setupTime = 0
    const workTimeStart = 0
    const workTimeEnd = 0
    const onCompleteCB = () => () => {}

    if (workoutState.work.length > 0) {
        const workTimeOfActiveWork = getWorkTimeOfActiveWork()
        const restTimeOfActiveWork = getRestTimeOfActiveWork()

        const {
            restTime,
            setupTime,
            workTimeStart,
            workTimeEnd,
            onCompleteCB
        } = getCurrentTimings(
            dispatch,
            {
                timerState: timerState,
                workoutState: workoutState,
                workState: workState,
                setState: setState,
                settingsState: settingsState,
            }
        )
    }

    useEffect(() => {
        if (intervalId.current !== null) {
            clearInterval(intervalId.current);
        }
        const tick = () => {
            setDuration((Date.now() - Date.parse(enteredStateAt)) / 1000)
        }
        intervalId.current = setInterval(tick, 100);
    }, [phase]);

    useEffect(() => {
        let percent = 1

        switch (phase) {
            case TIMER_STATE.ready:
                break;
            case TIMER_STATE.setup:
                percent = (duration / setupTime) * 100
                break;
            case TIMER_STATE.work:
                percent = (duration / workTimeEnd) * 100
                break;
            case TIMER_STATE.rest:
                percent = (duration / restTime) * 100
                break;
        }

        if (0 <= percent && percent <= 100) {
            setPercent(percent)
        } else {
            if (phase !== TIMER_STATE.work) {
                onCompleteCB(0)(duration * 1000)
            }
        }
    }, [duration])

    const moveToWorkout = () => {
        dispatch(startWorkoutIfNotStarted())
        navigation.navigate(PAGE.workout)
    }

    const styles = StyleSheet.create({
        container: {
            // justifyContent: 'space-between',
            height: hp(12),

            alignItems: 'center',
            backgroundColor: theme.colors.grey1,
            marginVertical: standardVerticalPadding,
            paddingHorizontal: wp(3),
            paddingVertical: standardVerticalPadding,

            borderRadius: theme.borderRadius
        },

        progressContainer: {
            flex: 2,
            // alignItems: 'center',
        },

        timingContainer: {
            flex: 2,
            justifyContent: 'space-between',
            alignItems: 'center',
        },

        arrow: {
            color: theme.colors.white
        },

        progressRight: {

        },
    })


    return (
        <Pressable onPressIn={moveToWorkout}>
            <FlexRowView viewStyle={styles.container}>
                <ProgressBar precent={percent} />
                <FlexColumnView viewStyle={styles.progressContainer}>
                    <TextNormal>Workout in progress</TextNormal>
                    <TextNormal>{timerState.state}</TextNormal>
                </FlexColumnView>
                <FlexColumnView viewStyle={styles.timingContainer}>
                    <FlexRowView>
                        <WorkoutDuration startedAt={workoutState.started_at}/>
                        <FontAwesome5Icon name="chevron-right" style={styles.arrow}/>
                    </FlexRowView>
                    <View><TextNormal>{shortEnglishHumanizer(duration * 1000, {round: true})}</TextNormal></View>
                </FlexColumnView>
            </FlexRowView>
        </Pressable>
    )
};

export default InProgressBanner;
