import {createSlice} from "@reduxjs/toolkit";
import {v4 as uuidv4} from 'uuid';

const getNewSet = () => {
    return {
        id: uuidv4(),
        numberReps: 12,
        weight: 40,
        workTime: null
    }
}
const getNewWork = () => {
    return {
        id: uuidv4(),
        exercise: {type: 'bench_press', value: 'Bench Press'},
        sets: [
            getNewSet(),
            getNewSet(),
            getNewSet()
        ]
    }
}

const getInitialState = () => {
    return {
        name: 'New workout',
        id: uuidv4(),
        created_at: (new Date()).toISOString(),
        work: [],
        finished_at: null
    }
}

export const workoutSlice = createSlice({
    name: 'workout',
    initialState: getInitialState(),
    reducers: {
        addWork: state => {
            let newWork = getNewWork(state.work.length)
            state.work.push(newWork)
        },
        removeWork: (state, action) => {
            state.work.splice(action.payload.index, 1)
        },
        moveWorkUp: (state, action) => {
            const i = action.payload.index
            const element = state.work[i]
            state.work.splice(i, 1)
            state.work.splice(i-1, 0, element)
        },
        moveWorkDown: (state, action) => {
            const i = action.payload.index
            const element = state.work[i]
            state.work.splice(i, 1)
            state.work.splice(i+1, 0, element)
        },

        addSet: (state, action) => {
            const workId = action.payload.workId
            if (!workId) {
                return
            }
            const workIndex = state.work.findIndex(work => work.id === workId)
            state.work[workIndex].sets.push(getNewSet())
        },
        removeSet: (state, action) => {
            const setId = action.payload.setId
            const workId = action.payload.workId
            if (!setId || !workId) {
                return
            }

            const workIndex = state.work.findIndex(work => work.id === workId)
            const setIndex = state.work[workIndex].sets.findIndex(set => set.id === setId)

            state.work[workIndex].sets.splice(setIndex, 1)
        },
        changeRestTime: (state, action) => {
            const workId = action.payload.workId
            const restTime = action.payload.restTime
            if (!workId || !restTime) {
                return
            }
            const workIndex = state.work.findIndex(work => work.id === workId)
            state.work[workIndex].restTime = restTime
        },
        changeWorkTime: (state, action) => {
            const workId = action.payload.workId
            const workStart = action.payload.workTime.start
            const workEnd = action.payload.workTime.end

            if( !workId || !workStart || !workEnd) {
                return
            }

            const workIndex = state.work.findIndex(work => work.id === workId)
            state.work[workIndex].workTime = {start: workStart, end: workEnd}
        }
    }
})

export const selectWorkout = state => state.workout
export const {
    removeWork, addWork, moveWorkUp, moveWorkDown,
    addSet, removeSet, changeRestTime, changeWorkTime,
} = workoutSlice.actions

export default workoutSlice.reducer
