import templateReducer, {
    addToTemplates,
} from "./workoutTemplatesReducer";
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';


describe('The template reducer can', () => {

    test('test initial state', () => {
        const initialState = templateReducer(undefined, {})

        expect(initialState).toEqual( [])
    })

    test('add to templates', () => {
        const previousState = [
            {
                id: 'fa2de79b-85f7-4e85-a238-c9e6265cd111'
            }
        ]

        const nextState = templateReducer(previousState, addToTemplates({
            id: 'fa2de79b-85f7-4e85-a238-c9e6265cd33',
            otherProperty: {test: 'test'},
            otherArray: [1, 2, 3, 4],
            existingTemplate: true
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

    test('overwrite existing templates', () => {
        const previousState = [
            {id: 'fa2de79b-85f7-4e85-a238-c9e6265cd111'},
            {
                id: 'fa2de79b-85f7-4e85-a238-c9e6265cd33',
                otherProperty: {test: 'test'},
                otherArray: [1, 2, 3, 4],
            },
            {id: 'fa2de79b-85f7-4e85-a238-c9e6265cd222'},
        ]

        const nextState = templateReducer(previousState, addToTemplates({
            id: 'fa2de79b-85f7-4e85-a238-c9e6265cd33',
            otherProperty: {test: 'test'},
            otherArray: [1, 2, 3, 4, 5, 6, 7],
            anotherProperty: true,
            existingTemplate: true
        }))

        expect(nextState).toEqual([
            {id: 'fa2de79b-85f7-4e85-a238-c9e6265cd111'},
            {
                id: 'fa2de79b-85f7-4e85-a238-c9e6265cd33',
                otherProperty: {test: 'test'},
                otherArray: [1, 2, 3, 4, 5, 6, 7],
                anotherProperty: true,
            },
            {id: 'fa2de79b-85f7-4e85-a238-c9e6265cd222'},
        ])
    })
})
