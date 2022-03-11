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
import {Button, ScrollView, Text, TextInput, View} from "react-native";
import SafeAreaView from "react-native/Libraries/Components/SafeAreaView/SafeAreaView";

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

    const updateTitle = value => {
        dispatch(editTemplateName({name: value}))
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
            <View key={i}>
                <TemplateWork {...work} />
                <Button onPress={removeWorkByIndex(i)} title={`Remove work ${i}`} />
                <Button data-testid={"moveWork" + i + "UpBtn"} onPress={moveWorkUpByIndex(i)} title="Up" />
                <Button data-testid={"moveWork" + i + "DownBtn"} onPress={moveWorkDownByIndex(i)} title="Down" />
            </View>
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
        <SafeAreaView>
            <ScrollView>
                <Button onClick={backToMainPage} title="back" />
                {editingExistingTemplate && (
                    <Text htmlFor='template-title'>Editing</Text>
                )}
                {uiState.editingTitle && (
                    <View>
                        <TextInput value={newTemplate.name} onChangeText={updateTitle} />
                        <Button onPress={toggleEditTitle} title="save" />
                    </View>
                ) || (
                    <View>
                        <Text id='template-title'>
                            {newTemplate.name}
                        </Text>
                        <Button onPress={toggleEditTitle} title="edit" />
                    </View>
                )}
                <View>
                    {workComponents}
                </View>
                <Button onPress={addNewWork} title="Add work" />

                <Button onPress={saveTemplate} title="Save" />
            </ScrollView>
        </SafeAreaView>
    )
}

export default CreateTemplateWorkout
