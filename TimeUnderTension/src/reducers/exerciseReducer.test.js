import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import exerciseReducer, {
    addCategory,
    addExercise,
    changeNewExerciseField,
    removeCategory,
    removeExercise,
    resetNewExercise,
    saveNewExercise
} from "./exercisesReducer";

describe('Exercise reducer can', () => {
    test('has initial state', () => {
        const initialState = exerciseReducer(undefined, {})
        expect(initialState.exercises.length).toBeGreaterThan(0)
    })

    test('add new exercise', () => {
        const previousState = {
            exercises: [],
            categories: ['chest']
        }

        const nextState = exerciseReducer(previousState, addExercise({
            exercise: {
                id: uuidv4(),
                name: 'test_exercise',
                category: 'chest'
            }
        }))

        expect(nextState).toEqual({
            exercises: [{
                id: expect.any(String),
                name: 'test_exercise',
                category: 'chest'
            }],
            categories: ['chest']
        })
    })

    test('remove exercise', () => {
        const idToRemove = uuidv4()
        const previousState = {
            exercises: [
                {
                    id: uuidv4(),
                    name: 'test_exercise_1',
                    category: 'chest'
                },
                {
                    id: idToRemove,
                    name: 'test_exercise_2',
                    category: 'chest'
                }
            ],
            categories: ['chest']
        }

        const nextState = exerciseReducer(previousState, removeExercise({id: idToRemove}))

        expect(nextState).toEqual({
            exercises: [{
                id: expect.any(String),
                name: 'test_exercise_1',
                category: 'chest'
            }],
            categories: ['chest']
        })
    })

    test('add new category', () => {
        const previousState = {
            exercises: [],
            categories: ['chest']
        }

        const nextState = exerciseReducer(previousState, addCategory({
            category: 'arms'
        }))

        expect(nextState).toEqual({
            exercises: [],
            categories: ['chest', 'arms']
        })
    })

    test('remove category', () => {
        const previousState = {
            exercises: [],
            categories: ['chest', 'arms']
        }

        const nextState = exerciseReducer(previousState, removeCategory({category: 'chest'}))

        expect(nextState).toEqual({
            exercises: [],
            categories: ['arms']
        })
    })


    test('add a new exercise', () => {
        const previousState = {
            exercises: [],
            categories: ['chest', 'arms']
        }

        let nextState = exerciseReducer(previousState, resetNewExercise())

        expect(nextState).toEqual({
            exercises: [],
            categories: ['chest', 'arms'],
            newExercise: {
                'name': '',
                'category': ''
            }
        })

        nextState = exerciseReducer(nextState, changeNewExerciseField({'fieldName': 'name', 'fieldValue': 'something'}))

        expect(nextState).toEqual({
            exercises: [],
            categories: ['chest', 'arms'],
            newExercise: {
                'name': 'something',
                'category': ''
            }
        })

        nextState = exerciseReducer(nextState, changeNewExerciseField({'fieldName': 'category', 'fieldValue': 'chest'}))

        expect(nextState).toEqual({
            exercises: [],
            categories: ['chest', 'arms'],
            newExercise: {
                'name': 'something',
                'category': 'chest',
            }
        })

        nextState = exerciseReducer(nextState, saveNewExercise())

        expect(nextState).toEqual({
            exercises: [{
                'name': 'something',
                'category': 'chest',
            }],
            categories: ['chest', 'arms'],
            newExercise: {
                'name': '',
                'category': '',
            }
        })

    })

})