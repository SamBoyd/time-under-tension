import { configureStore } from "@reduxjs/toolkit";
import workoutReducer from './reducers/workoutReducer'
import uiStateReducer from "./reducers/uiStateReducer";
import timerReducer from "./reducers/timerReducer";
import templateWorkoutReducer from "./reducers/templateWorkoutReducer";
import historyReducer from "./reducers/historyReducer";
import exercisesReducer from "./reducers/exercisesReducer";
import devToolsEnhancer from 'remote-redux-devtools';

export default configureStore({
    reducer: {
        workout: workoutReducer,
        uiState: uiStateReducer,
        timer: timerReducer,
        templateWorkouts: templateWorkoutReducer,
        history: historyReducer,
        exercises: exercisesReducer
    },
    devTools: false,
    enhancers: [devToolsEnhancer({
        name: 'Android app', realtime: true,
        hostname: 'localhost', port: 8000,
        maxAge: 30, actionsBlacklist: ['EFFECT_RESOLVED'],
        secure: false,
        actionSanitizer: (action) => (
            action.type === 'FILE_DOWNLOAD_SUCCESS' && action.data ?
                { ...action, data: '<<LONG_BLOB>>' } : action
        ),
        stateSanitizer: (state) => state.data ? { ...state, data: '<<LONG_BLOB>>' } : state
    })]
})
