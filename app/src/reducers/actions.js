import {addWork, finishSet, selectWork} from "./workoutreducers";
import {moveToWorkout} from "./uiStateReducer";
import {moveToRest, resetTimer} from "./timerReducer";

export const pickExerciseAction = exercise => dispatch => {
    dispatch(addWork({exercise: exercise}))
    dispatch(moveToWorkout())
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