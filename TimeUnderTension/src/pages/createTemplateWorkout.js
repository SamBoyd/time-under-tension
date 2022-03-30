import React, {useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {Dimensions, StyleSheet, View} from "react-native";

import {editTemplateName, selectNewTemplateWorkout} from "../reducers/newTemplateWorkoutReducer";
import {moveToMainPage, moveToPickExerciseForTemplateWorkout} from "../reducers/uiStateReducer";
import TemplateWork from "../components/templateWork";
import {
    cancelEditTemplate,
    cancelEditTemplateAndMoveToMainPage,
    saveTemplateAndMoveToMainPage
} from "../reducers/actions";
import {TextH1, TextNormal} from "../components/styled/text";
import {Button} from "../components/styled/button";
import {FlexRowView} from "../components/styled/view";
import {Icon, Input} from "react-native-elements";
import theme, {standardHorizontalPadding, standardVerticalPadding} from "../theme"
import BasePage from "../components/basePage";

import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {loadWorkByIds} from "../utils/stateUtils";
import {selectWork} from "../reducers/workReducer";


const CreateTemplateWorkout = () => {
    const dispatch = useDispatch()
    const newTemplate = useSelector(selectNewTemplateWorkout)
    const workState = useSelector(selectWork)
    const [uiState, setUiState] = useState({
        editingTitle: false
    })
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

    const saveTemplate = () => {
        saveTemplateAndMoveToMainPage(dispatch, newTemplate)
    }

    const styles = StyleSheet.create({
        editTitleWrapper: {
            alignItems: "center"
        },

        editTitleContainer: {
            maxWidth: wp(75)

        },
        saveTitleContainer: {

        },

        titleWrapper: {
            marginTop: standardVerticalPadding,
            alignItems: "center",

            editIcon: {
                size: 15,
                marginLeft: wp(1),
            }
        },

        workWrapper: {
            marginTop: 0,
            marginBottom: standardVerticalPadding,
        },

        saveButton: {

        }
    })

    const work = loadWorkByIds(newTemplate.work, workState)
    const workComponents = work.map((work, i) => <TemplateWork work={work} workIndex={i}/>)

    const templateTitle = <>
        {editingExistingTemplate && (
            <TextNormal htmlFor='template-title'>Editing</TextNormal>
        )}
        {uiState.editingTitle && (
            <FlexRowView viewStyle={styles.editTitleWrapper}>
                <Input
                    value={newTemplate.name}
                    onChangeText={updateTitle}
                    containerStyle={styles.editTitleContainer}
                    rightIcon={<Icon
                        name={"save"}
                        onPress={toggleEditTitle}
                        containerStyle={styles.saveTitleContainer}
                        size={styles.titleWrapper.editIcon.size}
                    />}
                />

            </FlexRowView>
        ) || (
            <FlexRowView>
                <TextH1 id='template-title'>
                    {newTemplate.name}
                </TextH1>
                <Icon name='edit'
                      onPress={toggleEditTitle}
                      size={styles.titleWrapper.editIcon.size}
                      style={styles.titleWrapper.editIcon}
                      containerStyle={styles.titleWrapper.editIcon}
                />
            </FlexRowView>
        )}
    </>

    return (
        <BasePage
            leftHeaderComponent={<Button onPress={backToMainPage} title="back" />}
            headerTitle="Create template workout"
        >
            <View style={styles.titleWrapper}>
                {templateTitle}
            </View>

            <View style={styles.workWrapper}>
                {workComponents}
            </View>

            <Button
                onPress={addNewWork}
                title="Add work"
            />

            <Button
                onPress={saveTemplate}
                title="Save"
            />
        </BasePage>
    )
}

export default CreateTemplateWorkout
