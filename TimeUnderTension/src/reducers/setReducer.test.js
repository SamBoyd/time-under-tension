import setReducer, {addSet, changeSetReps, changeSetWeight, finishSet, removeSet} from "./setReducer";
import {v4 as uuidv4} from "uuid";

describe('Test setReducer can', () => {
    test('initialise state', () => {
        const initialState = setReducer(undefined, {})
        expect(initialState).toEqual([])
    })

    test('add a set', () => {
        const previousState = [
            {
                id: uuidv4(),
                numberReps: 12,
                weight: 40,
                workTime: null,
                finished: false
            }
        ]

        const nextState = setReducer(previousState, addSet({
            id: 'fa2de79b-85f7-4e85-a238-c9e6265cda2e',
            numberReps: 8,
            weight: 79,
            workTime: null,
            finished: false
        }))

        expect(nextState).toEqual(
            [
                {
                    id: expect.any(String),
                    numberReps: 12,
                    weight: 40,
                    workTime: null,
                    finished: false
                },
                {
                    id: 'fa2de79b-85f7-4e85-a238-c9e6265cda2e',
                    numberReps: 8,
                    weight: 79,
                    workTime: null,
                    finished: false
                }
            ]
        )
    })

    test('remove a set', () => {
        const previousState = [
            {
                id: 'Set-1234',
                numberReps: 12,
                weight: 40,
                workTime: null,
                finished: false
            },
            {
                id: 'fa2de79b-85f7-4e85-a238-c9e6265cda2e',
                numberReps: 8,
                weight: 79,
                workTime: null,
                finished: false
            }
        ]

        const nextState = setReducer(previousState, removeSet('fa2de79b-85f7-4e85-a238-c9e6265cda2e'))

        expect(nextState).toEqual(
            [
                {
                    id: 'Set-1234',
                    numberReps: 12,
                    weight: 40,
                    workTime: null,
                    finished: false
                },
            ]
        )
    })

    test('finish a set', () => {
        const previousState = [
            {
                id: 'Set-1234',
                numberReps: 12,
                weight: 40,
                workTime: null,
                finished: false
            },
            {
                id: 'fa2de79b-85f7-4e85-a238-c9e6265cda2e',
                numberReps: 8,
                weight: 79,
                workTime: null,
                finished: false
            }
        ]

        const nextState = setReducer(previousState, finishSet('fa2de79b-85f7-4e85-a238-c9e6265cda2e'))

        expect(nextState).toEqual(
            [
                {
                    id: 'Set-1234',
                    numberReps: 12,
                    weight: 40,
                    workTime: null,
                    finished: false
                },
                {
                    id: 'fa2de79b-85f7-4e85-a238-c9e6265cda2e',
                    numberReps: 8,
                    weight: 79,
                    workTime: null,
                    finished: true
                }
            ]
        )
    })

    test('change the number of reps on a set', () => {
        const previousState = [
            {
                id: 'Set-1234',
                numberReps: 12,
                weight: 40,
                workTime: null,
                finished: false
            },
            {
                id: 'fa2de79b-85f7-4e85-a238-c9e6265cda2e',
                numberReps: 8,
                weight: 79,
                workTime: null,
                finished: false
            }
        ]

        const nextState = setReducer(previousState, changeSetReps({setId:'fa2de79b-85f7-4e85-a238-c9e6265cda2e', reps: 2}))

        expect(nextState).toEqual(
            [
                {
                    id: 'Set-1234',
                    numberReps: 12,
                    weight: 40,
                    workTime: null,
                    finished: false
                },
                {
                    id: 'fa2de79b-85f7-4e85-a238-c9e6265cda2e',
                    numberReps: 2,
                    weight: 79,
                    workTime: null,
                    finished: false
                }
            ]
        )
    })

    test('change the weight on a set', () => {
        const previousState = [
            {
                id: 'Set-1234',
                numberReps: 12,
                weight: 40,
                workTime: null,
                finished: false
            },
            {
                id: 'fa2de79b-85f7-4e85-a238-c9e6265cda2e',
                numberReps: 8,
                weight: 79,
                workTime: null,
                finished: false
            }
        ]

        const nextState = setReducer(previousState, changeSetWeight({setId:'fa2de79b-85f7-4e85-a238-c9e6265cda2e', weight: 70}))

        expect(nextState).toEqual(
            [
                {
                    id: 'Set-1234',
                    numberReps: 12,
                    weight: 40,
                    workTime: null,
                    finished: false
                },
                {
                    id: 'fa2de79b-85f7-4e85-a238-c9e6265cda2e',
                    numberReps: 8,
                    weight: 70,
                    workTime: null,
                    finished: false
                }
            ]
        )
    })
})