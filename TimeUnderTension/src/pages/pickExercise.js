import React, {useState} from 'react'
import {useDispatch, useSelector} from "react-redux";

import {PAGE} from '../constants'
import {pickExerciseForTemplateWorkoutAction, pickExerciseForWorkoutAction} from "../reducers/actions"
import {followRedirect, selectUiState} from "../reducers/uiStateReducer";
import {selectExercises} from "../reducers/exercisesReducer";
import {Dimensions, StyleSheet} from "react-native";
import {TextNormal} from "../components/styled/text";
import {Button} from "../components/styled/button";
import {ListItem} from "react-native-elements";
import theme, {standardHorizontalPadding, standardVerticalPadding} from "../theme";
import {capitalizeFirstLetter} from "../utils/textUtils";
import BasePage from "../components/basePage";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const PickExercise = () => {
    const uiState = useSelector(selectUiState)
    const exercises = useSelector(selectExercises)
    const dispatch = useDispatch()

    const [expandedSection, setExpandedSection] = useState('')

    const selectExercise = exercise => () => {
        if (uiState.redirectTo === PAGE.workout) {
            pickExerciseForWorkoutAction(exercise)(dispatch)
        } else if (uiState.redirectTo === PAGE.createTemplateWorkout) {
            pickExerciseForTemplateWorkoutAction(exercise)(dispatch)
        }
    }

    const goBack = () => {
        dispatch(followRedirect())
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
        <BasePage
            leftHeaderComponent={<Button onPress={goBack} title="back" containerStyle={styles.backButton}/>}
            headerTitle="Pick an exercise"
        >
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