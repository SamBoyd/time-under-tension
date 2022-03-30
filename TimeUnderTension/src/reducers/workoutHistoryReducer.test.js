import historyReducer, {
    addWorkout, addWorkoutToHistory
} from "./workoutHistoryReducer";
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
})
