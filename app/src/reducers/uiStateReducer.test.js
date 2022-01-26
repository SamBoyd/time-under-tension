import uiStateReducer, {
    moveToPickExercise, moveToWorkout
} from "./uiStateReducer";
import {PAGE} from '../constants'

describe('For UiState can', () =>{
    test('test initial state', () => {
        const state = uiStateReducer(undefined, {})

        expect(state).toEqual({
            page: PAGE.workout
        })
    })

    test('move to choose exercise page', () => {
        const state = uiStateReducer(undefined, moveToPickExercise())

        expect(state).toEqual({
            page: PAGE.pickExercise
        })
    })

    test('move to choose workout page', () => {
        const previousState = {
            page: PAGE.pickExercise
        }

        const state = uiStateReducer(previousState, moveToWorkout())

        expect(state).toEqual({
            page: PAGE.workout
        })
    })
})