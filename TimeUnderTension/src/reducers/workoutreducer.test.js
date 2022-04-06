import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

import workoutReducer, {
    addWork,
    createWorkoutFromTemplate,
    moveWorkDown,
    moveWorkUp,
    removeWork, resetToInitialWorkout, setWorkoutFinished, startWorkoutIfNotStarted
} from "./workoutReducer";
import {exerciseCategory} from "../constants";

var tk = require('timekeeper');


describe('For Workout can', () => {
    test('test initial state', () => {
        const state = workoutReducer(undefined, {})
        expect(state).toEqual(
            {
                name: 'Workout',
                id: expect.any(String),
                created_at: expect.any(String),
                work: [],
                started_at: null,
                finished_at: null,
            }
        )
    })

    test('test can start a workout', () => {
        const previousState = {
            name: 'New workout',
            id: expect.any(String),
            created_at: expect.any(String),
            work: [],
            started_at: null,
            finished_at: null,
        }
        const time = new Date(1330688329321);

        tk.freeze(time)
        const state = workoutReducer(previousState, startWorkoutIfNotStarted())
        expect(state).toEqual(
            {
                name: 'New workout',
                id: expect.any(String),
                created_at: expect.any(String),
                work: [],
                started_at: time.toISOString(),
                finished_at: null,
            }
        )
    })

    test('test reset workout to initial state', () => {
        const previousState = {
            some: 'thing',
            not: 'related'
        }
        const state = workoutReducer(previousState, resetToInitialWorkout())
        expect(state).toEqual(
            {
                name: 'Workout',
                id: expect.any(String),
                created_at: expect.any(String),
                work: [],
                started_at: null,
                finished_at: null,
            }
        )
    })

    test('create workout from a template', () => {
            const previousState = {
                name: 'New workout',
                id: 'fa2de79b-85f7-4e85-a238-c9e6265cda2e',
                created_at: "2022-01-19T17:53:11.336Z",
                work: [],
                finished_at: null
            }

            const templateWorkout = {
                name: 'Tuesday workout',
                id: 'fa2de79b-85f7-4e85-a238-c9e62651111',
                created_at: "2022-01-21T17:53:11.336Z",
                work: [uuidv4(), uuidv4()],
                finished_at: null,
                started_at: null,
            }

            const newState = workoutReducer(previousState, createWorkoutFromTemplate(templateWorkout))

            expect(newState).toEqual({
                name: 'Tuesday workout',
                id: expect.any(String),
                created_at: "2022-01-21T17:53:11.336Z",
                work: [expect.any(String), expect.any(String)],
                finished_at: null,
                started_at: null,
            })

            expect(newState.id).not.toEqual(templateWorkout.id)
        }
    )


    test('test add work', () => {
        const previousState = {
            name: 'New workout',
            id: 'fa2de79b-85f7-4e85-a238-c9e6265cda2e',
            created_at: "2022-01-19T17:53:11.336Z",
            work: [],
            finished_at: null
        }

        const exercise = {
            id: uuidv4(),
            name: 'Bench press',
            category: exerciseCategory.chest
        }

        const newState = workoutReducer(previousState, addWork('fa2de79b-85f7-4e85-a238-c9e6265c1111'))

        expect(newState).toEqual(
            {
                name: 'New workout',
                id: 'fa2de79b-85f7-4e85-a238-c9e6265cda2e',
                created_at: "2022-01-19T17:53:11.336Z",
                work: ['fa2de79b-85f7-4e85-a238-c9e6265c1111'],
                finished_at: null,
            }
        )

        const newerState = workoutReducer(newState, addWork('fa2de79b-85f7-4e85-a238-c9e6265c2222'))

        expect(newerState).toEqual(
            {
                name: 'New workout',
                id: 'fa2de79b-85f7-4e85-a238-c9e6265cda2e',
                created_at: "2022-01-19T17:53:11.336Z",
                work: ['fa2de79b-85f7-4e85-a238-c9e6265c1111', 'fa2de79b-85f7-4e85-a238-c9e6265c2222'],
                finished_at: null,
            }
        )
    })


    test('test remove work', () => {
        const previousState = {
            name: 'New workout',
            id: 'fa2de79b-85f7-4e85-a238-c9e6265cda2e',
            created_at: "2022-01-19T17:53:11.336Z",
            work: ['fa2de79b-85f7-4e85-a238-c9e6265c1111', 'fa2de79b-85f7-4e85-a238-c9e6265c2222'],
            finished_at: null
        }

        const newState = workoutReducer(previousState, removeWork('fa2de79b-85f7-4e85-a238-c9e6265c1111'))

        expect(newState).toEqual(
            {
                name: 'New workout',
                id: 'fa2de79b-85f7-4e85-a238-c9e6265cda2e',
                created_at: "2022-01-19T17:53:11.336Z",
                work: ['fa2de79b-85f7-4e85-a238-c9e6265c2222'],
                finished_at: null
            }
        )
    })

    test('test move work', () => {
        const previousState = {
            name: 'New workout',
            id: 'fa2de79b-85f7-4e85-a238-c9e6265cda2e',
            created_at: "2022-01-19T17:53:11.336Z",
            work: [
                'aaaaaaa-85f7-4e85-a238-c9e6265cda2e',
                'bbbbbbb-85f7-4e85-a238-c9e6265cda2e',
                'ccccccc-85f7-4e85-a238-c9e6265cda2e'
            ],
            finished_at: null
        }

        let newState = workoutReducer(previousState, moveWorkDown('aaaaaaa-85f7-4e85-a238-c9e6265cda2e'))

        expect(newState).toEqual(
            {
                name: 'New workout',
                id: 'fa2de79b-85f7-4e85-a238-c9e6265cda2e',
                created_at: "2022-01-19T17:53:11.336Z",
                work: [
                    'bbbbbbb-85f7-4e85-a238-c9e6265cda2e',
                    'aaaaaaa-85f7-4e85-a238-c9e6265cda2e',
                    'ccccccc-85f7-4e85-a238-c9e6265cda2e'
                ],
                finished_at: null
            }
        )

        newState = workoutReducer(newState, moveWorkUp('ccccccc-85f7-4e85-a238-c9e6265cda2e'))

        expect(newState).toEqual(
            {
                name: 'New workout',
                id: 'fa2de79b-85f7-4e85-a238-c9e6265cda2e',
                created_at: "2022-01-19T17:53:11.336Z",
                work: [
                    'bbbbbbb-85f7-4e85-a238-c9e6265cda2e',
                    'ccccccc-85f7-4e85-a238-c9e6265cda2e',
                    'aaaaaaa-85f7-4e85-a238-c9e6265cda2e',
                ],
                finished_at: null
            }
        )
    })
})
