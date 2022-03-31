import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

import workoutReducer, {
    addWork,
    editTemplate,
    editTemplateName,
    moveWorkDown,
    moveWorkUp,
    removeWork,
    renameTemplate,
    resetTemplate,
} from "./newTemplateWorkoutReducer";

describe('When creating a template workout can', () => {
    test('test initial state', () => {
        const state = workoutReducer(undefined, {})
        expect(state).toEqual(
            {
                name: 'New template workout',
                id: expect.any(String),
                created_at: expect.any(String),
                work: []
            }
        )
    })

    test('can reset to new template', () => {
        const withEditsState = {
            name: 'Someday workout',
            id: 'fa2de79b-85f7-4e85-a238-c9e6265cda2e',
            created_at: "2022-01-19T17:53:11.336Z",
            work: ['fa2de79b-85f7-4e85-a238-c9e6265cd111', 'fa2de79b-85f7-4e85-a238-c9e6265cd222']
        }

        const newState = workoutReducer(withEditsState, resetTemplate())

        expect(newState).toEqual(
            {
                name: 'New template workout',
                id: expect.any(String),
                created_at: expect.any(String),
                work: []
            }
        )
    })

    test('can set name of template workout', () => {
        const previousState = {
            name: 'Someday workout',
            id: 'fa2de79b-85f7-4e85-a238-c9e6265cda2e',
            created_at: "2022-01-19T17:53:11.336Z",
            work: [
                uuidv4(),
                uuidv4(),
            ]
        }

        const newState = workoutReducer(previousState, renameTemplate({name: 'Monday workout'}))

        expect(newState).toEqual(
            {
                name: 'Monday workout',
                id: 'fa2de79b-85f7-4e85-a238-c9e6265cda2e',
                created_at: "2022-01-19T17:53:11.336Z",
                work: [
                    expect.any(String),
                    expect.any(String),
                ]
            }
        )

    })

    test('edit template workout', () => {
        const previousState = {
            name: 'New template workout',
            id: expect.any(String),
            created_at: expect.any(String),
            work: []
        }


        const editState = workoutReducer(previousState, editTemplate(
            {
                name: 'Someday workout',
                id: 'fa2de79b-85f7-4e85-a238-c9e6265cda2e',
                created_at: "2022-01-19T17:53:11.336Z",
                work: ['fa2de79b-85f7-4e85-a238-c9e6265cd111', 'fa2de79b-85f7-4e85-a238-c9e6265cd222']
            }
        ))

        expect(editState).toEqual(
            {
                name: 'Someday workout',
                id: 'fa2de79b-85f7-4e85-a238-c9e6265cda2e',
                created_at: "2022-01-19T17:53:11.336Z",
                work: ['fa2de79b-85f7-4e85-a238-c9e6265cd111', 'fa2de79b-85f7-4e85-a238-c9e6265cd222'],
                existingTemplate: true
            }
        )
    })


    test('can cancel edit template name', () => {
        const previousState = {
            name: 'Someday workout',
            id: 'fa2de79b-85f7-4e85-a238-c9e6265cda2e',
            created_at: "2022-01-19T17:53:11.336Z",
            work: ['fa2de79b-85f7-4e85-a238-c9e6265cd111', 'fa2de79b-85f7-4e85-a238-c9e6265cd222']
        }

        const newState = workoutReducer(previousState, editTemplateName({
            name: 'Tuesday workout'
        }))

        expect(newState).toEqual(
            {
                name: 'Tuesday workout',
                id: 'fa2de79b-85f7-4e85-a238-c9e6265cda2e',
                created_at: "2022-01-19T17:53:11.336Z",
                work: ['fa2de79b-85f7-4e85-a238-c9e6265cd111', 'fa2de79b-85f7-4e85-a238-c9e6265cd222']
            })
    })

    test('test add work', () => {
        const previousState = {
            name: 'Someday workout',
            id: 'fa2de79b-85f7-4e85-a238-c9e6265cda2e',
            created_at: "2022-01-19T17:53:11.336Z",
            work: ['fa2de79b-85f7-4e85-a238-c9e6265cd111', 'fa2de79b-85f7-4e85-a238-c9e6265cd222']
        }

        const newState = workoutReducer(previousState, addWork('fa2de79b-85f7-4e85-a238-c9e6265cd333'))

        expect(newState).toEqual(
            {
                name: 'Someday workout',
                id: 'fa2de79b-85f7-4e85-a238-c9e6265cda2e',
                created_at: "2022-01-19T17:53:11.336Z",
                work: ['fa2de79b-85f7-4e85-a238-c9e6265cd111', 'fa2de79b-85f7-4e85-a238-c9e6265cd222', 'fa2de79b-85f7-4e85-a238-c9e6265cd333']
            }
        )
    })

    test('test remove work', () => {
        const previousState = {
            name: 'Someday workout',
            id: 'fa2de79b-85f7-4e85-a238-c9e6265cda2e',
            created_at: "2022-01-19T17:53:11.336Z",
            work: ['fa2de79b-85f7-4e85-a238-c9e6265cd111', 'fa2de79b-85f7-4e85-a238-c9e6265cd222']
        }

        const newState = workoutReducer(previousState, removeWork('fa2de79b-85f7-4e85-a238-c9e6265cd222'))

        expect(newState).toEqual(
            {
                name: 'Someday workout',
                id: 'fa2de79b-85f7-4e85-a238-c9e6265cda2e',
                created_at: "2022-01-19T17:53:11.336Z",
                work: ['fa2de79b-85f7-4e85-a238-c9e6265cd111']
            }
        )
    })

    test('test move work', () => {
        const previousState = {
            name: 'Someday workout',
            id: 'fa2de79b-85f7-4e85-a238-c9e6265cda2e',
            created_at: "2022-01-19T17:53:11.336Z",
            work: ['fa2de79b-85f7-4e85-a238-c9e6265cd111', 'fa2de79b-85f7-4e85-a238-c9e6265cd222']
        }

        let newState = workoutReducer(previousState, moveWorkDown('fa2de79b-85f7-4e85-a238-c9e6265cd111'))

        expect(newState).toEqual(
            {
                name: 'Someday workout',
                id: 'fa2de79b-85f7-4e85-a238-c9e6265cda2e',
                created_at: "2022-01-19T17:53:11.336Z",
                work: ['fa2de79b-85f7-4e85-a238-c9e6265cd222', 'fa2de79b-85f7-4e85-a238-c9e6265cd111']
            }
        )

        newState = workoutReducer(newState, moveWorkUp('fa2de79b-85f7-4e85-a238-c9e6265cd111'))

        expect(newState).toEqual(
            {
                name: 'Someday workout',
                id: 'fa2de79b-85f7-4e85-a238-c9e6265cda2e',
                created_at: "2022-01-19T17:53:11.336Z",
                work: ['fa2de79b-85f7-4e85-a238-c9e6265cd111', 'fa2de79b-85f7-4e85-a238-c9e6265cd222']
            }
        )
    })
})
