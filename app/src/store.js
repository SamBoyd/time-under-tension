import { configureStore } from "@reduxjs/toolkit";
import workoutReducer from './reducers/workoutreducers'
import uiStateReducer from "./reducers/uiStateReducer";

export default configureStore({
    reducer: {
        workout: workoutReducer,
        uiState: uiStateReducer
    }
})
