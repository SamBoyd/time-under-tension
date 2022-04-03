import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {SafeAreaView, ScrollView, StyleSheet, View} from "react-native";
import theme, {standardHorizontalPadding, standardVerticalPadding} from '../theme'

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {resetToInitialWorkout, selectWorkout} from "../reducers/workoutReducer";
import Work from '../components/work'
import {Button} from "../components/styled/button";
import BasePage from "../components/basePage";
import {WorkoutDuration} from "../components/workoutDuration";
import {selectWork} from "../reducers/workReducer";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import PickExercise, {SAVE_WORK_TO} from "./pickExercise";
import {addWorkoutToHistory} from "../reducers/workoutHistoryReducer";
import {resetTimer} from "../reducers/timerReducer";
import {PAGE} from "../constants";
import CircleTimer from "../components/circleTimer";
import {Shadow} from "react-native-shadow-2";

const Workout = ({navigation}) => {
    const dispatch = useDispatch()
    const workout = useSelector(selectWorkout)
    const workState = useSelector(selectWork)

    const work = workout.work.map(workId => {
        return workState.find(w => w.id === workId)
    })

    const goBack = () => {
        navigation.goBack()
    }

    const finishWorkout = () => {
        const w = {...workout}
        w.finished_at = new Date().toISOString()
        dispatch(addWorkoutToHistory({workout: w}))
        dispatch(resetToInitialWorkout())
        dispatch(resetTimer())
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
        },

        bottomView: {
            position: 'absolute',
            top: hp(40),
            left: 0,
            width: wp(100),
            height: hp(50),

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
                active={workout.currentWork === i}
            />
        )
    })

    const workoutStarted = workout.started_at !== null

    const finishButton = workoutStarted
        ? <Button onPress={finishWorkout} title="finish" containerStyle={styles.finishButton}/>
        : <View></View>;

    return (
        <SafeAreaView style={styles.wrapper}>
            <View style={styles.timerBanner}>
                {finishButton}

                <CircleTimer/>
            </View>

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

const WorkoutNav = ({navigation}) => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                animation: "slide_from_bottom",
            }}
        >
            <Stack.Screen name={PAGE.workout} component={Workout}/>
            <Stack.Screen name={PAGE.pickExercise} component={PickExercise}/>
        </Stack.Navigator>
    )
}

export default WorkoutNav
