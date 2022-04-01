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
import {selectWorkout} from "../reducers/workoutReducer";
import {selectWork} from "../reducers/workReducer";
import {View} from "react-native";
import {TextBold, TextNormal} from "./styled/text";
import {FlexRowView} from "./styled/view";
import {Button} from "./styled/button";

import theme from '../theme'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {loadSetsByIds, loadWorkByIds} from "../utils/stateUtils";
import {selectSet} from "../reducers/setReducer";
import {isRealValue} from "../utils/utils";
import {playConfiguredTargetWorkSound, playConfiguredWorkSound} from "../services/soundService";
import {ThemeProvider} from "react-native-elements";

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
        // color: theme.colors.tertiary
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


const Timer = () => {
    const timer = useSelector(selectTimer)
    const workout = useSelector(selectWorkout)
    const workState = useSelector(selectWork)
    const setState = useSelector(selectSet)
    const dispatch = useDispatch()

    let currentWork, sets, currentSet
    if (workout.currentWork !== null && workout.currentWork < workout.work.length) {
        const works = loadWorkByIds(workout.work, workState)
        currentWork = works[workout.currentWork]
    }

    if (isRealValue(currentWork) && 0 < currentWork.sets.length) {
        sets = loadSetsByIds(currentWork.sets, setState)
        currentSet = sets.find(s => !s.finished)
    }

    if (currentWork && currentWork.sets.length > 0 && !isRealValue(currentSet) && workout.work.length > 0 && workout.currentWork < workout.work.length) {
        selectWorkAndResetTimer(workout.currentWork + 1, dispatch)
    }

    if (timer.state === TIMER_STATE.setup && timer.count >= DEFAULT_SETUP_TIME) {
        playConfiguredWorkSound()
        dispatch(moveToWork())
    } else if (timer.state === TIMER_STATE.rest && timer.count >= DEFAULT_REST_TIME) {
        playConfiguredWorkSound()
        dispatch(moveToWork())
    }

    if (timer.state === TIMER_STATE.work && (
            timer.count === (currentWork.workTimeStart || DEFAULT_WORK_TIME_LOWER) ||
            timer.count === (currentWork.workTimeEnd || DEFAULT_WORK_TIME_UPPER)
        )
    ) {
        playConfiguredTargetWorkSound()
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
            timerText = work(dispatch, timer.count, currentWork.workTimeStart || DEFAULT_WORK_TIME_LOWER, currentWork.workTimeEnd || DEFAULT_WORK_TIME_UPPER, currentSet);
            break
        case TIMER_STATE.rest:
            timerText = rest(timer.count);
            break
        default:
            timerText = <View><TextNormal>Nothing here</TextNormal></View>
    }

    return (
        <ThemeProvider theme={theme}>
            <View style={styles.container}>
                {timerText}
            </View>
        </ThemeProvider>
    )
}

export default Timer
