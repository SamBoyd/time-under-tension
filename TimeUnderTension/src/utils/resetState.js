import {persistor} from "../store";
import {reset as workoutReducer} from "../reducers/workoutReducer";
import {reset as timerReducer} from "../reducers/timerReducer";
import {reset as newTemplateWorkoutReducer} from "../reducers/newTemplateWorkoutReducer";
import {reset as historyReducer} from "../reducers/workoutHistoryReducer";
import {reset as workoutTemplatesReducer} from "../reducers/workoutTemplatesReducer";
import {reset as exercisesReducer} from "../reducers/exercisesReducer";
import {reset as setReducer} from "../reducers/setReducer";
import {reset as workReducer} from "../reducers/workReducer";
import {reset as settingsReducer} from '../reducers/settingsReducer'

export const resetEntireState = dispatch => {
    persistor.purge()

    dispatch(workoutReducer())
    dispatch(timerReducer())
    dispatch(newTemplateWorkoutReducer())
    dispatch(workoutTemplatesReducer())
    dispatch(historyReducer())
    dispatch(exercisesReducer())
    dispatch(setReducer())
    dispatch(workReducer())
    dispatch(settingsReducer())
}