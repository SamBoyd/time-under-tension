import React from 'react'
import {useDispatch} from "react-redux";
import {StyleSheet, View} from "react-native";

import TemplateWorkouts from "../components/templateWorkouts";
import {Button} from "../components/styled/button";

import {standardHorizontalPadding, standardVerticalPadding} from '../theme'

import BasePage from "../components/basePage";
import {resetEntireState} from "../utils/resetState";
import {PAGE} from "../constants";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import PickExercise from "./pickExercise";
import Workout from "./workout";
import CreateTemplateWorkout from "./createTemplateWorkout";

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

    const purgeStore = () => {
        resetEntireState(dispatch)
    }

    return (
        <BasePage>
            <MainPageButton onPress={newBlankWorkout} title="New blank workout"/>

            <TemplateWorkouts navigation={navigation}/>

            <MainPageButton onPress={purgeStore} title="Purge store"/>
        </BasePage>
    )
}

const MainPageNav = ({navigation}) => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                animation: "slide_from_bottom",
            }}
        >
            <Stack.Screen name={PAGE.main} component={MainPage}/>
            <Stack.Screen name={PAGE.workout} component={Workout}/>
            <Stack.Screen name={PAGE.pickExercise} component={PickExercise}/>
            <Stack.Screen name={PAGE.createTemplateWorkout} component={CreateTemplateWorkout}/>
        </Stack.Navigator>
    )
}
export default MainPageNav;
