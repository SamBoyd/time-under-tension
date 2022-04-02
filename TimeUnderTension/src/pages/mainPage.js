import React from 'react'
import {useDispatch} from "react-redux";
import {StyleSheet, View} from "react-native";

import TemplateWorkouts from "../components/templateWorkouts";
import History from "../components/history";
import {Button} from "../components/styled/button";

import theme, {standardHorizontalPadding, standardVerticalPadding} from '../theme'

import BasePage from "../components/basePage";
import {persistor} from "../store";
import {resetEntireState} from "../utils/resetState";
import {PAGE} from "../constants";

const styles = StyleSheet.create({
    button: {
        marginVertical: standardVerticalPadding,
        marginHorizontal: standardHorizontalPadding,
    },
})

const MainPageButton = props => <View style={styles.button}>
    <Button {...props}/>
</View>

const MainPage = ({navigation}) => {
    const dispatch = useDispatch()

    const newBlankWorkout = () => {
        navigation.navigate(PAGE.workout)
    }

    const clickManageExercises = () => {
        navigation.navigate(PAGE.manageExercises)
    }

    const purgeStore = () => {
        resetEntireState(dispatch)
    }

    return (
        <BasePage>
            <MainPageButton onPress={newBlankWorkout} title="New blank workout"/>

            <TemplateWorkouts navigation={navigation}/>

            <History/>

            <MainPageButton onPress={clickManageExercises} title="Manage Exercises"/>

            <MainPageButton onPress={purgeStore} title="Purge store" />
        </BasePage>
    )
}

export default MainPage;