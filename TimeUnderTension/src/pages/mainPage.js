import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import {Pressable, StyleSheet, View} from "react-native";

import TemplateWorkouts from "../components/templateWorkouts";
import {Button} from "../components/styled/button";

import theme, {standardHorizontalPadding, standardVerticalPadding} from '../theme'

import BasePage from "../components/basePage";
import {resetEntireState} from "../utils/resetState";
import {PAGE} from "../constants";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import PickExercise from "./pickExercise";
import Workout from "./workout";
import CreateTemplateWorkout from "./createTemplateWorkout";
import {selectWorkout} from "../reducers/workoutReducer";
import {isRealValue} from "../utils/utils";
import {FlexRowView} from "../components/styled/view";
import {WorkoutDuration} from "../components/workoutDuration";
import {TextNormal} from "../components/styled/text";
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import AddExercise from "./addExercise";


const styles = StyleSheet.create({
    button: {
        marginVertical: standardVerticalPadding,
        marginHorizontal: standardHorizontalPadding,
    },

    activeWorkout: {
        container: {
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: theme.colors.grey1,
            marginVertical: standardVerticalPadding,
            paddingHorizontal: wp(3),
            paddingVertical: standardVerticalPadding,

            borderRadius: theme.borderRadius
        },

        arrow: {
            color: theme.colors.white
        }
    }
})

const MainPageButton = props => <View style={styles.button}>
    <Button {...props}/>
</View>

const MainPage = ({navigation}) => {
    const workoutState = useSelector(selectWorkout)
    const dispatch = useDispatch()

    const moveToWorkout = () => {
        navigation.navigate(PAGE.workout)
    }

    const purgeStore = () => {
        resetEntireState(dispatch)
    }

    return (
        <BasePage>
            {!isRealValue(workoutState.started_at) && (
                <MainPageButton onPress={moveToWorkout} title="New blank workout"/>
            ) || (
                <Pressable onPressIn={moveToWorkout}>
                    <FlexRowView viewStyle={styles.activeWorkout.container}>
                        <TextNormal>Workout in progress</TextNormal>
                        <WorkoutDuration startedAt={workoutState.started_at}/>
                        <FontAwesome5Icon name="chevron-right" style={styles.activeWorkout.arrow}/>
                    </FlexRowView>
                </Pressable>
            )}

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
            <Stack.Screen name={PAGE.addExercise} component={AddExercise} />
        </Stack.Navigator>
    )
}
export default MainPageNav;
