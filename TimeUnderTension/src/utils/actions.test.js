import {_createWorkoutFromTemplateAction} from "../reducers/actions";

describe('createWorkoutFromTemplateAction', () => {
    it('is correct', () => {
        const template = {
            id: 'template 1',
            work: ['template work 1', 'template work 2'],
            other: 'property'
        }

        const workState = [
            {
                id: 'template work 1',
                sets: ['template set 1', 'template set 2'],
                other: 'property'
            },
            {
                id: 'template work 2',
                sets: ['template set 3', 'template set 4'],
                other: 'property'
            },
        ]

        const setState = [
            {
                id: 'template set 1',
                other: 'property'
            },
            {
                id: 'template set 2',
                other: 'property'
            },
            {
                id: 'template set 3',
                other: 'property'
            },
            {
                id: 'template set 4',
                other: 'property'
            },
        ]

        const mockDispatch = jest.fn()
        const createWorkoutAction = jest.fn()
        const createWorkAction = jest.fn()
        const createSetAction = jest.fn()
        const setActiveWorkIDAction = jest.fn()

        _createWorkoutFromTemplateAction(
            template,
            workState,
            setState,
            mockDispatch,
            createWorkoutAction,
            createWorkAction,
            createSetAction,
            setActiveWorkIDAction
        )

        expect(mockDispatch.mock.calls.length).toBe(8)

        expect(createWorkoutAction.mock.calls.length).toBe(1)
        expect(createWorkoutAction.mock.calls[0][0]).toEqual(
            {
                id: expect.any(String),
                work: [expect.any(String), expect.any(String)],
                other: 'property',
            }
        )
        expect(createWorkoutAction.mock.calls[0][0].id).not.toBe('template 1')
        expect(createWorkoutAction.mock.calls[0][0].work).not.toEqual(
            ['template work 1', 'template work 2']
        )
        const firstWorkId = createWorkoutAction.mock.calls[0][0].work[0]

        expect(createWorkAction.mock.calls.length).toBe(2)
        expect(createWorkAction.mock.calls[0][0]).toEqual(
            {
                id: expect.any(String),
                sets: [expect.any(String), expect.any(String)],
                other: 'property'
            }
        )
        expect(createWorkAction.mock.calls[0][0].id).not.toBe('template work 1')
        expect(createWorkAction.mock.calls[0][0].sets).not.toEqual(
            ['template set 1', 'template set 2']
        )

        expect(createWorkAction.mock.calls[1][0]).toEqual(
            {
                id: expect.any(String),
                sets: [expect.any(String), expect.any(String)],
                other: 'property'
            }
        )
        expect(createWorkAction.mock.calls[1][0].id).not.toBe('template work 2')
        expect(createWorkAction.mock.calls[1][0].sets).not.toEqual(
            ['template set 3', 'template set 4']
        )

        expect(createSetAction.mock.calls.length).toBe(4)
        expect(createSetAction.mock.calls[0][0]).toEqual(
            {
                id: expect.any(String),
                other: 'property'
            }
        )
        expect(createSetAction.mock.calls[0][0].id).not.toEqual('template set 1')

        expect(createSetAction.mock.calls[1][0]).toEqual(
            {
                id: expect.any(String),
                other: 'property'
            }
        )
        expect(createSetAction.mock.calls[1][0].id).not.toEqual('template set 2')

        expect(createSetAction.mock.calls[2][0]).toEqual(
            {
                id: expect.any(String),
                other: 'property'
            }
        )
        expect(createSetAction.mock.calls[2][0].id).not.toEqual('template set 3')

        expect(createSetAction.mock.calls[3][0]).toEqual(
            {
                id: expect.any(String),
                other: 'property'
            }
        )
        expect(createSetAction.mock.calls[3][0].id).not.toEqual('template set 4')

        expect(setActiveWorkIDAction.mock.calls.length).toBe(1)
        expect(setActiveWorkIDAction.mock.calls[0][0]).toBe(firstWorkId)

        // check ids in workout match those in work
        expect(createWorkoutAction.mock.calls[0][0].work[0]).toBe(createWorkAction.mock.calls[0][0].id)
        expect(createWorkoutAction.mock.calls[0][0].work[1]).toBe(createWorkAction.mock.calls[1][0].id)


    })
})