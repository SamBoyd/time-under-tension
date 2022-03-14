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
import {Text, View} from "react-native";
import SectionList from "react-native/Libraries/Lists/SectionList";
import {TextBold, TextNormal} from "../components/styled/text";
import {Button} from "../components/styled/button";
import {ListItem} from "react-native-elements";


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

    return (
        <View>
            <Button onPress={goBack} title="back"/>
            <TextBold>Pick an exercise</TextBold>
            <SectionList
                sections={sortedExercises}
                keyExtractor={exercise => exercise.id}
                renderItem={({item}) => <Item exercise={item} />}
                renderSectionHeader={({ section: { title } }) => (
                    <ListItem><ListItem.Subtitle><TextBold>{title}</TextBold></ListItem.Subtitle></ListItem>
                )}
            />
        </View>
    )
}

export default PickExercise