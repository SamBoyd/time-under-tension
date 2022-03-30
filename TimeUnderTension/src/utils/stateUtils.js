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
