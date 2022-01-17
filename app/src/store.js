import { configureStore } from "@reduxjs/toolkit";
import workoutReducer from './reducers/workoutreducers'

export default configureStore({
    reducer: {
        workout: workoutReducer
    }
})
