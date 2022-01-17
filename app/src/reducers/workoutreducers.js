import {createSlice} from "@reduxjs/toolkit";
import {v4 as uuidv4} from 'uuid';


const getNewWork = order => {
    return {
        id: uuidv4(),
        exercise: {},
        order: 0,
        sets: []
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
            let newWork = getNewWork(state.work.length + 1)
            state.work.push(newWork)
        },
        removeWork: (state, action) => {
            state.work.splice(action.payload.index, 1)

            for (let i=0; i++; i<state.work.length) {
                console.log('changing ' + i)
                state.work[i].order = i
            }
        },
        moveWorkUp: (state, action) => {
            const i = action.payload.index
            console.log(`Up index: ${i}`)
            const element = state.work[i]
            state.work.splice(i, 1)
            state.work.splice(i-1, 0, element)
        },
        moveWorkDown: (state, action) => {
            const i = action.payload.index
            console.log(`Down index: ${i}`)
            const element = {}
            Object.assign(element, state.work[i])
            state.work.splice(i, 1)
            state.work.splice(i+1, 0, element)
        },
    }
})

export const selectWorkout = state => state.workout
export const {removeWork, addWork, moveWorkUp, moveWorkDown} = workoutSlice.actions

export default workoutSlice.reducer
