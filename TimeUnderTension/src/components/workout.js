import React from 'react';
import {useSelector, useDispatch} from "react-redux";
import {StyleSheet, ScrollView, View, Dimensions} from "react-native";


import {moveWorkDown, moveWorkUp, removeWork, selectWorkout} from "../reducers/workoutReducer";
import Work from './work'
import {moveToMainPage, moveToPickExerciseForWorkout} from "../reducers/uiStateReducer";
import {finishWorkoutAndMoveToMainPage} from "../reducers/actions";
import SafeAreaView from "react-native/Libraries/Components/SafeAreaView/SafeAreaView";
import Timer from "./timer";
import {TextH1, TextNormal} from "./styled/text";
import {Button} from "./styled/button";
import {FlexRowView} from "./styled/view";

import theme from '../theme'
import Header from "./header";
import {Divider} from "react-native-elements";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Workout = () => {
    const dispatch = useDispatch()
    const workout = useSelector(selectWorkout)

    const goBack = () => {
        dispatch(moveToMainPage())
    }

    const finishWorkout = () => {
        finishWorkoutAndMoveToMainPage(dispatch, workout)
    }

    const addNewWork = () => {
        dispatch(moveToPickExerciseForWorkout())
    }


    const styles = StyleSheet.create({
        wrapperView: {
            flex: 1,
        },

        containerView: {
            containerStyle: {
                flex: 1,
                backgroundColor: theme.colors.tertiary,
            },
            contentContainerStyle: {
                alignItems: 'center',
                flexDirection: 'column',
                rowGap: 10,
                paddingTop: 10,
                paddingBottom: 125,
            }
        },


        backButton: {},

        finishButton: {},


        workComponent: {
            componentStyle: {
                borderRadius: theme.borderRadius,
                borderWidth: 1,
                borderColor: theme.colors.secondary,
                padding: 10,
                marginTop: 10,
            }

        },

        addWorkButton: {
            marginTop: 20,
            width: 200
        }


    })

    const workComponents = workout.work.map((work, i) => {
        return (
            <Work
                {...work}
                workIndex={i}
                active={workout.currentWork === i}
            />
        )
    })


    return (
        <View style={styles.wrapperView}>
            <Header
                leftComponent={<Button onPress={goBack} title="back" containerStyle={styles.backButton}/>}
                rightComponent={<Button onPress={finishWorkout} title="finish" containerStyle={styles.finishButton}/>}
            />
            <ScrollView
                style={styles.containerView.containerStyle}
                contentContainerStyle={styles.containerView.contentContainerStyle}
            >


                <TextH1>Workout</TextH1>
                <View>
                    {workComponents}
                </View>
                <Divider />
                <Button onPress={addNewWork} title="Add work" containerStyle={styles.addWorkButton}/>

            </ScrollView>
            <Timer/>
        </View>
    )
}

export default Workout
