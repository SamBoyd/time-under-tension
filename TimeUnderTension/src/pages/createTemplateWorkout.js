import React, {useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {Pressable, StyleSheet, View} from "react-native";

import {editTemplateName, resetTemplate, selectNewTemplateWorkout} from "../reducers/newTemplateWorkoutReducer";
import TemplateWork from "../components/templateWork";
import {TextH1} from "../components/styled/text";
import {Button} from "../components/styled/button";
import {FlexRowView} from "../components/styled/view";
import {Icon, Input, ThemeProvider} from "react-native-elements";
import theme, {standardVerticalPadding} from "../theme"
import BasePage from "../components/basePage";

import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {loadWorkByIds} from "../utils/stateUtils";
import {selectWork} from "../reducers/workReducer";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import PickExercise, {SAVE_WORK_TO} from "./pickExercise";
import {addToTemplates} from "../reducers/workoutTemplatesReducer";
import {PAGE} from "../constants";


const CreateTemplateWorkout = ({navigation}) => {
    const dispatch = useDispatch()
    const newTemplate = useSelector(selectNewTemplateWorkout)
    const workState = useSelector(selectWork)
    const [uiState, setUiState] = useState({
        editingTitle: false
    })
    const editingExistingTemplate = 'existingTemplate' in newTemplate

    const toggleEditTitle = () => {
        setUiState({...uiState, editingTitle: !uiState.editingTitle})
    }

    const updateTitle = value => {
        dispatch(editTemplateName({name: value}))
    }

    const addNewWork = () => {
        navigation.push(
            PAGE.pickExercise,
            {saveWorkTo: SAVE_WORK_TO.template}
        )
    }

    const goBack = () => {
        dispatch(resetTemplate())
        navigation.goBack()
    }
    const saveTemplate = () => {
        dispatch(addToTemplates(newTemplate))
        dispatch(resetTemplate())
        navigation.goBack()
    }

    const styles = StyleSheet.create({
        topButtonContainer: {
            justifyContent: 'space-between',
        },

        saveButton: {
            marginVertical: hp(1),
            width: wp(20),
        },

        editTitleWrapper: {
            alignItems: "center"
        },

        editTitleContainer: {
            maxWidth: wp(75)

        },
        editTitleText: {
            color: theme.colors.white
        },
        saveTitleContainer: {
            width: wp(10)
        },

        titleWrapper: {
            marginTop: standardVerticalPadding,
            alignItems: "center",

            height: hp(10),
            editIcon: {
                size: 15,
                marginLeft: wp(2),
            }
        },

        workWrapper: {
            marginTop: 0,
            marginBottom: standardVerticalPadding,
        },
    })

    const work = loadWorkByIds(newTemplate.work, workState)
    const workComponents = work.map((work, i) => <TemplateWork work={work} workIndex={i}/>)

    const templateTitle = <>
        {uiState.editingTitle && (
            <FlexRowView viewStyle={styles.editTitleWrapper}>
                <Input
                    autoFocus
                    value={newTemplate.name}
                    onChangeText={updateTitle}
                    containerStyle={styles.editTitleContainer}
                    inputStyle={styles.editTitleText}
                    rightIcon={<Icon
                        name={"save"}
                        onPress={toggleEditTitle}
                        containerStyle={styles.saveTitleContainer}
                        size={styles.titleWrapper.editIcon.size}
                    />}
                />

            </FlexRowView>
        ) || (
            <Pressable onPress={toggleEditTitle}>
                <FlexRowView>
                    <TextH1 id='template-title'>
                        {newTemplate.name}
                    </TextH1>
                    <Icon name='edit'
                          size={styles.titleWrapper.editIcon.size}
                          style={styles.titleWrapper.editIcon}
                          containerStyle={styles.titleWrapper.editIcon}
                    />
                </FlexRowView>
            </Pressable>
        )}
    </>

    return (
        <ThemeProvider theme={theme}>
            <BasePage>
                <FlexRowView viewStyle={styles.topButtonContainer}>
                    <Button onPress={goBack} title="Cancel" containerStyle={styles.saveButton}/>
                    <Button onPress={saveTemplate} title="Save" containerStyle={styles.saveButton}/>
                </FlexRowView>
                <View style={styles.titleWrapper}>
                    {templateTitle}
                </View>

                <View style={styles.workWrapper}>
                    {workComponents}
                </View>

                <Button
                    onPress={addNewWork}
                    title="Add"
                />
            </BasePage>
        </ThemeProvider>
    )
}

const TemplateNav = ({navigation}) => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                animation: "slide_from_bottom",
            }}
        >
            <Stack.Screen name={PAGE.createTemplateWorkout} component={CreateTemplateWorkout}/>
            <Stack.Screen name={PAGE.pickExercise} component={PickExercise}/>
        </Stack.Navigator>
    )
}

export default TemplateNav
