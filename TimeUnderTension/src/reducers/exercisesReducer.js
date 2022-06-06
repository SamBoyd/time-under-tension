import {createSlice} from '@reduxjs/toolkit';
import {v4 as uuidv4} from "uuid";

import {exerciseCategory as baseCategories} from '../constants'
import {chest} from "../../resources/exercises/chest";
import {arms} from "../../resources/exercises/arms";
import {shoulders} from "../../resources/exercises/shoulders";
import {legs} from "../../resources/exercises/legs";
import {abs} from "../../resources/exercises/abs";
import {back} from "../../resources/exercises/back";

const loadExercises = () => {
    const exercises = {}

    const load = (cat, arr) => {
        for (let i=0; i < arr.length; i++) {
            let ex = arr[i]
            if (!(ex in exercises)) {
                exercises[ex] = {id: uuidv4(), name: ex, category: cat}
            }
        }
    }

    load('chest', chest)
    load('arms', arms)
    load('shoulders', shoulders)
    load('back', back)
    load('legs', legs)
    load('abs', abs)

    return Object.keys(exercises).map(key => exercises[key])
}


const getInitialState = () => {
    return {
        exercises: loadExercises(),
        categories: Object.keys(baseCategories),
        newExercise: {
            'name': '',
            'category': ''
        }
    }
}

const exercisesReducer = createSlice({
    name: 'exercises',
    initialState: getInitialState(),
    reducers: {
        reset: state => {
            const initialState = getInitialState()
            Object.keys(initialState).forEach(key => state[key] = initialState[key])
        },
        addExercise: (state, action) => {
            state.exercises.push(action.payload.exercise)
        },
        removeExercise: (state, action) => {
            const indexToRemove = state.exercises.findIndex(ex => ex.id === action.payload.id)
            state.exercises.splice(indexToRemove, 1)
        },

        addCategory: (state, action) => {
            if (!state.categories.includes(action.payload.category)) {
                state.categories.push(action.payload.category)
            }
        },
        removeCategory: (state, action) => {
            const indexToRemove = state.categories.findIndex(c => c === action.payload.category)
            state.categories.splice(indexToRemove, 1)
        },

        resetNewExercise: state => {
            state.newExercise = {
                "name": "",
                "category": ""
            }
        },
        changeNewExerciseField: (state, action) => {
            const fieldName = action.payload.fieldName
            const fieldValue = action.payload.fieldValue
            state.newExercise[fieldName] = fieldValue
        },
        saveNewExercise: (state) => {
            state.exercises.push(state.newExercise)
            state.newExercise = {
                "name": "",
                "category": ""
            }
        }
    }
})

export const selectExercises = state => state.exercises
export const {
    reset,
    addExercise, removeExercise,
    addCategory, removeCategory,
    resetNewExercise, changeNewExerciseField, saveNewExercise
} = exercisesReducer.actions

export default exercisesReducer.reducer
