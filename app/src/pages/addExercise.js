import React from 'react'
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";

import {changeNewExerciseField, resetNewExercise, saveNewExercise, selectExercises} from "../reducers/exercisesReducer";
import {moveToManageExercises} from "../reducers/uiStateReducer";
import {resetNewExerciseAndMoveToManageExercises, saveNewExerciseAndMoveToManageExercises} from "../reducers/actions";

const AddExercise = () => {
    const dispatch = useDispatch()
    const exercises = useSelector(selectExercises)

    const back = () => {
        resetNewExerciseAndMoveToManageExercises(dispatch)
    }

    const changeField = fieldName => event => {
        dispatch(changeNewExerciseField({fieldName: fieldName, fieldValue: event.target.value}))
    }

    const selectCategory = something => {
        console.log(JSON.stringify(something))
        dispatch(changeNewExerciseField({fieldName: 'category', fieldValue: ''}))
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
    return (
        <div>
            <button onClick={back}>back</button>
            Add Exercise

            <input onChange={changeField('name')} value={exercises.newExercise.name} placeholder={'name'}/>

            <select onChange={changeField('category')} value={exercises.newExercise.category || ""} placeholder={'name'}>
                <option value="" disabled >Select your option</option>
                {exercises.categories.map((cat, i) => <option key={i} value={cat}>{cat}</option>)}
            </select>
            {validate() && (
                <button onClick={saveExercise}>Save</button>
            ) || (
                <button onClick={saveExercise} disabled>Save</button>
            )}
        </div>
    )
}

export default AddExercise