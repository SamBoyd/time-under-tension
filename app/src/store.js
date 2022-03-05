import { configureStore } from "@reduxjs/toolkit";
import workoutReducer from './reducers/workoutReducer'
import uiStateReducer from "./reducers/uiStateReducer";
import timerReducer from "./reducers/timerReducer";
import templateWorkoutReducer from "./reducers/templateWorkoutReducer";
import historyReducer from "./reducers/historyReducer";
import exercisesReducer from "./reducers/exercisesReducer";

export default configureStore({
    reducer: {
        workout: workoutReducer,
        uiState: uiStateReducer,
        timer: timerReducer,
        templateWorkouts: templateWorkoutReducer,
        history: historyReducer,
        exercises: exercisesReducer
    }
})
