import {createSlice} from '@reduxjs/toolkit';
import structuredClone from '@ungap/structured-clone';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

const getNewSet = () => {
    return {
        id: uuidv4(),
        numberReps: 12,
        weight: 40,
        workTime: null
    }
}
const getNewWork = (exercise) => {
    return {
        id: uuidv4(),
        exercise: exercise,
        sets: [
            getNewSet(),
            getNewSet(),
            getNewSet()
        ]
    }
}

const historyReducer = createSlice({
    name: 'history',
    initialState: [],
    reducers: {
        reset: state => {
            state.splice(0, state.length)
        },
        addWorkoutToHistory: (state, action) => {
            const newHistory = structuredClone(action.payload.workout)
            state.push(newHistory)
        }
    }
})

export const selectHistory = state => state.history
export const {
    reset, addWorkoutToHistory
} = historyReducer.actions
export default historyReducer.reducer