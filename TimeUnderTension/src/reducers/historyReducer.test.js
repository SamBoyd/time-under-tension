import historyReducer, {
    addWorkout, addWorkoutToHistory
} from "./historyReducer";
import {exerciseCategory} from "../constants";
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';


describe('History reducer can', () => {

    test('test initial state', () => {
        const initialState = historyReducer(undefined, {})

        expect(initialState).toEqual([])
    })
    test('add to history', () => {
        const previousState = [
            {
                id: 'fa2de79b-85f7-4e85-a238-c9e6265cd111'
            }
        ]

        const nextState = historyReducer(previousState, addWorkoutToHistory({
            workout: {
                id: 'fa2de79b-85f7-4e85-a238-c9e6265cd33',
                otherProperty: {test: 'test'},
                otherArray: [1, 2, 3, 4]
            }
        }))

        expect(nextState).toEqual([
            {id: 'fa2de79b-85f7-4e85-a238-c9e6265cd111'},
            {
                id: 'fa2de79b-85f7-4e85-a238-c9e6265cd33',
                otherProperty: {test: 'test'},
                otherArray: [1, 2, 3, 4]
            }
        ])
    })

    test('only adds finished sets to history', () => {
        const nextState = historyReducer([], addWorkoutToHistory({
                workout: {
                    name: 'Tuesday workout',
                    id: 'fa2de79b-85f7-4e85-a238-c9e62651111',
                    created_at: "2022-01-21T17:53:11.336Z",
                    work: [
                        {
                            id: uuidv4(),
                            exercise: {
                                id: uuidv4(),
                                name: 'Bench press',
                                category: exerciseCategory.chest
                            },
                            sets: [
                                {
                                    id: uuidv4(),
                                    numberReps: 12,
                                    weight: 40,
                                    workTime: 44,
                                    finished: true
                                },
                                {
                                    id: uuidv4(),
                                    numberReps: 12,
                                    weight: 40,
                                    workTime: 32,
                                    finished: true
                                },
                                {
                                    id: uuidv4(),
                                    numberReps: 12,
                                    weight: 40,
                                    workTime: null
                                }
                            ]
                        }
                    ],
                    finished_at: "2022-03-01T07:37:04.930Z",
                    currentWork: 0
                }
            }
        ))

        expect(nextState).toEqual([
            {
                name: 'Tuesday workout',
                id: 'fa2de79b-85f7-4e85-a238-c9e62651111',
                created_at: "2022-01-21T17:53:11.336Z",
                work: [
                    {
                        id: expect.any(String),
                        exercise: {
                            id: expect.any(String),
                            name: 'Bench press',
                            category: exerciseCategory.chest
                        },
                        sets: [
                            {
                                id: expect.any(String),
                                numberReps: 12,
                                weight: 40,
                                workTime: 44,
                                finished: true
                            },
                            {
                                id: expect.any(String),
                                numberReps: 12,
                                weight: 40,
                                workTime: 32,
                                finished: true
                            },
                        ]
                    }
                ],
                finished_at: "2022-03-01T07:37:04.930Z",
                currentWork: 0
            }
        ])
    })
})
