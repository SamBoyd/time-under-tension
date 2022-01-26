import {createSlice} from '@reduxjs/toolkit'

import {PAGE} from "../constants";

export const uiStateSlice = createSlice({
    name: 'uiState',
    initialState: {
        page: PAGE.workout
    },
    reducers: {
        moveToWorkout: state => {
            state.page = PAGE.workout
        },
        moveToPickExercise: state => {
            state.page = PAGE.pickExercise
        }
    }
})

export const selectUiState = state => state.uiState
export const { moveToPickExercise, moveToWorkout } = uiStateSlice.actions
export default uiStateSlice.reducer