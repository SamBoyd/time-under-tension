import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    moveWorkDown as moveWorkDownInTemplate,
    moveWorkUp as moveWorkUpInTemplate,
    removeWork as removeWorkInTemplate
} from "../reducers/newTemplateWorkoutReducer";
import GenericWork from "./genericWork";
import {addSetAction} from "../reducers/actions";
import {updateRestOnWork, updateSetsOnWork, updateWorkTimeOnWork} from "../reducers/workReducer";
import {selectSettings} from "../reducers/settingsReducer";

const Work = props => {
    const dispatch = useDispatch()
    const settingsState = useSelector(selectSettings)

    const work = props.work

    const workTimeStart = work.workTimeStart || settingsState.defaultWorkTimeStart
    const workTimeEnd = work.workTimeEnd || settingsState.defaultWorkTimeEnd


    const fireAddSet = () => {
        addSetAction(dispatch, work.id)
    }

    const fireRemoveSet = setId => {
        const newSets = work.sets.filter(s => s !== setId)
        dispatch(updateSetsOnWork({
            workId: work.id,
            sets: newSets
        }))
    }

    const fireChangeRestTime = value => {
        dispatch(updateRestOnWork({
            workId: work.id,
            restTime: value
        }))
    }

    const fireChangeWorkTimeStart = value => {
        dispatch(updateWorkTimeOnWork({
            workId: work.id,
            workTimeStart: value,
            workTimeEnd: workTimeEnd
        }))
    }

    const fireChangeWorkTimeEnd = value => {
        dispatch(updateWorkTimeOnWork({
            workId: work.id,
            workTimeStart: workTimeStart,
            workTimeEnd: value
        }))
    }
    const removeWork = () => {
        dispatch(removeWorkInTemplate(work.id))
    }

    const moveWorkDown = () => {
        dispatch(moveWorkDownInTemplate(work.id))
    }

    const moveWorkUp = () => {
        dispatch(moveWorkUpInTemplate(work.id))
    }

    return (
        <GenericWork
            {...work}
            workIndex={props.workIndex}
            fireAddSet={fireAddSet}
            fireRemoveSet={fireRemoveSet}
            fireChangeRestTime={fireChangeRestTime}
            fireChangeWorkTimeStart={fireChangeWorkTimeStart}
            fireChangeWorkTimeEnd={fireChangeWorkTimeEnd}
            removeWork={removeWork}
            moveWorkUp={moveWorkUp}
            moveWorkDown={moveWorkDown}
            previousSets={[]}
        />
    )
}

export default Work
