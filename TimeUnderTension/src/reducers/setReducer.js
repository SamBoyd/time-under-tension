import {createSlice} from "@reduxjs/toolkit";
import {v4 as uuidv4} from "uuid";

const updateProp = (state, setId, propName, value) => {
    const indexOfSet = state.findIndex(el => el.id === setId)
    if (indexOfSet !== -1) {
        const set = {...state[indexOfSet]}
        state.splice(indexOfSet, 1)
        set[propName] = value
        state.push(set)
    } else {
        throw `cant find set with id: ${id}`
    }
}

export const getNewSet = () => {
    return {
        id: uuidv4(),
        numberReps: 12,
        weight: 40,
        workTime: null,
        finished: false,
    }
}

const setSlice = createSlice({
    name: 'set',
    initialState: [],
    reducers: {
        reset: state => {
            state.splice(0, state.length)
        },
        addSet: (state, action) => {
            if (
                !('id' in action.payload) ||
                !('numberReps' in action.payload) ||
                !('weight' in action.payload) ||
                !('workTime' in action.payload) ||
                !('finished' in action.payload)
            ) {
                throw `bad addSet action payload: ${JSON.stringify(action.payload)}`
            }

            const id = action.payload.id
            const numberReps = action.payload.numberReps
            const weight = action.payload.weight
            const workTime = action.payload.workTime
            const finished = action.payload.finished

            state.push({
                id: id,
                numberReps: numberReps,
                weight: weight,
                workTime: workTime,
                finished: finished,
            })
        },
        removeSet: (state, action) => {
            if (action.payload == null) {
                throw `bad removeSet action payload: ${JSON.stringify(action.payload)}`
            }

            const id = action.payload
            const indexToRemove = state.findIndex(el => el.id === id)
            if (indexToRemove !== -1) {
                state.splice(indexToRemove, 1)
            } else {
                throw `cant find set with id: ${id}`
            }
        },
        finishSet: (state, action) => {
            if (!('id' in action.payload) || !('time' in action.payload)) {
                throw `bad removeSet action payload: ${JSON.stringify(action.payload)}`
            }

            const id = action.payload.id
            const time = action.payload.time
            updateProp(state, id, 'finished', true)
            updateProp(state, id, 'finished_at', (new Date()).toISOString())
            updateProp(state, id, 'workTime', time)
        },
        changeSetReps: (state, action) => {
            if (
                !('setId' in action.payload) ||
                !('reps' in action.payload)
            ) {
                throw `bad changeSetReps action payload: ${JSON.stringify(action.payload)}`
            }

            const id = action.payload.setId
            const reps = action.payload.reps
            updateProp(state, id, 'numberReps', reps)
        },
        changeSetWeight: (state, action) => {
            if (
                !('setId' in action.payload) ||
                !('weight' in action.payload)
            ) {
                throw `bad changeSetWeight action payload: ${JSON.stringify(action.payload)}`
            }

            const id = action.payload.setId
            const weight = action.payload.weight
            updateProp(state, id, 'weight', weight)
        },

    }
})

export const selectSet = state => state.set

export const {
    reset,
    addSet,
    removeSet,
    finishSet,
    changeSetReps,
    changeSetWeight,
} = setSlice.actions

export default setSlice.reducer
