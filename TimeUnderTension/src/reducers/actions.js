import {v4 as uuidv4} from 'uuid';

import {createWorkoutFromTemplate, resetToInitialWorkout} from "./workoutReducer";
import {changeActiveWork, moveToRest, reset as resetTimer, resetTimerCount} from "./timerReducer";
import {addSetToWork, addWork} from "./workReducer";
import {addSet, changeSetReps, changeSetWeight, finishSet, getNewSet} from "./setReducer";
import {loadSetsByIds, loadWorkByIds} from "../utils/stateUtils";
import {addWorkoutToHistory} from "./workoutHistoryReducer";
import store from '../store'

export const finishWorkoutAndCreateHistoryAction = (dispatch, workout) => {
    const w = {...workout}
    w.finished_at = new Date().toISOString()
    dispatch(addWorkoutToHistory({workout: w}))
    dispatch(resetToInitialWorkout())
    dispatch(resetTimer())
}

export const addSetAction = (dispatch, workId) => {
    const newSet = getNewSet()
    dispatch(addSet(newSet))
    dispatch(addSetToWork({workId: workId, setId: newSet.id}))
}

export const finishSetAction = (dispatch, set) => () => {
    dispatch(finishSet(set.id))
    dispatch(moveToRest())
}

export const selectWorkAndResetTimer = (workIndex, dispatch) => {
    dispatch(resetTimerCount())
}


export const createWorkoutFromTemplateAction = (template, workState, setState, dispatch) => {
    _createWorkoutFromTemplateAction(
        template,
        workState,
        setState,
        dispatch,
        createWorkoutFromTemplate,
        addWork,
        addSet,
        changeActiveWork
    )
}


export const _createWorkoutFromTemplateAction = (
    template,
    workState,
    setState,
    dispatch,
    createWorkoutAction,
    createWorkAction,
    createSetAction,
    setActiveWorkIDAction
) => {
    const templateWorkout = {...template}

    const templateWork = loadWorkByIds(templateWorkout.work, workState)
    const newWork = templateWork.map(w => {
        return {...w}
    })
    const newWorkIds = newWork.map(() => uuidv4())

    const templateSets = templateWork.map(w => loadSetsByIds(w.sets, setState))
    const newSets = templateSets.map(sets => sets.map(s => {
        return {...s}
    }))
    const newSetIds = templateSets.map(sets => sets.map(() => uuidv4()))


    const newWorkout = {...templateWorkout}
    newWorkout.id = uuidv4()
    newWorkout.work = newWorkIds

    newWork.forEach((workId, index) => newWork[index].id = newWorkIds[index])

    newWork.forEach((workId, index) => newWork[index].sets = newSetIds[index])

    newSets.forEach((sets, i) => sets.forEach((set, ii) => set.id = newSetIds[i][ii]))

    dispatch(createWorkoutAction(newWorkout))

    newWork.forEach(w => {
        dispatch(createWorkAction(w))
    })

    newSets.forEach((sets, index) => {
        sets.forEach(set => dispatch(createSetAction(set)))
    })

    dispatch(setActiveWorkIDAction(newWork[0].id))
}


export const updateRepsOnAllSets = (workId, reps) => {
    const state = store.getState()
    const work = state.work.find(w => w.id === workId)
    if (work === null) {
        throw `cant find work with id ${workId}`
    }
    const sets = state.set.filter(s => work.sets.includes(s.id) && s.finished !== true)
    if (sets.length === 0) {
        throw `cant find sets for work with id ${workId}`
    }
    sets.forEach(set => store.dispatch(changeSetReps({setId: set.id, reps: reps})))
}

export const updateWeightOnAllSets = (workId, weight) => {
    const state = store.getState()
    const work = state.work.find(w => w.id === workId)
    if (work === null) {
        throw `cant find work with id ${workId}`
    }
    const sets = state.set.filter(s => work.sets.includes(s.id) && s.finished !== true)
    if (sets.length === 0) {
        throw `cant find sets for work with id ${workId}`
    }
    sets.forEach(set => store.dispatch(changeSetWeight({setId: set.id, weight: weight})))
}
