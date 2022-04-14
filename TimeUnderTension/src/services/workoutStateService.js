import {isRealValue} from "../utils/utils";
import {loadSetsByIds, loadWorkByIds} from "../utils/stateUtils";
import {
    DEFAULT_REST_TIME,
    DEFAULT_SETUP_TIME,
    TIMER_STATE
} from "../constants";
import {changeActiveWork, moveToRest, moveToSetup, moveToWork, NO_ACTIVE_WORK} from "../reducers/timerReducer";
import {finishSet} from "../reducers/setReducer";
import {playConfiguredWorkSound} from "./soundService";
import {startWorkoutIfNotStarted} from "../reducers/workoutReducer";

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
        setState,
        settingsState,
    }
) => {
    const activeWorkId = timerState.activeWorkId
    const activeWork = loadWorkByIds(workoutState.work, workState)?.find(w => w.id === activeWorkId)
    if (timerState.activeWorkId === NO_ACTIVE_WORK || workoutState.work.length === 0 || activeWork.sets.length === 0) {
        return NOOP_TIMINGS
    }

    const activeSet = loadSetsByIds(activeWork.sets, setState)?.find(s => !s.finished)

    let shouldFinishSet, shouldIncrementCurrentWork, nextTimerStateAction, shouldPlayNoise, startsWorkout
    shouldFinishSet = shouldIncrementCurrentWork = shouldPlayNoise = startsWorkout = false

    switch (timerState.state) {
        case TIMER_STATE.ready:
            startsWorkout = true
            nextTimerStateAction = moveToSetup
            break;
        case TIMER_STATE.setup:
            nextTimerStateAction = moveToWork
            shouldPlayNoise = true
            break;
        case TIMER_STATE.work:
            nextTimerStateAction = moveToRest
            shouldFinishSet = true
            if (activeSet.id === activeWork.sets[activeWork.sets.length - 1]) {
                shouldIncrementCurrentWork = true
            }
            break;
        case TIMER_STATE.rest:
            nextTimerStateAction = moveToSetup
            shouldPlayNoise = true
            break;
    }

    return {
        restTime: activeWork.restTime || DEFAULT_REST_TIME,
        setupTime: DEFAULT_SETUP_TIME,
        workTimeStart: isRealValue(activeWork.workTimeStart) ? activeWork.workTimeStart : settingsState.defaultWorkTimeStart,
        workTimeEnd: isRealValue(activeWork.workTimeEnd) ? activeWork.workTimeEnd : settingsState.defaultWorkTimeEnd,
        onCompleteCB: ({totalElapsedTime}) => {
            console.log(`timer state: ${timerState.state}`)
            console.log(`blah: ${activeWork.sets[activeWork.sets.length - 1]}`)
            console.log(`activeSetId : ${activeSet.id}`)
            console.log(`shouldIncrementCurrentWork : ${shouldIncrementCurrentWork}`)
            dispatch(nextTimerStateAction())

            if (startsWorkout) {
                dispatch(startWorkoutIfNotStarted())
            }

            if (shouldFinishSet) {
                dispatch(finishSet({id: activeSet.id, time: totalElapsedTime}))
            }

            if (shouldIncrementCurrentWork) {
                const currentActiveWorkIndex = workoutState.work.indexOf(activeWorkId)
                const nextActiveWorkId = currentActiveWorkIndex + 1 < workoutState.work.length
                    ? workoutState.work[currentActiveWorkIndex + 1]
                    : NO_ACTIVE_WORK
                dispatch(changeActiveWork(nextActiveWorkId))
            }

            if (shouldPlayNoise) {
                playConfiguredWorkSound()
            }
        }
    }

}
