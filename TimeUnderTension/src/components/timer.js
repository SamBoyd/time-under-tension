import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {incrementCount, moveToSetup, moveToWork, selectTimer} from "../reducers/timerReducer";
import {finishSetAction, selectWorkAndResetTimer} from "../reducers/actions";

import {
    DEFAULT_REST_TIME,
    DEFAULT_SETUP_TIME,
    DEFAULT_WORK_TIME_LOWER,
    DEFAULT_WORK_TIME_UPPER,
    TIMER_STATE
} from "../constants";
import {selectWork, selectWorkout} from "../reducers/workoutReducer";
import {Button, Text, View} from "react-native";


const ready = dispatch => {
    const click = () => {
        dispatch(moveToSetup())
    }
    return (
        <View>
            <Text>Timer</Text>
            <Text>Ready</Text>
            <Button onPress={click} title="Click to start" />
        </View>
    )
}

const setup = count => {
    return (
        <View>
            <Text>Timer</Text>
            <Text>Setup - {count}</Text>
        </View>
    )
}

const work = (dispatch, count, lower, upper, set) => {
    return (
        <View>
            <Text>Timer</Text>
            <Text>Work - {count}</Text>
            <Text>{lower}s -> {upper}s</Text>
            <Button onPress={finishSetAction(dispatch, set)} title="Finish"/>
        </View>
    )
}

const rest = count => {
    return (
        <View>
            <Text>Timer</Text>
            <Text>Rest - {count}</Text>
        </View>
    )}

const findNextSet = workout => {
    const work = workout.work[workout.currentWork]
    if (work) {
        for (const si in work.sets) {
            const set = work.sets[si]
            if (!set.finished) {
                return set
            }
        }
    }
}

const Timer = () => {
    const timer = useSelector(selectTimer)
    const workout = useSelector(selectWorkout)
    const dispatch = useDispatch()

    const nextSet = findNextSet(workout)

    if (!nextSet && workout.work.length > 0) {
        selectWorkAndResetTimer(workout.currentWork + 1, dispatch)
    }

    if (timer.state === TIMER_STATE.setup && timer.count >= DEFAULT_SETUP_TIME) {
        dispatch(moveToWork())
    } else if (timer.state === TIMER_STATE.rest && timer.count >= DEFAULT_REST_TIME)  {
        dispatch(moveToWork())
    }

    useEffect(() => {
        const interval = setInterval(() => dispatch(incrementCount()), 1000);
        return () => clearInterval(interval);
    }, []);

    if (workout.work.length === 0) {
        return <View></View>
    }

    switch (timer.state) {
        case TIMER_STATE.ready:
            return ready(dispatch);
            break;
        case TIMER_STATE.setup:
            return setup(timer.count);
            break;
        case TIMER_STATE.work:
            return work(dispatch, timer.count, DEFAULT_WORK_TIME_LOWER, DEFAULT_WORK_TIME_UPPER, nextSet);
            break;
        case TIMER_STATE.rest:
            return rest(timer.count);
            break;
        default:
            return <View>Nothing here</View>
    }
}

export default Timer
