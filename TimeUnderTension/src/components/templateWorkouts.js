import React from 'react'
import {useDispatch, useSelector} from "react-redux";

import {moveToCreateTemplate} from "../reducers/uiStateReducer";
import {selectTemplateWorkout} from "../reducers/templateWorkoutReducer";
import TemplateWorkoutTile from "./TemplateWorkoutTile";
import {StyleSheet, View} from "react-native";
import {TextH1} from "./styled/text";
import {Button} from "./styled/button";

const styles = StyleSheet.create({
    wrapper: {

    },

    header: {

    },

    templateTile: {

    },

    createButton: {
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 20,
        marginRight: 20,
    }
})

const TemplateWorkouts = () => {
    const dispatch = useDispatch()
    const templateWorkouts = useSelector(selectTemplateWorkout)

    const createTemplate = () => {
        dispatch(moveToCreateTemplate())
    }

    return (
        <View style={styles.wrapper}>
            <View style={styles.header}>
                <TextH1>Template workouts</TextH1>
            </View>

            <View style={styles.templateTile}>
                {templateWorkouts.templates.map((template, index) => {
                    return <TemplateWorkoutTile key={index} template={template} />
                })}
            </View>

            <View style={styles.createButton}>
                <Button style={{}} onPress={createTemplate} title="Create new template" />
            </View>
        </View>
    )
}

export default TemplateWorkouts
