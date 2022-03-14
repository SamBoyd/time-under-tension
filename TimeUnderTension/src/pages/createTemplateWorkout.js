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
import {ScrollView, Text, TextInput, View} from "react-native";
import SafeAreaView from "react-native/Libraries/Components/SafeAreaView/SafeAreaView";
import {TextNormal} from "../components/styled/text";
import {Button} from "../components/styled/button";
import {FlexRowView} from "../components/styled/view";
import {Icon} from "react-native-elements";

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
                <FlexRowView>
                    <Button data-testid={"moveWork" + i + "UpBtn"} onPress={moveWorkUpByIndex(i)} title="Up" />
                    <Button data-testid={"moveWork" + i + "DownBtn"} onPress={moveWorkDownByIndex(i)} title="Down" />
                </FlexRowView>
            </View>
        )
    })

    const templateTitle = () => {
        if (uiState.editingTitle) {
            return <>
                <input value={newTemplate.name} onChange={updateTitle} />
                <Button onClick={toggleEditTitle}>save</Button>
            </>
        } else {
            return <p id='template-title'>{newTemplate.name}
                <Button onClick={toggleEditTitle}>edit</Button>
            </p>
        }
    }


    return (
        <SafeAreaView>
            <ScrollView>
                <Button onPress={backToMainPage} title="back" />
                {editingExistingTemplate && (
                    <TextNormal htmlFor='template-title'>Editing</TextNormal>
                )}
                {uiState.editingTitle && (
                    <FlexRowView>
                        <TextInput value={newTemplate.name} onChangeText={updateTitle} />
                        <Button onPress={toggleEditTitle} title="save" />
                    </FlexRowView>
                ) || (
                    <FlexRowView>
                        <TextNormal id='template-title'>
                            {newTemplate.name}
                        </TextNormal>
                        <Icon name='edit' onPress={toggleEditTitle} />
                    </FlexRowView>
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
