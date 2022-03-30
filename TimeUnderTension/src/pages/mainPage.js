import React from 'react'
import {useDispatch} from "react-redux";
import {StyleSheet, View} from "react-native";

import {moveToManageExercises, moveToWorkout} from "../reducers/uiStateReducer";
import TemplateWorkouts from "../components/templateWorkouts";
import History from "../components/history";
import {Button} from "../components/styled/button";

import theme, {standardHorizontalPadding, standardVerticalPadding} from '../theme'

import BasePage from "../components/basePage";
import {persistor} from "../store";
import {resetEntireState} from "../utils/resetState";

const styles = StyleSheet.create({
    button: {
        marginVertical: standardVerticalPadding,
        marginHorizontal: standardHorizontalPadding,
    },
})

const MainPageButton = props => <View style={styles.button}>
    <Button {...props}/>
</View>

function MainPage() {
    const dispatch = useDispatch()

    const newBlankWorkout = () => {
        dispatch(moveToWorkout())
    }

    const clickManageExercises = () => {
        dispatch(moveToManageExercises())
    }

    const purgeStore = () => {
        resetEntireState(dispatch)
    }

    return (
        <BasePage>
            <MainPageButton onPress={newBlankWorkout} title="New blank workout"/>

            <TemplateWorkouts/>

            <History/>

            <MainPageButton onPress={clickManageExercises} title="Manage Exercises"/>

            <MainPageButton onPress={purgeStore} title="Purge store" />
        </BasePage>
    )
}

export default MainPage;