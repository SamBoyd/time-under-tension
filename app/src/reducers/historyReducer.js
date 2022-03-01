import {createSlice} from '@reduxjs/toolkit';
import structuredClone from '@ungap/structured-clone';
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
    initialState: [
        {
            name: 'Test template',
            id: uuidv4(),
            created_at: (new Date()).toISOString(),
            work: [
                {
                    id: uuidv4(),
                    exercise: {
                        id: uuidv4(),
                        name: 'Bench press',
                        category: 'chest'
                    },
                    sets: [
                        getNewSet(),
                        getNewSet(),
                        getNewSet()
                    ]
                },
                {
                    id: uuidv4(),
                    exercise: {
                        id: uuidv4(),
                        name: 'Military press',
                        category: 'shoulders'
                    },
                    sets: [
                        getNewSet(),
                        getNewSet(),
                        getNewSet()
                    ]
                }
            ]
        },
        {
            name: 'Test template',
            id: uuidv4(),
            created_at: (new Date()).toISOString(),
            work: [
                {
                    id: uuidv4(),
                    exercise: {
                        id: uuidv4(),
                        name: 'Bench press',
                        category: 'chest'
                    },
                    sets: [
                        getNewSet(),
                        getNewSet(),
                        getNewSet()
                    ]
                },
                {
                    id: uuidv4(),
                    exercise: {
                        id: uuidv4(),
                        name: 'Military press',
                        category: 'shoulders'
                    },
                    sets: [
                        getNewSet(),
                        getNewSet(),
                        getNewSet()
                    ]
                }
            ]
        },
        {
            name: 'Test template',
            id: uuidv4(),
            created_at: (new Date()).toISOString(),
            work: [
                {
                    id: uuidv4(),
                    exercise: {
                        id: uuidv4(),
                        name: 'Bench press',
                        category: 'chest'
                    },
                    sets: [
                        getNewSet(),
                        getNewSet(),
                        getNewSet()
                    ]
                },
                {
                    id: uuidv4(),
                    exercise: {
                        id: uuidv4(),
                        name: 'Military press',
                        category: 'shoulders'
                    },
                    sets: [
                        getNewSet(),
                        getNewSet(),
                        getNewSet()
                    ]
                }
            ]
        }
    ],
    reducers: {
        addWorkoutToHistory: (state, action) => {
            const newHistory = structuredClone(action.payload.workout)

            if ('work' in newHistory) {
                newHistory.work.forEach(work => work.sets = work.sets.filter(set => set.finished))
            }

            state.push(newHistory)

        }
    }
})

export const selectHistory = state => state.history
export const {
    addWorkoutToHistory
} = historyReducer.actions
export default historyReducer.reducer