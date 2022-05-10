import {isRealValue} from "../utils/utils";
import {loadSetsByIds, loadWorkByIds} from "../utils/stateUtils";
import {TIMER_STATE} from "../constants";
import {
    changeActiveWork,
    moveToReady,
    moveToRest,
    moveToSetup,
    moveToWork,
    NO_ACTIVE_WORK
} from "../reducers/timerReducer";
import {finishSet} from "../reducers/setReducer";
import {playSound} from "./soundService";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";

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

    let shouldFinishSet, shouldIncrementCurrentWork, nextTimerStateAction, shouldPlayNoise
    shouldFinishSet = shouldIncrementCurrentWork = shouldPlayNoise = false

    let soundToPlay
    switch (timerState.state) {
        case TIMER_STATE.ready:
            nextTimerStateAction = moveToSetup
            break;
        case TIMER_STATE.setup:
            nextTimerStateAction = moveToWork
            shouldPlayNoise = true
            soundToPlay = settingsState.soundStartWork
            break;
        case TIMER_STATE.work:
            shouldFinishSet = true
            if (activeSet.id === activeWork.sets[activeWork.sets.length - 1]) {
                shouldIncrementCurrentWork = true
                nextTimerStateAction = moveToReady
            } else {
                nextTimerStateAction = moveToRest
            }
            break;
        case TIMER_STATE.rest:
            nextTimerStateAction = moveToSetup
            shouldPlayNoise = true
            soundToPlay = settingsState.soundSetup
            break;
    }

    return {
        restTime: (activeWork.restTime || settingsState.defaultRestTime) - settingsState.defaultSetupTime,
        setupTime: settingsState.defaultSetupTime,
        workTimeStart: isRealValue(activeWork.workTimeStart) ? activeWork.workTimeStart : settingsState.defaultWorkTimeStart,
        workTimeEnd: isRealValue(activeWork.workTimeEnd) ? activeWork.workTimeEnd : settingsState.defaultWorkTimeEnd,
        onCompleteCB: (timeOffset) => ({totalElapsedTime}) => {
            ReactNativeHapticFeedback.trigger("impactMedium", {
                enableVibrateFeedback: true
            })

            if (shouldFinishSet) {
                dispatch(finishSet({id: activeSet.id, time: totalElapsedTime + timeOffset}))
            }

            if (shouldIncrementCurrentWork) {
                const currentActiveWorkIndex = workoutState.work.indexOf(activeWorkId)
                const nextActiveWorkId = currentActiveWorkIndex + 1 < workoutState.work.length
                    ? workoutState.work[currentActiveWorkIndex + 1]
                    : NO_ACTIVE_WORK
                dispatch(changeActiveWork(nextActiveWorkId))
            }

            if (shouldPlayNoise) {
                playSound(soundToPlay)
            }

            dispatch(nextTimerStateAction())
        }
    }

}
