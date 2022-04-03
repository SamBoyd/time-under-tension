import {isRealValue} from "../utils/utils";
import {loadSetsByIds, loadWorkByIds} from "../utils/stateUtils";
import {
    DEFAULT_REST_TIME,
    DEFAULT_SETUP_TIME,
    DEFAULT_WORK_TIME_LOWER,
    DEFAULT_WORK_TIME_UPPER,
    TIMER_STATE
} from "../constants";
import {moveToRest, moveToSetup, moveToWork} from "../reducers/timerReducer";
import {finishSet} from "../reducers/setReducer";
import {selectWork} from "../reducers/workoutReducer";
import {playConfiguredWorkSound} from "./soundService";

const NOOP_TIMINGS = {
    restTime: 10,
    setupTime: 3,
    workTimeStart: 10,
    workTimeEnd: 15,
    onCompleteCB: () => {
        console.log('noop timings callback called')
    }
}


export const getCurrentTimings = (
    dispatch,
    {
        timerState,
        workoutState,
        workState,
        setState
    }
) => {
    let currentWork, sets, currentSet

    if (workoutState.currentWork == null && workoutState.currentWork > workoutState.work.length) {
        return NOOP_TIMINGS
    }

    const works = loadWorkByIds(workoutState.work, workState)
    currentWork = works[workoutState.currentWork]

    if (!isRealValue(currentWork) || currentWork.sets.length === 0) {
        return NOOP_TIMINGS
    }

    sets = loadSetsByIds(currentWork.sets, setState)
    currentSet = sets.find(s => !s.finished)

    let shouldFinishSet, shouldIncrementCurrentWork, nextStateAction, shouldPlayNoise
    shouldFinishSet = shouldIncrementCurrentWork = shouldPlayNoise = false

    switch (timerState.state) {
        case TIMER_STATE.ready:
            nextStateAction = moveToSetup
            break;
        case TIMER_STATE.setup:
            nextStateAction = moveToWork
            shouldPlayNoise = true
            break;
        case TIMER_STATE.work:
            nextStateAction = moveToRest
            shouldFinishSet = true
            if (sets.filter(s => !s.finished).length === 1) {
                shouldIncrementCurrentWork = true
            }
            break;
        case TIMER_STATE.rest:
            nextStateAction = moveToSetup
            shouldPlayNoise = true
            break;
    }

    return {
        restTime: currentWork.restTime || DEFAULT_REST_TIME,
        setupTime: DEFAULT_SETUP_TIME,
        workTimeStart: currentWork.workTimeStart || DEFAULT_WORK_TIME_LOWER,
        workTimeEnd: currentWork.workTimeEnd || DEFAULT_WORK_TIME_UPPER,
        onCompleteCB: () => {
            dispatch(nextStateAction())

            if (shouldFinishSet) {
                dispatch(finishSet(currentSet.id))
            }

            if (shouldIncrementCurrentWork) {
                dispatch(selectWork({workIndex: workoutState.currentWork + 1}))
            }

            if (shouldPlayNoise) {
                playConfiguredWorkSound()
            }
        }
    }

}
