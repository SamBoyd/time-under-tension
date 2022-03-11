import {createSlice} from "@reduxjs/toolkit";
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import structuredClone from '@ungap/structured-clone';


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
        finished_at: null,
        currentWork: null
    }
}

export const workoutSlice = createSlice({
    name: 'workout',
    initialState: getInitialState(),
    reducers: {
        createWorkoutFromTemplate: (state, action) => {
            Object.keys(action.payload.template).forEach(
                key => state[key] = action.payload.template[key]
            )
        },
        resetToInitialWorkout: (state) => {
            const initialState = getInitialState()
            for (const i in initialState) {
                state[i] = initialState[i]
            }

            for (const i in state) {
                if (!(i in initialState)){
                    delete state[i]
                }
            }
        },
        setWorkoutFinished: (state) => {
            state.finished_at = (new Date()).toISOString()
        },

        addWork: (state, action) => {
            const exercise = action.payload.exercise;
            if (!exercise) {
                return
            }
            let newWork = getNewWork(exercise)
            state.work.push(newWork)

            if (state.work.length === 1) {
                state.currentWork = 0
            }
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
        selectWork: (state, action) => {
            state.currentWork = action.payload.workIndex
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
    resetToInitialWorkout,
    removeWork, addWork, moveWorkUp, moveWorkDown, selectWork,
    addSet, removeSet, changeRestTime, changeWorkTime,
    changeSetReps, changeSetWeight, finishSet,
    createWorkoutFromTemplate, setWorkoutFinished
} = workoutSlice.actions

export default workoutSlice.reducer
