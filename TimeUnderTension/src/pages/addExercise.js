import React from 'react'
import {useDispatch, useSelector} from "react-redux";

import {changeNewExerciseField, selectExercises} from "../reducers/exercisesReducer";
import {resetNewExerciseAndMoveToManageExercises, saveNewExerciseAndMoveToManageExercises} from "../reducers/actions";
import {StyleSheet} from "react-native";
import {Dropdown} from 'react-native-element-dropdown';
import theme, {standardVerticalPadding} from "../theme";
import {Button} from "../components/styled/button";
import {Input, ThemeProvider} from "react-native-elements";
import BasePage from "../components/basePage";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';

const AddExercise = () => {
    const dispatch = useDispatch()
    const exercises = useSelector(selectExercises)

    const goBack = () => {
        resetNewExerciseAndMoveToManageExercises(dispatch)
    }

    const changeField = fieldName => value => {
        dispatch(changeNewExerciseField({fieldName: fieldName, fieldValue: value}))
    }

    const selectCategory = (item) => {
        dispatch(changeNewExerciseField({fieldName: 'category', fieldValue: item.value}))
    }

    const validate = () => {
        return ('name' in exercises.newExercise) &&
            ('category' in exercises.newExercise) &&
            exercises.newExercise.name !== '' &&
            exercises.newExercise.category !== ''
    }

    const saveExercise = () => {
        if (validate()) {
            saveNewExerciseAndMoveToManageExercises(dispatch)
        }
    }

    const exerciseCategories = exercises.categories.map(cat => {
        return {"label": cat, "value": cat}
    })

    const styles = StyleSheet.create({
        dropdown: {
            container: {
                marginTop: standardVerticalPadding,
                backgroundColor: theme.colors.grey0,
                borderRadius: theme.borderRadius,
                paddingLeft: theme.internalPadding,
                marginHorizontal: wp(2),
            },
            selectContainer: {
                backgroundColor: theme.colors.grey0,
                borderRadius: theme.borderRadius,
                borderWidth: 0,
                color: theme.colors.white,
            },
            placeholderStyle: {
                color: theme.colors.grey1,
            },

            selectedText: {
                color: theme.colors.grey1,
            },
        },

        input: {
            color: theme.colors.white,
            placeholderColor: theme.colors.grey1,
            container: {
                marginTop: standardVerticalPadding,
            },
            input: {
                paddingLeft: theme.internalPadding,
                backgroundColor: theme.colors.grey0,
                borderBottomWidth: 0,
                borderRadius: theme.borderRadius,
            },

        },

        button: {
          container: {
              marginHorizontal: wp(2),
          }
        },
    })
    return (
        <ThemeProvider theme={theme}>
            <BasePage
                leftHeaderComponent={<Button onPress={goBack} title="back"/>}
                headerTitle="Add exercise"
            >
                <Dropdown
                    data={exerciseCategories}
                    value={exercises.newExercise.category || ""}
                    onChange={selectCategory}
                    placeholder="Select category"
                    labelField="label"
                    valueField="value"
                    style={styles.dropdown.container}
                    containerStyle={styles.dropdown.selectContainer}
                    placeholderStyle={styles.dropdown.placeholderStyle}
                    selectedTextStyle={styles.dropdown.selectedText}
                />

                <Input
                    onChangeText={changeField('name')}
                    value={exercises.newExercise.name}
                    inputStyle={styles.input}
                    containerStyle={styles.input.container}
                    inputContainerStyle={styles.input.input}
                    placeholder={'Exercise name'}
                    placeholderTextColor={styles.input.placeholderColor}
                />

                {validate() && (
                    <Button
                        onPress={saveExercise}
                        title="Save"
                        containerStyle={styles.button.container}
                    />
                ) || (
                    <Button
                        onPress={saveExercise}
                        disabled
                        title="Save"
                        containerStyle={styles.button.container}
                    />
                )}
            </BasePage>
        </ThemeProvider>
    )
}

export default AddExercise