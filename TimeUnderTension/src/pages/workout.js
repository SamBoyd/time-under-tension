import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {SafeAreaView, StyleSheet, View} from "react-native";
import theme, {standardHorizontalPadding, standardVerticalPadding} from '../theme'

import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {selectWorkout} from "../reducers/workoutReducer";
import Work from '../components/work'
import {Button} from "../components/styled/button";
import {WorkoutDuration} from "../components/workoutDuration";
import {selectWork} from "../reducers/workReducer";
import {SAVE_WORK_TO} from "./pickExercise";
import {selectTimer} from "../reducers/timerReducer";
import {PAGE} from "../constants";
import CircleTimer from "../components/circleTimer";
import {FlexRowView, ScrollView} from "../components/styled/view";
import {Shadow} from "react-native-shadow-2";
import {loadWorkByIds} from "../utils/stateUtils";
import {finishWorkoutAndCreateHistoryAction} from "../reducers/actions";

const Workout = ({navigation}) => {
    const dispatch = useDispatch()
    const workout = useSelector(selectWorkout)
    const workState = useSelector(selectWork)
    const timerState = useSelector(selectTimer)

    const work = loadWorkByIds(workout.work, workState)

    const goBack = () => {
        navigation.goBack()
    }

    const finishWorkout = () => {
        finishWorkoutAndCreateHistoryAction(dispatch, workout)
        goBack()
    }

    const addNewWork = () => {
        navigation.push(
            PAGE.pickExercise,
            {saveWorkTo: SAVE_WORK_TO.workout}
        )
    }

    const styles = StyleSheet.create({
        wrapper: {
            flex: 1,
            height: hp(100),
            backgroundColor: theme.colors.tertiary
        },

        timerBanner: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: wp(100),
            height: hp(40),
            borderBottomWidth: 1,
            borderBottomColor: theme.colors.grey0,

            shadow: {
                position: 'absolute',
                top: 0,
                left: 0,
                width: wp(100),
                height: hp(40),
                zIndex: 100,
            }
        },

        actionButtonsContainer: {
            justifyContent: "space-between",
            paddingHorizontal: standardHorizontalPadding,
            paddingTop: hp(2),
        },

        bottomView: {
            position: 'absolute',
            top: hp(40),
            left: 0,
            width: wp(100),
            height: hp(54),

            flex: 1,
            backgroundColor: theme.colors.tertiary,
            paddingLeft: wp(5),
            paddingRight: wp(5),
        },

        scrollContent: {
            paddingBottom: 200,
        },

        addWorkButton: {
            marginTop: standardVerticalPadding,
            paddingHorizontal: standardHorizontalPadding,
            alignSelf: "center",
        }
    })

    const workComponents = work.map((work, i) => {
        return (
            <Work
                {...work}
                key={i}
                workIndex={i}
                active={timerState.activeWorkId === work.id}
            />
        )
    })

    const workoutStarted = workout.started_at !== null

    const finishButton = workoutStarted
        ? <Button onPress={finishWorkout} title="finish"/>
        : <View></View>;

    return (
        <SafeAreaView style={styles.wrapper}>
            <Shadow
                sides={['bottom']}
                distance={hp(1)}
                startColor={theme.colors.white}
                viewStyle={styles.timerBanner.shadow}
            >
                <View style={styles.timerBanner}>
                    <FlexRowView viewStyle={styles.actionButtonsContainer}>
                        <Button title="back" onPress={goBack}/>
                        {finishButton}
                    </FlexRowView>
                    <CircleTimer/>
                </View>
            </Shadow>
            <View style={styles.bottomView}>
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    {workoutStarted && <WorkoutDuration startedAt={workout.started_at}/>}

                    {workComponents}

                    <Button onPress={addNewWork} title="Add work" containerStyle={styles.addWorkButton}/>
                </ScrollView>
            </View>
        </SafeAreaView>

    )
}

export default Workout
