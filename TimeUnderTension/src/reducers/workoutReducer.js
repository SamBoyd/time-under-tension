import {createSlice} from "@reduxjs/toolkit";
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';


const getNewSet = () => {
    return {
        id: uuidv4(),
        numberReps: 12,
        weight: 40,
        workTime: null,
        finished: false
    }
}
const getNewWork = (exercise, index) => {
    return {
        id: uuidv4(),
        exercise: exercise,
        sets: [
            getNewSet(),
            getNewSet(),
            getNewSet()
        ],
        index: index
    }
}

const getInitialState = () => {
    return {
        name: 'New workout',
        id: uuidv4(),
        created_at: (new Date()).toISOString(),
        work: [],
        started_at: null,
        finished_at: null,
        currentWork: null
    }
}

export const workoutSlice = createSlice({
    name: 'workout',
    initialState: getInitialState(),
    reducers: {
        reset: state => {
            const initialState = getInitialState()
            Object.keys(initialState).forEach(key => state[key] = initialState[key])
        },
        createWorkoutFromTemplate: (state, action) => {
            Object.keys(action.payload).forEach(
                key => state[key] = action.payload[key]
            )
            state.id = uuidv4()
            state.currentWork = 0
            state.started_at = null
            state.finished_at = null
        },
        startWorkoutIfNotStarted: (state, action) => {
            if (state.started_at === null) {
                state.started_at = (new Date()).toISOString()
            }
        },
        resetToInitialWorkout: (state) => {
            const initialState = getInitialState()
            for (const i in initialState) {
                state[i] = initialState[i]
            }

            for (const i in state) {
                if (!(i in initialState)) {
                    delete state[i]
                }
            }
        },
        setWorkoutFinished: (state) => {
            state.finished_at = (new Date()).toISOString()
        },

        addWork: (state, action) => {
            let newWork = action.payload
            state.work.push(newWork)
            if (state.work.length === 1) {
                state.currentWork = 0
            }
        },
        removeWork: (state, action) => {
            const workId = action.payload
            state.work = state.work.filter(id => workId !== id)
        },
        moveWorkUp: (state, action) => {
            const indexToMoveUp = state.work.indexOf(action.payload)
            if (indexToMoveUp > 0) {
                let work = [...state.work]
                const workToMove = work[indexToMoveUp]
                work.splice(indexToMoveUp, 1)
                work.splice(indexToMoveUp - 1, 0, workToMove)
                state.work = work
            }
        },
        moveWorkDown: (state, action) => {
            const indexToMoveDown = state.work.indexOf(action.payload)
            if (indexToMoveDown < state.work.length - 1) {
                let work = [...state.work]
                const workToMove = work[indexToMoveDown]
                work.splice(indexToMoveDown, 1)
                work.splice(indexToMoveDown + 1, 0, workToMove)
                state.work = work
            }
        },
        selectWork: (state, action) => {
            state.currentWork = action.payload.workIndex
        },
    }
})

export const selectWorkout = state => state.workout
export const {
    reset,
    resetToInitialWorkout, startWorkoutIfNotStarted,
    removeWork, addWork, moveWorkUp, moveWorkDown, selectWork,
    createWorkoutFromTemplate, setWorkoutFinished
} = workoutSlice.actions

export default workoutSlice.reducer
