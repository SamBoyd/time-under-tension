import React, {useState} from 'react'
import {useDispatch, useSelector} from "react-redux";

import {PAGE} from '../constants'
import {addSetAction} from "../reducers/actions"
import {selectExercises} from "../reducers/exercisesReducer";
import {Dimensions, Pressable, StyleSheet, View} from "react-native";
import {TextNormal} from "../components/styled/text";
import {Button} from "../components/styled/button";
import {Divider, ListItem} from "react-native-elements";
import theme, {standardHorizontalPadding, standardVerticalPadding} from "../theme";
import {capitalizeFirstLetter} from "../utils/textUtils";
import BasePage from "../components/basePage";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {addWork, newWorkForExercise} from "../reducers/workReducer";
import {addWork as addWorkToWorkout} from "../reducers/workoutReducer";
import {addWork as addWorkToTemplate} from "../reducers/newTemplateWorkoutReducer";
import {setActiveWorkIfUndefined} from "../reducers/timerReducer";
import {FlexColumnView, FlexRowView} from "../components/styled/view";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const SAVE_WORK_TO = {
    workout: 'wokout',
    template: 'template'
}

const PickExercise = ({route, navigation}) => {
    const exercises = useSelector(selectExercises)
    const dispatch = useDispatch()

    const [expandedSection, setExpandedSection] = useState('')
    const [exercisesToSave, setExercisesToSave] = useState([])

    const {saveWorkTo} = route.params

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

    const sortedExercises = []
    exercises.categories.forEach(cat => {
        sortedExercises.push({'title': cat, 'data': exercises.exercises.filter(e => e.category === cat)})
    })

    const toggleExpandSection = section => () => {
        if (expandedSection === section) {
            setExpandedSection('')
        } else {
            setExpandedSection(section)
        }
    }


    const styles = StyleSheet.create({

        actionWrapper: {
            paddingVertical: hp(1),
            justifyContent: 'space-between',
            paddingBottom: standardVerticalPadding,

        },

        saveWrapper: {
            width: wp(30),
            justifyContent: 'space-between',
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

        selected: {
            container: {
                rowGap: hp(1),
                marginTop: hp(3),
                paddingBottom: standardVerticalPadding,
            },

            row: {
                marginLeft: wp(5),
                // verticalAlign: 'center',
            },

            removeIcon: {
                ...theme.Icon
            },

            iconWrapper: {
                // marginHorizontal: wp(1),
                justifyContent: 'center',
            },

            nameWrapper: {
                paddingHorizontal: wp(3),
                justifyContent: 'center',
            },

            name: {}
        }
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

            {exercisesToSave.length > 0 && (
                <>
                    <FlexColumnView viewStyle={styles.selected.container} rowGap={styles.selected.container.rowGap}>
                        {exercisesToSave.map((ex, i) =>
                            <FlexRowView key={i} viewStyle={styles.selected.row}>
                                <Pressable onPress={deselectExercise(ex)}>
                                    <View style={styles.selected.iconWrapper}>
                                        <MaterialIcons name="highlight-remove" {...styles.selected.removeIcon}/>
                                    </View>
                                </Pressable>
                                <View style={styles.selected.nameWrapper}>
                                    < TextNormal style={styles.selected.name}>{ex.name}</TextNormal>
                                </View>
                            </FlexRowView>
                        )}
                    </FlexColumnView>

                    <Divider/>
                </>
            )}


            {sortedExercises.map((category, ii) => {
                return <ListItem.Accordion
                    key={ii}
                    noRotation
                    content={
                        <ListItem.Content>
                            <ListItem.Title
                                style={styles.listHeader.text}>{capitalizeFirstLetter(category.title)}</ListItem.Title>
                        </ListItem.Content>
                    }
                    isExpanded={expandedSection === category.title}
                    onPress={toggleExpandSection(category.title)}
                    containerStyle={styles.listHeader}
                >
                    {category.data.map((item, i) => {
                        return <ListItem
                            key={i}
                            onPress={selectExercise(item)}
                            bottomDivider
                            containerStyle={styles.listItem}
                        >
                            <ListItem.Content>
                                <ListItem.Title style={styles.listItem.text}>{item.name}</ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                    })}
                </ListItem.Accordion>
            })}
        </BasePage>
    )
}

export default PickExercise