import {createSlice} from '@reduxjs/toolkit'

import {PAGE} from "../constants";

export const uiStateSlice = createSlice({
    name: 'uiState',
    initialState: {
        page: PAGE.main
    },
    reducers: {
        moveToMainPage: state => {
            state.page = PAGE.main
        },
        moveToWorkout: state => {
            state.page = PAGE.workout
        },
        moveToPickExerciseForWorkout: state => {
            state.page = PAGE.pickExercise
            state.redirectTo = PAGE.workout
        },
        moveToPickExerciseForTemplateWorkout: state => {
            state.page = PAGE.pickExercise
            state.redirectTo = PAGE.createTemplateWorkout
        },
        moveToCreateTemplate: state => {
            state.page = PAGE.createTemplateWorkout
        },
        followRedirect: state => {
            state.page = state.redirectTo
            state.redirectTo = null
        }
    }
})

export const selectUiState = state => state.uiState
export const {
    moveToMainPage, moveToPickExerciseForWorkout,
    moveToPickExerciseForTemplateWorkout, moveToWorkout,
    moveToCreateTemplate, followRedirect
} = uiStateSlice.actions
export default uiStateSlice.reducer