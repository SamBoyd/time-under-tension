import devToolsEnhancer from 'remote-redux-devtools';
import {persistReducer, persistStore} from "redux-persist";
import {combineReducers, configureStore} from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage'
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from "redux-persist/es/constants";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";

import workoutReducer from './reducers/workoutReducer'
import timerReducer from "./reducers/timerReducer";
import workoutTemplateReducer from "./reducers/workoutTemplatesReducer";
import workoutHistoryReducer from "./reducers/workoutHistoryReducer";
import exercisesReducer from "./reducers/exercisesReducer";
import setReducer from "./reducers/setReducer";
import workReducer from "./reducers/workReducer";
import newTemplateWorkoutReducer from "./reducers/newTemplateWorkoutReducer";
import settingsReducer from "./reducers/settingsReducer";


const rootReducer = combineReducers({
    settings: settingsReducer,
    workout: workoutReducer,
    timer: timerReducer,
    templates: workoutTemplateReducer,
    newTemplateWorkout: newTemplateWorkoutReducer,
    history: workoutHistoryReducer,
    exercises: exercisesReducer,
    set: setReducer,
    work: workReducer,
})


const persistConfig = {
    key: 'root',
    version: 1,
    storage: AsyncStorage,
    stateReconciler: autoMergeLevel2
}

const persistedRootReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedRootReducer,
    devTools: false,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
    enhancers: [devToolsEnhancer({
        name: 'Android app', realtime: true,
        hostname: 'localhost', port: 8002,
        maxAge: 30, actionsBlacklist: ['EFFECT_RESOLVED'],
        suppressConnectErrors: false,
        secure: false,
        actionSanitizer: (action) => (
            action.type === 'FILE_DOWNLOAD_SUCCESS' && action.data ?
                {...action, data: '<<LONG_BLOB>>'} : action
        ),
        stateSanitizer: (state) => state.data ? {...state, data: '<<LONG_BLOB>>'} : state
    })]
})

export const persistor = persistStore(store)

export default store
