import {addWork} from "./workoutreducers";
import {moveToWorkout} from "./uiStateReducer";

export const pickExerciseAction = exercise => dispatch => {
    dispatch(addWork({exercise: exercise}))
    dispatch(moveToWorkout())
}