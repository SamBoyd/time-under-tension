import {createSlice} from "@reduxjs/toolkit";
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

const getInitialState = () => {
    return {
        name: 'New template workout',
        id: uuidv4(),
        created_at: (new Date()).toISOString(),
        work: [],
    }
}

export const newTemplateWorkoutSlice = createSlice({
    name: 'newTemplateWorkout',
    initialState: getInitialState(),
    reducers: {
        reset: state => {
            const initialState = getInitialState()
            Object.keys(initialState).forEach(key => state[key] = initialState[key])
        },
        renameTemplate: (state, action) => {
            state.name = action.payload.name
        },
        editTemplate: (state, action) => {
            Object.keys(action.payload).forEach(key => state[key] = action.payload[key])
        },
        resetTemplate: state => {
            const newState = getInitialState()
            Object.keys(newState).forEach(key => state[key] = newState[key])
        },
        editTemplateName: (state, action) => {
            state.name = action.payload.name
        },
        addWork: (state, action) => {
            const workId = action.payload
            state.work.push(workId)
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
    }
})

export const selectNewTemplateWorkout = state => state.newTemplateWorkout
export const {
    reset, renameTemplate, editTemplate, resetTemplate,
    editTemplateName,
    removeWork, addWork, moveWorkUp, moveWorkDown
} = newTemplateWorkoutSlice.actions

export default newTemplateWorkoutSlice.reducer
