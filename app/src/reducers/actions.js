import {addWork, finishSet} from "./workoutreducers";
import {moveToWorkout} from "./uiStateReducer";
import {moveToRest} from "./timerReducer";

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