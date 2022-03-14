import React from 'react'
import {useDispatch, useSelector} from "react-redux";

import {changeNewExerciseField, selectExercises} from "../reducers/exercisesReducer";
import {resetNewExerciseAndMoveToManageExercises, saveNewExerciseAndMoveToManageExercises} from "../reducers/actions";
import {Button, TextInput, View} from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import {TextNormal} from "../components/styled/text";

const AddExercise = () => {
    const dispatch = useDispatch()
    const exercises = useSelector(selectExercises)

    const back = () => {
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

    const exerciseCategories = exercises.categories.map(cat=> {return {"label": cat, "value": cat}})

    return (
        <View>
            <Button onPress={back} title="back" />
            <TextNormal>Add Exercise</TextNormal>

            <TextInput onChangeText={changeField('name')} value={exercises.newExercise.name} placeholder={'name'}/>

            <Dropdown
                data={exerciseCategories}
                value={exercises.newExercise.category || ""}
                onChange={selectCategory}
                placeholder="Select your option"
                labelField="label"
                valueField="value"
            />

            {validate() && (
                <Button onPress={saveExercise} title="Save" />
            ) || (
                <Button onPress={saveExercise} disabled title="Save" />
            )}
        </View>
    )
}

export default AddExercise