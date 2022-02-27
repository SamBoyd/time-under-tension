import uiStateReducer, {
    followRedirect,
    moveToCreateTemplate, moveToMainPage,
    moveToPickExercise, moveToPickExerciseForTemplateWorkout, moveToPickExerciseForWorkout, moveToWorkout
} from "./uiStateReducer";
import {PAGE} from '../constants'

describe('For UiState can', () =>{
    test('test initial state', () => {
        const state = uiStateReducer(undefined, {})

        expect(state).toEqual({
            page: PAGE.main
        })
    })

    test('move to choose exercise page for a workout', () => {
        const previousState = {
            page: PAGE.pickExercise
        }

        const state = uiStateReducer(previousState, moveToPickExerciseForWorkout())

        expect(state).toEqual({
            page: PAGE.pickExercise,
            redirectTo: PAGE.workout
        })
    })

    test('move to choose exercise page for a template workout', () => {
        const previousState = {
            page: PAGE.pickExercise
        }

        const state = uiStateReducer(previousState, moveToPickExerciseForTemplateWorkout())

        expect(state).toEqual({
            page: PAGE.pickExercise,
            redirectTo: PAGE.createTemplateWorkout
        })
    })

    test('can follow redirect', () => {
        Object.keys(PAGE).forEach(key => {
            const previousState = {
                page: 'nonsense',
                redirectTo: PAGE[key]
            }

            const state = uiStateReducer(previousState, followRedirect())

            expect(state).toEqual({
                page: PAGE[key],
                redirectTo: null
            })
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

    test('move to create template workout page', () => {
        const previousState = {
            page: PAGE.createTemplateWorkout
        }

        const state = uiStateReducer(previousState, moveToCreateTemplate())

        expect(state).toEqual({
            page: PAGE.createTemplateWorkout
        })
    })

    test('move to main page', () => {
        const previousState = {
            page: PAGE.createTemplateWorkout
        }

        const state = uiStateReducer(previousState, moveToMainPage())

        expect(state).toEqual({
            page: PAGE.main
        })
    })
})