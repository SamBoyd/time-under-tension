import React, {useEffect} from 'react';
import BackgroundTimer from 'react-native-background-timer';
import {useDispatch, useSelector} from "react-redux";
import {selectTimer} from "../reducers/timerReducer";
import {getCurrentTimings} from "./workoutStateService";
import {selectWorkout} from "../reducers/workoutReducer";
import {selectWork} from "../reducers/workReducer";
import {selectSet} from "../reducers/setReducer";
import {selectSettings} from "../reducers/settingsReducer";
import {TIMER_STATE} from "../constants";

const BackgroundTimerService = props => {
    const timerState = useSelector(selectTimer)
    const workoutState = useSelector(selectWorkout)
    const workState = useSelector(selectWork)
    const setState = useSelector(selectSet)
    const settingsState = useSelector(selectSettings)
    const dispatch = useDispatch()

    useEffect(() => {
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

        let startedAt, endsAt
        BackgroundTimer.runBackgroundTimer(() => {
            switch (timerState.state) {
                case TIMER_STATE.setup:
                    startedAt = new Date(timerState.enteredStateAt)
                    endsAt = new Date(startedAt.getTime() + (timings.setupTime * 1000));

                    if (new Date() >= endsAt) {
                        timings.onCompleteCB()({totalElapsedTime: timings.setupTime})
                        console.log('bingo')
                    } else {
                        console.log('millis left: ' + (endsAt.getTime() - (new Date()).getTime()))
                    }
                    break;

                case TIMER_STATE.rest:
                    startedAt = new Date(timerState.enteredStateAt)
                    endsAt = new Date(startedAt.getTime() + (timings.restTime * 1000));

                    if (new Date() >= endsAt) {
                        timings.onCompleteCB()({totalElapsedTime: timings.restTime})
                        console.log('bingo')
                    } else {
                        console.log('millis left: ' + (endsAt.getTime() - (new Date()).getTime()))
                    }
                    break;
            }
        }, 100);

        return () => {
            console.log('stopping timer')
            BackgroundTimer.stopBackgroundTimer();
        };
    }, [timerState.state])

    return (
        <>{props.children && (props.children) || (props.child)}</>
    )
}

export default BackgroundTimerService