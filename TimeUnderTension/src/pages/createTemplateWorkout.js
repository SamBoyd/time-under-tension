import React, {useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {Dimensions, StyleSheet, View} from "react-native";

import {editTemplateName, resetTemplate, selectNewTemplateWorkout} from "../reducers/newTemplateWorkoutReducer";
import TemplateWork from "../components/templateWork";
import {TextH1, TextNormal} from "../components/styled/text";
import {Button} from "../components/styled/button";
import {FlexRowView} from "../components/styled/view";
import {Icon, Input} from "react-native-elements";
import theme, {standardHorizontalPadding, standardVerticalPadding} from "../theme"
import BasePage from "../components/basePage";

import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {loadWorkByIds} from "../utils/stateUtils";
import {selectWork} from "../reducers/workReducer";
import {ThemeProvider} from "react-native-elements";
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

    const saveTemplate = () => {
        dispatch(addToTemplates(newTemplate))
        dispatch(resetTemplate())
    }

    const styles = StyleSheet.create({
        editTitleWrapper: {
            alignItems: "center"
        },

        editTitleContainer: {
            maxWidth: wp(75)

        },
        editTitleText: {
            color: theme.colors.white
        },
        saveTitleContainer: {},

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

        saveButton: {}
    })

    const work = loadWorkByIds(newTemplate.work, workState)
    const workComponents = work.map((work, i) => <TemplateWork work={work} workIndex={i}/>)

    const templateTitle = <>
        {uiState.editingTitle && (
            <FlexRowView viewStyle={styles.editTitleWrapper}>
                <Input
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
        <ThemeProvider theme={theme}>
            <BasePage>
                <Button onPress={saveTemplate} title="Save"/>
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
