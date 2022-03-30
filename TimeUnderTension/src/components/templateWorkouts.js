import React from 'react'
import {useDispatch, useSelector} from "react-redux";

import {moveToCreateTemplate} from "../reducers/uiStateReducer";
import {selectNewTemplateWorkout} from "../reducers/newTemplateWorkoutReducer";
import TemplateWorkoutTile from "./TemplateWorkoutTile";
import {StyleSheet, View} from "react-native";
import {TextH1, TextNormal} from "./styled/text";
import {Button} from "./styled/button";
import {standardHorizontalPadding, standardVerticalPadding} from "../theme";
import {selectTemplates} from "../reducers/workoutTemplatesReducer";

const styles = StyleSheet.create({
    wrapper: {},

    header: {},

    templateTile: {
        rowGap: standardVerticalPadding,
    },

    noTemplates: {
        paddingTop: standardVerticalPadding,
    },

    createButton: {
        marginVertical: standardVerticalPadding,
        marginHorizontal: standardHorizontalPadding,
    }
})

const NoTemplateWorkouts = <View style={styles.noTemplates}><TextNormal>There are no templates</TextNormal></View>
const TemplateWorkouts = () => {
    const dispatch = useDispatch()
    const templateWorkouts = useSelector(selectTemplates)

    const createTemplate = () => {
        dispatch(moveToCreateTemplate())
    }

    return (
        <View style={styles.wrapper}>
            <View style={styles.header}>
                <TextH1>Template workouts</TextH1>
            </View>

            <View style={styles.templateTile}>
                {templateWorkouts.length > 0 && (
                    templateWorkouts.map((template, index) => {
                        return <TemplateWorkoutTile key={index} template={template}/>
                    })
                ) || (
                    NoTemplateWorkouts
                )}
            </View>

            <View style={styles.createButton}>
                <Button style={{}} onPress={createTemplate} title="Create new template"/>
            </View>
        </View>
    )
}

export default TemplateWorkouts
