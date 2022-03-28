import React, {useEffect} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {incrementCount, moveToSetup, moveToWork, selectTimer} from "../reducers/timerReducer";
import {finishSetAction, moveToSetupAndStartWorkout, selectWorkAndResetTimer} from "../reducers/actions";

import {
    DEFAULT_REST_TIME,
    DEFAULT_SETUP_TIME,
    DEFAULT_WORK_TIME_LOWER,
    DEFAULT_WORK_TIME_UPPER,
    TIMER_STATE
} from "../constants";
import {selectWork, selectWorkout} from "../reducers/workoutReducer";
import {View} from "react-native";
import {TextBold, TextNormal} from "./styled/text";
import {FlexRowView} from "./styled/view";
import {Button} from "./styled/button";

import theme from '../theme'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: wp(100),
        height: hp(10),

        borderTopWidth: 2,
        borderColor: theme.colors.primary,
        backgroundColor: theme.colors.secondary,

        alignItems: "center",
        alignContent: "space-between",
        justifyContent: "space-around",
    },

    text: {
        color: theme.colors.tertiary
    },

    statusContainer: {},

    textContainer: {
        alignSelf: "center"
    },

    buttonContainer: {},
})

const timerText = state => <FlexRowView viewStyle={styles.textContainer}>
    <TextBold fontStyle={styles.text}>{state}</TextBold>
</FlexRowView>

const ready = dispatch => {
    const click = () => {
        moveToSetupAndStartWorkout(dispatch)
    }
    return (
        <View style={styles.statusContainer}>
            {timerText('Ready')}
            <View style={styles.buttonContainer}>
                <Button onPress={click} title="Click to start"/>
            </View>
        </View>
    )
}

const setup = count => {
    return timerText(`Setup - ${count}`)
}


const work = (dispatch, count, lower, upper, set) => {
    return (
        <>
            {timerText(`Work - ${count} (${lower}s -> ${upper}s)`)}
            <View style={styles.buttonContainer}>
                <Button onPress={finishSetAction(dispatch, set)} title="Finish"/>
            </View>
        </>
    )
}

const rest = count => {
    return timerText(`Rest - ${count}`)
}

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
    } else if (timer.state === TIMER_STATE.rest && timer.count >= DEFAULT_REST_TIME) {
        dispatch(moveToWork())
    }

    useEffect(() => {
        const interval = setInterval(() => dispatch(incrementCount()), 1000);
        return () => clearInterval(interval);
    }, []);

    if (workout.work.length === 0) {
        return <></>
    }

    let timerText
    switch (timer.state) {
        case TIMER_STATE.ready:
            timerText = ready(dispatch);
            break
        case TIMER_STATE.setup:
            timerText = setup(timer.count);
            break
        case TIMER_STATE.work:
            timerText = work(dispatch, timer.count, DEFAULT_WORK_TIME_LOWER, DEFAULT_WORK_TIME_UPPER, nextSet);
            break
        case TIMER_STATE.rest:
            timerText = rest(timer.count);
            break
        default:
            timerText = <View>Nothing here</View>
    }

    return (
        <View style={styles.container}>
            {timerText}
        </View>
    )
}

export default Timer
