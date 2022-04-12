import {isRealValue} from "./utils";

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
    const lastWork = sorted[1] // 1 because 0 will be the in-progress work

    if (isRealValue(lastWork)) {
        return loadSetsByIds(lastWork.sets, setState)
    } else {
        return []
    }
}
