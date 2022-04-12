import {createSlice} from "@reduxjs/toolkit";
import {v4 as uuidv4} from 'uuid';

const updateProp = (state, workId, propName, value) => {
    const indexOfWork = state.findIndex(el => el.id === workId)
    if (indexOfWork !== -1) {
        const work = {...state[indexOfWork]}
        state.splice(indexOfWork, 1)
        work[propName] = value
        state.push(work)
    } else {
        throw `cant find work with id: ${workId}`
    }
}

export const newWorkForExercise = exercise => {
    return {
        id: uuidv4(),
        created_at: (new Date()).toISOString(),
        exercise: exercise,
        sets: [],
        restTime: null,
        workTimeStart: null,
        workTimeEnd: null,
        finished: false,
    }
}

export const workSlice = createSlice({
    name: 'work',
    initialState: [],
    reducers: {
        reset: state => {
            state.splice(0, state.length)
        },
        addWork: (state, action) => {
            if (
                !('id' in action.payload) ||
                !('exercise' in action.payload) ||
                !('sets' in action.payload)
            ) {
                throw `Bad addWork action payload: ${JSON.stringify(action.payload)}`
            }

            const id = action.payload.id
            const exercise = action.payload.exercise
            const sets = action.payload.sets
            const restTime = action.payload.restTime
            const workTimeStart = action.payload.workTimeStart
            const workTimeEnd = action.payload.workTimeEnd
            const finished = action.payload.finished

            state.push({
                id: id,
                exercise: exercise,
                sets: sets,
                restTime: restTime,
                workTimeStart: workTimeStart,
                workTimeEnd: workTimeEnd,
                finished: finished,
            })
        },
        removeWork: (state, action) => {
            if (!action.payload) {
                throw `Bad removeWork action payload: ${JSON.stringify(action.payload)}`
            }

            const id = action.payload

            const indexToRemove = state.findIndex(el => el.id === id)
            if (indexToRemove !== -1) {
                state.splice(indexToRemove, 1)
            }
        },
        addSetToWork: (state, action) => {
            if (
                !('workId' in action.payload) ||
                !('setId' in action.payload)
            ) {
                throw `Bad addSetToWork action payload: ${JSON.stringify(action.payload)}`
            }

            const workId = action.payload.workId
            const setId = action.payload.setId

            const workIndex = state.findIndex(el => el.id === workId)
            const work = {...state[workIndex]}
            state.splice(workIndex, 1)
            work.sets.push(setId)
            state.push(work)
        },
        updateSetsOnWork: (state, action) => {
            if (
                !("workId" in action.payload) ||
                !("sets" in action.payload)
            ) {
                throw `Bad updateSetsOnWork action payload: ${JSON.stringify(action.payload)}`
            }

            const workId = action.payload.workId
            const sets = action.payload.sets
            updateProp(state, workId, 'sets', sets)
        },
        updateWorkTimeOnWork: (state, action) => {
            if (
                !("workId" in action.payload) ||
                !("workTimeStart" in action.payload) ||
                !("workTimeEnd" in action.payload)
            ) {
                throw `Bad updateWorkTimeOnWork action payload: ${JSON.stringify(action.payload)}`
            }

            const workId = action.payload.workId
            const workTimeStart = action.payload.workTimeStart
            const workTimeEnd = action.payload.workTimeEnd
            updateProp(state, workId, 'workTimeStart', workTimeStart)
            updateProp(state, workId, 'workTimeEnd', workTimeEnd)
        },
        updateRestOnWork: (state, action) => {
            if (
                !("workId" in action.payload) ||
                !("restTime" in action.payload)
            ) {
                throw `Bad updateRestOnWork action payload: ${JSON.stringify(action.payload)}`
            }

            const workId = action.payload.workId
            const restTime = action.payload.restTime
            updateProp(state, workId, 'restTime', restTime)
        },
    }
})

export const selectWork = state => state.work
export const {
    reset,
    addWork, removeWork, addSetToWork, updateSetsOnWork,
    updateWorkTimeOnWork, updateRestOnWork
} = workSlice.actions

export default workSlice.reducer