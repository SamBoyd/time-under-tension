import React from 'react'
import {useDispatch, useSelector} from "react-redux";

import {changeNewExerciseField, selectExercises} from "../reducers/exercisesReducer";
import {resetNewExerciseAndMoveToManageExercises, saveNewExerciseAndMoveToManageExercises} from "../reducers/actions";
import {StyleSheet} from "react-native";
import {Dropdown} from 'react-native-element-dropdown';
import theme from "../theme";
import {Button} from "../components/styled/button";
import {Input} from "react-native-elements";
import BasePage from "../components/basePage";

const AddExercise = () => {
    const dispatch = useDispatch()
    const exercises = useSelector(selectExercises)

    const goBack = () => {
        resetNewExerciseAndMoveToManageExercises(dispatch)
    }

    const changeField = fieldName => value => {
        dispatch(changeNewExerciseField({fieldName: fieldName, fieldValue: value}))
    }

    const selectCategory = (item) => {
        dispatch(changeNewExerciseField({fieldName: 'category', fieldValue: item.value}))
    }

    const validate = () => {
        return ('name' in exercises.newExercise) &&
            ('category' in exercises.newExercise) &&
            exercises.newExercise.name !== '' &&
            exercises.newExercise.category !== ''
    }

    const saveExercise = () => {
        if (validate()) {
            saveNewExerciseAndMoveToManageExercises(dispatch)
        }
    }

    const exerciseCategories = exercises.categories.map(cat => {
        return {"label": cat, "value": cat}
    })

    const styles = StyleSheet.create({

    })
    return (
        <BasePage
            leftHeaderComponent={<Button onPress={goBack} title="back" />}
            headerTitle="Add exercise"
        >
            <Dropdown
                data={exerciseCategories}
                value={exercises.newExercise.category || ""}
                onChange={selectCategory}
                placeholder="Select category"
                labelField="label"
                valueField="value"
            />

            <Input
                onChangeText={changeField('name')}
                value={exercises.newExercise.name}
                placeholder={'Exercise name'}
            />

            {validate() && (
                <Button onPress={saveExercise} title="Save"/>
            ) || (
                <Button onPress={saveExercise} disabled title="Save"/>
            )}
        </BasePage>
    )
}

export default AddExercise