import {createSlice} from '@reduxjs/toolkit';
import {exercises as baseExercises, exerciseCategory as baseCategories, exerciseCategory} from '../constants'

const getInitialState = () => {
    return {
        exercises: baseExercises,
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
