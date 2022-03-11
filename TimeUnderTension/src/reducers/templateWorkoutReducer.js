import {createSlice} from "@reduxjs/toolkit";
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

const getNewTemplateWorkout = () => {
    return {
        name: 'New template workout',
        id: uuidv4(),
        created_at: (new Date()).toISOString(),
        work: []
    }
}

const getInitialState = () => {
    return {
        newTemplate: getNewTemplateWorkout(),
        templates: [
            {
                name: 'Test template',
                id: uuidv4(),
                created_at: (new Date()).toISOString(),
                work: [
                    {
                        id: uuidv4(),
                        exercise: {
                            id: uuidv4(),
                            name:'Bench press',
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
                            name:'Military press',
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
                            name:'Bench press',
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
                            name:'Military press',
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
                            name:'Bench press',
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
                            name:'Military press',
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
        ]
    }
}

export const templateWorkoutSlice = createSlice({
    name: 'templateWorkouts',
    initialState: getInitialState(),
    reducers: {
        saveTemplate: (state) => {
            if (!('indexInTemplates' in state.newTemplate)) {
                const newTemplate =  {...state.newTemplate}
                state.newTemplate = getNewTemplateWorkout()
                state.templates.push(newTemplate)
            } else {
                const editedTemplate =  {...state.newTemplate}
                const index = editedTemplate.indexInTemplates
                delete editedTemplate.indexInTemplates
                state.templates.splice(index, 1, editedTemplate)
                state.newTemplate = getNewTemplateWorkout()
            }
        },
        renameTemplate: (state, action) => {
            state.newTemplate.name = action.payload.name
        },
        editTemplate: (state, action) => {
            const id = action.payload.id
            console.log(id)
            state.templates.forEach((template, i) => {
                if (template.id !== id) {
                    return
                }
                console.log(`found template at index ${i}`)
                state.newTemplate = {...template}
                state.newTemplate.indexInTemplates = i
            })
        },
        cancelEditTemplate: state => {
            state.newTemplate = getNewTemplateWorkout()
        },
        editTemplateName: (state, action) => {
            state.newTemplate.name = action.payload.name
        },

        addWork: (state, action) => {
            const exercise = action.payload.exercise;
            if (!exercise) {
                return
            }
            let newWork = getNewWork(exercise)
            state.newTemplate.work.push(newWork)
        },
        removeWork: (state, action) => {
            state.newTemplate.work.splice(action.payload.index, 1)
        },
        moveWorkUp: (state, action) => {
            const i = action.payload.index
            const element = state.newTemplate.work[i]
            state.newTemplate.work.splice(i, 1)
            state.newTemplate.work.splice(i-1, 0, element)
        },
        moveWorkDown: (state, action) => {
            const i = action.payload.index
            const element = state.newTemplate.work[i]
            state.newTemplate.work.splice(i, 1)
            state.newTemplate.work.splice(i+1, 0, element)
        },

        addSet: (state, action) => {
            const workId = action.payload.workId
            if (!workId) {
                return
            }
            const workIndex = state.newTemplate.work.findIndex(work => work.id === workId)
            state.newTemplate.work[workIndex].sets.push(getNewSet())
        },
        removeSet: (state, action) => {
            const setId = action.payload.setId
            const workId = action.payload.workId
            if (!setId || !workId) {
                return
            }

            const workIndex = state.newTemplate.work.findIndex(work => work.id === workId)
            const setIndex = state.newTemplate.work[workIndex].sets.findIndex(set => set.id === setId)

            state.newTemplate.work[workIndex].sets.splice(setIndex, 1)
        },
        changeRestTime: (state, action) => {
            const workId = action.payload.workId
            const restTime = action.payload.restTime
            if (!workId || !restTime) {
                return
            }
            const workIndex = state.newTemplate.work.findIndex(work => work.id === workId)
            state.newTemplate.work[workIndex].restTime = restTime
        },
        changeWorkTime: (state, action) => {
            const workId = action.payload.workId
            const workStart = action.payload.workTime.start
            const workEnd = action.payload.workTime.end

            if( !workId || !workStart || !workEnd) {
                return
            }

            const workIndex = state.newTemplate.work.findIndex(work => work.id === workId)
            state.newTemplate.work[workIndex].workTime = {start: workStart, end: workEnd}
        },

        changeSetReps: (state, action) => {
            const setId = action.payload.setId
            const reps = action.payload.reps

            if (!setId || !reps) {
                return
            }


            for (let iw=0; iw<state.newTemplate.work.length; iw++) {
                const work = state.newTemplate.work[iw]
                for (let is=0; is<work.sets.length; is++){
                    const set = work.sets[is]
                    if (set.id === setId) {
                        state.newTemplate.work[iw].sets[is].numberReps = reps
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


            for (let iw=0; iw<state.newTemplate.work.length; iw++) {
                const work = state.newTemplate.work[iw]
                for (let is=0; is<work.sets.length; is++){
                    const set = work.sets[is]
                    if (set.id === setId) {
                        state.newTemplate.work[iw].sets[is].weight = weight
                    }
                }
            }
        },
    }
})

export const selectTemplateWorkout = state => state.templateWorkouts
export const {
    saveTemplate, renameTemplate, editTemplate, cancelEditTemplate,
    editTemplateName,
    removeWork, addWork, moveWorkUp, moveWorkDown,
    addSet, removeSet, changeRestTime, changeWorkTime,
    changeSetReps, changeSetWeight
} = templateWorkoutSlice.actions

export default templateWorkoutSlice.reducer
