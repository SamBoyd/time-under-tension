import {isRealValue} from "./utils";
import store from '../store'

export const loadWorkByIds = (workIds, workState) => {
    return workIds.map(workId => {
        return workState.find(w => w.id === workId)
    })
}

export const loadSetsByIds = (setIds, setState) => {
    return setIds.map(setId => {
        return setState.find(s => s.id === setId)
    })
}

export const loadPreviousSetsForExercise = (exerciseId, workState, setState) => {
    const work = workState.filter(w => w.exercise.id === exerciseId)
    const sorted = work.sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at))

    const lastWork = sorted.slice(1).find(w => {
        const sets = loadSetsByIds(w.sets, setState)
        return sets.some(s=>s.finished)
    })

    if (isRealValue(lastWork)) {
        return loadSetsByIds(lastWork.sets, setState)
    } else {
        return []
    }
}

export const getWorkTimeOfActiveWork = () => {
    const state = store.getState()
    const activeWorkId = state.timer.activeWorkId
    const work = state.work.find(w => w.id === activeWorkId)

    const defaultWorkTimeStart = state.settings.defaultWorkTimeStart
    const defaultWorkTimeEnd = state.settings.defaultWorkTimeEnd

    return {
        start: work.workTimeStart || defaultWorkTimeStart,
        end: work.workTimeEnd || defaultWorkTimeEnd
    }
}

export const getRestTimeOfActiveWork = () => {
    const state = store.getState()
    const activeWorkId = state.timer.activeWorkId
    const work = state.work.find(w => w.id === activeWorkId)

    const defaultRestTime = state.settings.defaultRestTime

    return work.restTime || defaultRestTime
}
