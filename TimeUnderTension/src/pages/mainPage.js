import React from 'react'
import {useDispatch} from "react-redux";
import {Dimensions, StyleSheet, View} from "react-native";

import {moveToManageExercises, moveToWorkout} from "../reducers/uiStateReducer";
import TemplateWorkouts from "../components/templateWorkouts";
import History from "../components/history";
import {Button} from "../components/styled/button";

import theme, {standardHorizontalPadding, standardVerticalPadding} from '../theme'

import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import BasePage from "../components/basePage";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const styles = StyleSheet.create({
    button: {
        marginTop: standardVerticalPadding,
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

    return (
        <BasePage>
            <MainPageButton onPress={newBlankWorkout} title="New blank workout"/>

            <TemplateWorkouts/>

            <History/>

            <MainPageButton onPress={clickManageExercises} title="Manage Exercises"/>
        </BasePage>
    )
}

export default MainPage;