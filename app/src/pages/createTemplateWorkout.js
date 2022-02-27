import React, {useState} from 'react'
import {useSelector, useDispatch} from "react-redux";

import {
    editTemplateName,
    moveWorkDown,
    moveWorkUp,
    removeWork,
    selectTemplateWorkout
} from "../reducers/templateWorkoutReducer";
import {moveToMainPage, moveToPickExerciseForTemplateWorkout} from "../reducers/uiStateReducer";
import TemplateWork from "../components/templateWork";
import {
    cancelEditTemplate,
    cancelEditTemplateAndMoveToMainPage,
    saveTemplateAndMoveToMainPage
} from "../reducers/actions";

const CreateTemplateWorkout = () => {
    const dispatch = useDispatch()
    const templateWorkouts = useSelector(selectTemplateWorkout)
    const [uiState, setUiState] = useState({
        editingTitle: false
    })
    const newTemplate = templateWorkouts.newTemplate
    const editingExistingTemplate = 'indexInTemplates' in newTemplate

    const backToMainPage = () => {
        if (!(editingExistingTemplate)) {
            dispatch(moveToMainPage())
        } else {
            cancelEditTemplateAndMoveToMainPage(dispatch)
        }
    }

    const toggleEditTitle = () => {
        setUiState({...uiState, editingTitle: !uiState.editingTitle})
    }

    const updateTitle = (event) => {
        dispatch(editTemplateName({name: event.target.value}))
    }

    const addNewWork = () => {
        dispatch(moveToPickExerciseForTemplateWorkout())
    }

    const removeWorkByIndex = index => () => {
        dispatch(removeWork({index: index}))
    }

    const moveWorkDownByIndex = index => () => {
        dispatch(moveWorkDown({index: index}))
    }

    const moveWorkUpByIndex = index => () => {
        dispatch(moveWorkUp({index: index}))
    }

    const saveTemplate = () => {
        saveTemplateAndMoveToMainPage(dispatch)
    }

    const workComponents = newTemplate.work.map((work, i) => {

        return (
            <div key={i}>
                <TemplateWork
                    {...work} />
                <button onClick={removeWorkByIndex(i)}> Remove work {i}</button>
                <button data-testid={"moveWork" + i + "UpBtn"} onClick={moveWorkUpByIndex(i)}>Up</button>
                <button data-testid={"moveWork" + i + "DownBtn"} onClick={moveWorkDownByIndex(i)}>Down</button>
            </div>
        )
    })

    const templateTitle = () => {
        if (uiState.editingTitle) {
            return <>
                <input value={newTemplate.name} onChange={updateTitle} />
                <button onClick={toggleEditTitle}>save</button>
            </>
        } else {
            return <p id='template-title'>{newTemplate.name}
                <button onClick={toggleEditTitle}>edit</button>
            </p>
        }
    }


    return (
        <div>
            <button onClick={backToMainPage}>back</button>
            {editingExistingTemplate && (
                <label htmlFor='template-title'>Editing</label>
            )}
            {uiState.editingTitle && (
                <>
                    <input value={newTemplate.name} onChange={updateTitle} />
                    <button onClick={toggleEditTitle}>save</button>
                </>
            ) || (
                <p id='template-title'>{newTemplate.name}
                    <button onClick={toggleEditTitle}>edit</button>
                </p>
            )}
            <div>
                {workComponents}
            </div>
            <button onClick={addNewWork}>Add work</button>

            <button onClick={saveTemplate}>Save</button>
        </div>
    )
}

export default CreateTemplateWorkout
