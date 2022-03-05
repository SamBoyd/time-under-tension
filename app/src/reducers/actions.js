import {
    addWork,
    createWorkoutFromTemplate,
    finishSet,
    resetToInitialWorkout,
    selectWork
} from "./workoutReducer";
import {addWork as addTemplateWork, cancelEditTemplate, editTemplate, saveTemplate} from "./templateWorkoutReducer";
import {
    followRedirect,
    moveToCreateTemplate,
    moveToMainPage,
    moveToManageExercises,
    moveToWorkout
} from "./uiStateReducer";
import {moveToRest, resetTimer} from "./timerReducer";
import {addWorkoutToHistory} from "./historyReducer";
import structuredClone from '@ungap/structured-clone';
import {resetNewExercise, saveNewExercise} from "./exercisesReducer";

export const pickExerciseForWorkoutAction = exercise => dispatch => {
    dispatch(addWork({exercise: exercise}))
    dispatch(followRedirect())
}

export const pickExerciseForTemplateWorkoutAction = exercise => dispatch => {
    dispatch(addTemplateWork({exercise: exercise}))
    dispatch(followRedirect())
}


export const finishSetAction = (dispatch, set) => () => {
    dispatch(moveToRest())

    if (set) {
        dispatch(finishSet({setId: set.id}))
    }
}

export const selectWorkAndResetTimer = (workIndex, dispatch) => {
    dispatch(selectWork({workIndex: workIndex}))
    dispatch(resetTimer())
}

export const saveTemplateAndMoveToMainPage = (dispatch) => {
    dispatch(saveTemplate())
    dispatch(moveToMainPage())
}

export const moveToEditTemplate = (dispatch, templateId) => {
    dispatch(editTemplate({id: templateId}))
    dispatch(moveToCreateTemplate())
}

export const cancelEditTemplateAndMoveToMainPage = (dispatch) => {
    dispatch(cancelEditTemplate())
    dispatch(moveToMainPage())
}

export const createWorkoutFromTemplateAndMoveToWorkout = (dispatch, template) => {
    dispatch(createWorkoutFromTemplate({template: template}))
    dispatch(moveToWorkout())
}

export const finishWorkoutAndMoveToMainPage = (dispatch, workout) => {
    const w = structuredClone(workout)
    w.finished_at = new Date().toISOString()
    dispatch(addWorkoutToHistory({workout: w}))
    dispatch(resetToInitialWorkout())
    dispatch(moveToMainPage())
}

export const saveNewExerciseAndMoveToManageExercises = (dispatch) => {
    dispatch(saveNewExercise())
    dispatch(moveToManageExercises())
}

export const resetNewExerciseAndMoveToManageExercises = (dispatch) => {
    dispatch(resetNewExercise())
    dispatch(moveToManageExercises())
}