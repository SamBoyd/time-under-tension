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
        addWork: (state, action) => {
            const exercise = action.payload.exercise;
            if (!exercise) {
                return
            }
            let newWork = getNewWork(exercise)
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
        },

        changeSetReps: (state, action) => {
            const setId = action.payload.setId
            const reps = action.payload.reps

            if (!setId || !reps) {
                return
            }


            for (let iw=0; iw<state.work.length; iw++) {
                const work = state.work[iw]
                for (let is=0; is<work.sets.length; is++){
                    const set = work.sets[is]
                    if (set.id === setId) {
                        state.work[iw].sets[is].numberReps = reps
                    }
                }
            }
        },
        changeSetWeight: (state, action) => {
            const setId = action.payload.setId
            const weight = action.payload.weight

            if (!setId || !weight) {
                return
            }


            for (let iw=0; iw<state.work.length; iw++) {
                const work = state.work[iw]
                for (let is=0; is<work.sets.length; is++){
                    const set = work.sets[is]
                    if (set.id === setId) {
                        state.work[iw].sets[is].weight = weight
                    }
                }
            }
        },
        finishSet: (state, action) => {
            const setId = action.payload.setId

            if (!setId) {
                return
            }


            for (let iw=0; iw<state.work.length; iw++) {
                const work = state.work[iw]
                for (let is=0; is<work.sets.length; is++){
                    const set = work.sets[is]
                    if (set.id === setId) {
                        state.work[iw].sets[is].finished = 'finished' in set ? !set.finished: true
                    }
                }
            }
        },
    }
})

export const selectWorkout = state => state.workout
export const {
    removeWork, addWork, moveWorkUp, moveWorkDown,
    addSet, removeSet, changeRestTime, changeWorkTime,
    changeSetReps, changeSetWeight, finishSet
} = workoutSlice.actions

export default workoutSlice.reducer
