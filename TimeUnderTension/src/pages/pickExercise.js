import React from 'react'
import { useDispatch, useSelector } from "react-redux";

import {PAGE} from '../constants'
import {pickExerciseForTemplateWorkoutAction, pickExerciseForWorkoutAction} from "../reducers/actions"
import {
    followRedirect,
    moveToCreateTemplate,
    moveToMainPage,
    moveToWorkout,
    selectUiState
} from "../reducers/uiStateReducer";
import {selectExercises} from "../reducers/exercisesReducer";
import {StyleSheet, Text, View} from "react-native";
import SectionList from "react-native/Libraries/Lists/SectionList";
import {TextBold, TextH1, TextNormal} from "../components/styled/text";
import {Button} from "../components/styled/button";
import {ListItem} from "react-native-elements";
import Header from "../components/header";
import theme from "../theme";
import {capitalizeFirstLetter} from "../utils/textUtils";


const PickExercise = () => {
    const uiState = useSelector(selectUiState)
    const exercises = useSelector(selectExercises)
    const dispatch = useDispatch()

    const selectExercise = exercise => () => {
        if (uiState.redirectTo === PAGE.workout) {
            pickExerciseForWorkoutAction(exercise)(dispatch)
        } else if (uiState.redirectTo === PAGE.createTemplateWorkout) {
            pickExerciseForTemplateWorkoutAction(exercise)(dispatch)
        }
    }

    const goBack = () => {
        dispatch(followRedirect())
    }

    const sortedExercises = []
    exercises.categories.forEach(cat => {
        sortedExercises.push({'title': cat, 'data': exercises.exercises.filter(e => e.category === cat)})
    })

    const Item = ({ exercise }) => (
        <ListItem>
            <ListItem.Content>
                <TextNormal onPress={selectExercise(exercise)}>{exercise.name}</TextNormal>
            </ListItem.Content>
        </ListItem>
    );

    const styles = StyleSheet.create({
        wrapper: {
          backgroundColor: theme.colors.tertiary
        },

        backButton: {

        },

        header: {
            title: {
                color: theme.colors.tertiary
            }
        },

        listWrapper: {
            backgroundColor: theme.colors.tertiary,
            margin: 40,
        },

        listHeader: {
            backgroundColor: theme.colors.tertiary,
        },
        listItem: {
            backgroundColor: theme.colors.tertiary,
            paddingRight: 20,
        },
    })

    return (
        <View style={styles.wrapper}>
            <Header
                leftComponent={<Button onPress={goBack} title="back" containerStyle={styles.backButton}/>}
                centerComponent={<TextH1 style={styles.header.title}>Pick an exercise</TextH1>}
            />

            <View syles={styles.listWrapper}>
                <SectionList
                    sections={sortedExercises}
                    keyExtractor={exercise => exercise.id}
                    renderItem={({item}) => <Item exercise={item} />}
                    renderSectionHeader={({ section: { title } }) => (
                        <ListItem topDivider>
                            <ListItem.Subtitle>
                                <TextBold>{capitalizeFirstLetter(title)}</TextBold>
                            </ListItem.Subtitle>
                        </ListItem>
                    )}
                />
            </View>
        </View>
    )
}

export default PickExercise