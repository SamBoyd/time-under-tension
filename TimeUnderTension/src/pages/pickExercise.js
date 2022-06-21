import React, {useState} from 'react'
import {useDispatch, useSelector} from "react-redux";

import {PAGE} from '../constants'
import {addSetAction} from "../reducers/actions"
import {selectExercises} from "../reducers/exercisesReducer";
import {Dimensions, Pressable, StyleSheet} from "react-native";
import {Button} from "../components/styled/button";
import {ButtonGroup, Divider, ListItem} from "react-native-elements";
import theme, {standardHorizontalPadding, standardVerticalPadding} from "../theme";
import BasePage from "../components/basePage";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {addWork, newWorkForExercise} from "../reducers/workReducer";
import {addWork as addWorkToWorkout} from "../reducers/workoutReducer";
import {addWork as addWorkToTemplate} from "../reducers/newTemplateWorkoutReducer";
import {setActiveWorkIfUndefined} from "../reducers/timerReducer";
import {FlexRowView} from "../components/styled/view";
import SelectedExercises from "../components/SelectedExercises";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const SAVE_WORK_TO = {
    workout: 'wokout',
    template: 'template'
}

const PickExercise = ({route, navigation}) => {
    const exercises = useSelector(selectExercises)
    const [selectedIndexGroup1, setSelectedIndexGroup1] = useState(null)
    const [selectedIndexGroup2, setSelectedIndexGroup2] = useState(null)
    const [selectedCategoryName, setSelectedCategoryName] = useState(null)
    const dispatch = useDispatch()

    const [expandedSection, setExpandedSection] = useState('')
    const [exercisesToSave, setExercisesToSave] = useState([])

    const {saveWorkTo} = route.params


    const setSelectedCategory = groupIndex => buttonIndex => {
        if (groupIndex === 1) {
            setSelectedIndexGroup1(buttonIndex)
            setSelectedIndexGroup2(null)
            setSelectedCategoryName(exercises.categories[buttonIndex])
        } else {
            setSelectedIndexGroup1(null)
            setSelectedIndexGroup2(buttonIndex)
            setSelectedCategoryName(exercises.categories[3 + buttonIndex])
        }
    }

    const saveToTemplate = exercise => {
        const newWork = newWorkForExercise(exercise)
        dispatch(addWorkToTemplate(newWork.id))
        dispatch(addWork(newWork))
        addSetAction(dispatch, newWork.id)
        addSetAction(dispatch, newWork.id)
        addSetAction(dispatch, newWork.id)
    }

    const saveToWorkout = exercise => {
        const newWork = newWorkForExercise(exercise)
        dispatch(addWorkToWorkout(newWork.id))
        dispatch(addWork(newWork))
        addSetAction(dispatch, newWork.id)
        addSetAction(dispatch, newWork.id)
        addSetAction(dispatch, newWork.id)
        dispatch(setActiveWorkIfUndefined(newWork.id))
    }

    const saveExercisesToTemplate = () => {
        exercisesToSave.forEach(ex => {
            saveToTemplate(ex)
        })
        navigation.goBack()
    }

    const saveExercisesToWorkout = () => {
        exercisesToSave.forEach(ex => {
            console.log(`Save exercise: ${JSON.stringify(ex)}`)
            saveToWorkout(ex)
        })
        navigation.goBack()
    }

    const selectExercise = exercise => () => {
        const newExerciseList = [...exercisesToSave, exercise]
        setExercisesToSave(newExerciseList)
    }

    const deselectExercise = exercise => () => {
        let newExerciseList = [...exercisesToSave, exercise]
        newExerciseList = newExerciseList.filter(ex => ex.id !== exercise.id)
        setExercisesToSave(newExerciseList)
    }

    const submit = () => {
        if (saveWorkTo === SAVE_WORK_TO.template) {
            saveExercisesToTemplate()
        } else {
            saveExercisesToWorkout()
        }
    }

    const goBack = () => {
        navigation.goBack()
    }

    const goNewExercise = () => {
        navigation.navigate(PAGE.addExercise)
    }

    const sortedExercises = {}
    exercises.categories.forEach(cat => {
        let ex = [...exercises.exercises.filter(e => e.category === cat)]
        ex.sort(function (a, b) {
            return ('' + a.name).localeCompare(b.name);
        })
        sortedExercises[cat] = ex
    })

    const toggleExpandSection = section => () => {
        if (expandedSection === section) {
            setExpandedSection('')
        } else {
            setExpandedSection(section)
        }
    }


    const styles = StyleSheet.create({
        backButton: {},

        actionWrapper: {
            paddingVertical: hp(1),
            justifyContent: 'space-between',
            paddingBottom: standardVerticalPadding,

        },

        saveWrapper: {
            width: wp(30),
            justifyContent: 'space-between',
        },

        categoryButtonStyle: {
            color: theme.colors.white,
            backgroundColor: theme.colors.tertiary,
        },

        categoryButtonStyleSelected: {
            color: theme.colors.grey0,
            backgroundColor: theme.colors.tertiary,
        },

        listWrapper: {
            backgroundColor: theme.colors.tertiary,
        },

        listHeader: {
            backgroundColor: theme.colors.tertiary,
            paddingLeft: standardHorizontalPadding,
            paddingTop: standardVerticalPadding,
            text: {
                color: theme.colors.white,
            }
        },
        listItem: {
            backgroundColor: theme.colors.tertiary,
            paddingLeft: standardHorizontalPadding,
            paddingTop: hp(1),
            paddingBottom: hp(1),
            text: {
                fontSize: 12,
                color: theme.colors.white,
            },
        },
    })


    return (
        <BasePage>
            <FlexRowView viewStyle={styles.actionWrapper}>
                <Button onPress={goBack} title="back" containerStyle={styles.backButton}/>
                <FlexRowView viewStyle={styles.saveWrapper}>
                    <Button onPress={goNewExercise} title="New" containerStyle={styles.backButton}
                            testId='newExerciseButton'/>
                    <Button onPress={submit} title="Save"/>
                </FlexRowView>
            </FlexRowView>

            <Divider/>

            <SelectedExercises
                exercises={exercisesToSave}
                deselectExercise={deselectExercise}
            />

            <Divider/>

            <ButtonGroup
                selectedIndex={selectedIndexGroup1}
                onPress={setSelectedCategory(1)}
                buttons={exercises.categories.slice(0, 3)}
                buttonStyle={styles.categoryButtonStyle}
                textStyle={styles.categoryButtonStyle}
                selectedButtonStyle={styles.categoryButtonStyleSelected}
            />

            <ButtonGroup
                selectedIndex={selectedIndexGroup2}
                onPress={setSelectedCategory(2)}
                buttons={exercises.categories.slice(3, 6)}
                buttonStyle={styles.categoryButtonStyle}
                textStyle={styles.categoryButtonStyle}
                selectedButtonStyle={styles.categoryButtonStyleSelected}
            />

            {selectedCategoryName && sortedExercises[selectedCategoryName].map((item, i) => {
                return <ListItem
                    key={i}
                    onPress={selectExercise(item)}
                    bottomDivider
                    containerStyle={styles.listItem}
                >
                    <Pressable onPress={selectExercise(item)}>
                        <ListItem.Content>
                            <ListItem.Title style={styles.listItem.text}>{item.name}</ListItem.Title>
                        </ListItem.Content>
                    </Pressable>
                </ListItem>
            })}

            <Divider/>

        </BasePage>
    )
}

export default PickExercise