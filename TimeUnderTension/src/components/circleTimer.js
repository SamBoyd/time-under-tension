import React, {useState} from 'react'
import {StyleSheet, View} from "react-native";
import {Button} from "./styled/button";
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {standardHorizontalPadding, standardVerticalPadding} from "../theme";
import ReadyTimer from "./timers/readyTimer";
import {useDispatch, useSelector} from "react-redux";
import {NO_ACTIVE_WORK, resetTimerCount, selectTimer} from "../reducers/timerReducer";
import {TIMER_STATE} from "../constants";
import SetupTimer from "./timers/setupTimer";
import {getCurrentTimings} from "../services/workoutStateService";
import {selectWork} from "../reducers/workReducer";
import {selectSet} from "../reducers/setReducer";
import WorkTimer from "./timers/workTimer";
import RestTimer from "./timers/restTimer";
import BlankTimer from "./timers/blankTimer";
import FinishedTimer from "./timers/finishedTimer";
import {selectWorkout} from "../reducers/workoutReducer";
import {selectSettings} from "../reducers/settingsReducer";

const CIRCLE_PADDING = wp(2)
const SHADOW_DISTANCE = wp(0.8)
const CIRCLE_SIZE = wp(50)
const CIRCLE_OFFSET = 2
const CIRCLE_STROKE_WIDTH = 10


const styles = StyleSheet.create({
    container: {
        alignItems: "center",
    },

    button: {
        marginTop: standardVerticalPadding,
        position: 'absolute',
        top: 0,
        left: standardHorizontalPadding,
    }
})

const CircleTimer = props => {
    const workoutState = useSelector(selectWorkout)
    const workState = useSelector(selectWork)
    const setState = useSelector(selectSet)
    const timerState = useSelector(selectTimer)
    const settingsState = useSelector(selectSettings)
    const dispatch = useDispatch()
    const [cb, setCB] = useState(false)

    const reset = () => {
        dispatch(resetTimerCount())
        setCB(!cb)
    }

    const timings = getCurrentTimings(
        dispatch,
        {
            timerState: timerState,
            workoutState: workoutState,
            workState: workState,
            setState: setState,
            settingsState: settingsState,
        }
    )

    let timerComponent, startOn
    if (workoutState.work.length === 0) {
        timerComponent = <BlankTimer title="Add some exercises"/>
    } else if (timerState.activeWorkId === NO_ACTIVE_WORK) {
        timerComponent = <FinishedTimer/>
    } else {
        switch (timerState.state) {
            case TIMER_STATE.ready:
                timerComponent = <ReadyTimer cb={cb}
                                             onPress={timings.onCompleteCB}
                />
                break;
            case TIMER_STATE.setup:
                startOn = Math.floor((new Date() - Date.parse(timerState.enteredStateAt)) / 1000)

                timerComponent = <SetupTimer duration={timings.setupTime}
                                             cb={cb}
                                             onComplete={timings.onCompleteCB}
                                             startOnCount={startOn}
                />
                break;
            case TIMER_STATE.work:
                startOn = Math.floor((new Date() - Date.parse(timerState.enteredStateAt)) / 1000)
                timerComponent = <WorkTimer workTimeStart={timings.workTimeStart}
                                            workTimeEnd={timings.workTimeEnd}
                                            cb={cb}
                                            onComplete={timings.onCompleteCB}
                                            startOnCount={startOn}
                />
                break;
            case TIMER_STATE.rest:
                startOn = Math.floor((new Date() - Date.parse(timerState.enteredStateAt)) / 1000)
                timerComponent = <RestTimer duration={timings.restTime}
                                            cb={cb}
                                            onComplete={timings.onCompleteCB}
                                            startOnCount={startOn}
                />
                break;
        }
    }

    return (
        <View style={styles.container}>
            {timerComponent}
            <Button containerStyle={styles.button} onPress={reset} title="reset"/>
        </View>
    )
}

export default CircleTimer
