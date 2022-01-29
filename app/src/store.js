import { configureStore } from "@reduxjs/toolkit";
import workoutReducer from './reducers/workoutreducers'
import uiStateReducer from "./reducers/uiStateReducer";
import timerReducer from "./reducers/timerReducer";

export default configureStore({
    reducer: {
        workout: workoutReducer,
        uiState: uiStateReducer,
        timer: timerReducer
    }
})
