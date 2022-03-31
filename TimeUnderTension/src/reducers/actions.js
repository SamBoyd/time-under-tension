import {
    addWork as addWorkToWorkout,
    createWorkoutFromTemplate,
    resetToInitialWorkout,
    selectWork, startWorkoutIfNotStarted
} from "./workoutReducer";
import {reset as resetNewTemplate, addWork as addTemplateWork, editTemplate, resetTemplate} from "./newTemplateWorkoutReducer";
import {
    followRedirect,
    moveToCreateTemplate,
    moveToMainPage,
    moveToManageExercises,
    moveToWorkout
} from "./uiStateReducer";
import {moveToRest, moveToSetup, resetTimer} from "./timerReducer";
import {addWorkoutToHistory} from "./workoutHistoryReducer";
import {resetNewExercise, saveNewExercise} from "./exercisesReducer";
import {addSetToWork, addWork, newWorkForExercise} from "./workReducer";
import {addSet, finishSet, getNewSet} from "./setReducer";
import {addToTemplates} from "./workoutTemplatesReducer";

export const pickExerciseForWorkoutAction = exercise => dispatch => {
    const newWork = newWorkForExercise(exercise)
    dispatch(addWorkToWorkout(newWork.id))
    dispatch(addWork(newWork))
    dispatch(followRedirect())
}

export const addSetAction = (dispatch, workId) => {
    const newSet = getNewSet()
    dispatch(addSet(newSet))
    dispatch(addSetToWork({workId: workId, setId: newSet.id}))
}

export const pickExerciseForTemplateWorkoutAction = exercise => dispatch => {
    const newWork = newWorkForExercise(exercise)
    dispatch(addTemplateWork(newWork.id))
    dispatch(addWork(newWork))
    dispatch(followRedirect())
}


export const finishSetAction = (dispatch, set) => () => {
    dispatch(finishSet(set.id))
    dispatch(moveToRest())
}

export const selectWorkAndResetTimer = (workIndex, dispatch) => {
    dispatch(selectWork({workIndex: workIndex}))
    dispatch(resetTimer())
}

export const saveTemplateAndMoveToMainPage = (dispatch, newTemplate) => {
    dispatch(addToTemplates(newTemplate))
    dispatch(resetTemplate())
    dispatch(moveToMainPage())
}

export const moveToEditTemplate = (dispatch, template) => {
    dispatch(editTemplate(template))
    dispatch(moveToCreateTemplate())
}

export const cancelEditTemplateAndMoveToMainPage = (dispatch) => {
    dispatch(resetNewTemplate())
    dispatch(moveToMainPage())
}

export const createWorkoutFromTemplateAndMoveToWorkout = (dispatch, template) => {
    dispatch(createWorkoutFromTemplate(template))
    dispatch(moveToWorkout())
}

export const finishWorkoutAndMoveToMainPage = (dispatch, workout) => {
    const w = {...workout}
    w.finished_at = new Date().toISOString()
    dispatch(addWorkoutToHistory({workout: w}))
    dispatch(resetToInitialWorkout())
    dispatch(resetTimer())
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

export const moveToSetupAndStartWorkout = dispatch => {
    dispatch(moveToSetup())
    dispatch(startWorkoutIfNotStarted())
}
