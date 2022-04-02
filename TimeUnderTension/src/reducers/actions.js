import {selectWork, startWorkoutIfNotStarted} from "./workoutReducer";
import {reset as resetNewTemplate, addWork as addTemplateWork, editTemplate, resetTemplate} from "./newTemplateWorkoutReducer";
import {moveToRest, moveToSetup, resetTimer} from "./timerReducer";
import {addSetToWork, addWork, newWorkForExercise} from "./workReducer";
import {addSet, finishSet, getNewSet} from "./setReducer";


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
    dispatch(selectWork({workIndex: workIndex}))
    dispatch(resetTimer())
}

export const moveToSetupAndStartWorkout = dispatch => {
    dispatch(moveToSetup())
    dispatch(startWorkoutIfNotStarted())
}
