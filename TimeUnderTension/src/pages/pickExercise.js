import React, {useState} from 'react'
import {useDispatch, useSelector} from "react-redux";

import {PAGE} from '../constants'
import {addSetAction} from "../reducers/actions"
import {selectExercises} from "../reducers/exercisesReducer";
import {Dimensions, StyleSheet} from "react-native";
import {TextNormal} from "../components/styled/text";
import {Button} from "../components/styled/button";
import {ListItem} from "react-native-elements";
import theme, {standardHorizontalPadding, standardVerticalPadding} from "../theme";
import {capitalizeFirstLetter} from "../utils/textUtils";
import BasePage from "../components/basePage";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {addWork, newWorkForExercise} from "../reducers/workReducer";
import {addWork as addWorkToWorkout} from "../reducers/workoutReducer";
import {addWork as addWorkToTemplate} from "../reducers/newTemplateWorkoutReducer";


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

    const {saveWorkTo} = route.params

    const saveToTemplate = exercise => {
        const newWork = newWorkForExercise(exercise)
        dispatch(addWorkToTemplate(newWork.id))
        dispatch(addWork(newWork))
        addSetAction(dispatch, newWork.id)
        addSetAction(dispatch, newWork.id)
        addSetAction(dispatch, newWork.id)
        navigation.goBack()
    }

    const saveToWorkout = exercise => {
        const newWork = newWorkForExercise(exercise)
        dispatch(addWorkToWorkout(newWork.id))
        dispatch(addWork(newWork))
        addSetAction(dispatch, newWork.id)
        addSetAction(dispatch, newWork.id)
        addSetAction(dispatch, newWork.id)
        navigation.goBack()
    }

    const selectExercise = exercise => () => {
        if (saveWorkTo === SAVE_WORK_TO.template) {
            saveToTemplate(exercise)
        } else {
            saveToWorkout(exercise)
        }
    }

    const goBack = () => {
        navigation.goBack()
    }

    const sortedExercises = []
    exercises.categories.forEach(cat => {
        sortedExercises.push({'title': cat, 'data': exercises.exercises.filter(e => e.category === cat)})
    })

    const Item = ({exercise}) => (
        <ListItem>
            <ListItem.Content>
                <TextNormal onPress={selectExercise(exercise)}>{exercise.name}</TextNormal>
            </ListItem.Content>
        </ListItem>
    );

    const toggleExpandSection = section => () => {
        if (expandedSection === section) {
            setExpandedSection('')
        } else {
            setExpandedSection(section)
        }
    }


    const styles = StyleSheet.create({

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
            <Button onPress={goBack} title="back" containerStyle={styles.backButton}/>

            {sortedExercises.map(category => {
                return <ListItem.Accordion
                    noRotation
                    content={
                        <ListItem.Content>
                            <ListItem.Title style={styles.listHeader.text}>{capitalizeFirstLetter(category.title)}</ListItem.Title>
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