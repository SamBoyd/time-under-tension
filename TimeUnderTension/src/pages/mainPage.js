import React from 'react'
import {useDispatch} from "react-redux";
import {Dimensions, StyleSheet} from "react-native";

import {moveToManageExercises, moveToWorkout} from "../reducers/uiStateReducer";
import TemplateWorkouts from "../components/templateWorkouts";
import History from "../components/history";
import {ScrollView, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {Button} from "../components/styled/button";
import Header from "../components/header"

import theme from '../theme'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },

    scrollWrapper: {
        flex: 1,
        backgroundColor: theme.colors.tertiary,
        paddingLeft: 20,
        paddingRight: 20,
        height: windowHeight,
    },

    newWorkoutButton: {
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
    },

    manageExercisesButton: {
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 100,
    },
})

function MainPage() {
    const dispatch = useDispatch()

    const newBlankWorkout = () => {
        dispatch(moveToWorkout())
    }

    const clickManageExercises = () => {
        dispatch(moveToManageExercises())
    }

    return (
        <SafeAreaView style={styles.wrapper}>
            <Header />
            <View style={styles.scrollWrapper}>
                <ScrollView>
                    <View style={styles.newWorkoutButton}>
                        <Button onPress={newBlankWorkout} title="New blank workout" />
                    </View>

                    <TemplateWorkouts />

                    <History />

                    <View style={styles.manageExercisesButton}>
                        <Button onPress={clickManageExercises} title="Manage Exercises" />
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default MainPage;