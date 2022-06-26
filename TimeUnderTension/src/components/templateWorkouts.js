import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import TemplateWorkoutTile from "./TemplateWorkoutTile";
import {StyleSheet, View} from "react-native";
import {TextH1, TextNormal} from "./styled/text";
import {Button} from "./styled/button";
import {standardHorizontalPadding, standardVerticalPadding} from "../theme";
import {selectTemplates} from "../reducers/workoutTemplatesReducer";
import {FlexColumnView} from "./styled/view";
import {PAGE} from "../constants";

const styles = StyleSheet.create({
    wrapper: {},

    header: {},

    templateTile: {
        marginTop: standardVerticalPadding,
        rowGap: standardVerticalPadding
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

const TemplateWorkouts = ({navigation}) => {
    const dispatch = useDispatch()
    const templateWorkouts = useSelector(selectTemplates)

    const moveToCreateTemplate = () => {
        navigation.navigate(PAGE.createTemplateWorkout)
    }

    const moveToWorkout = () => {
        navigation.navigate(PAGE.workout)
    }

    const sortedTemplates = [...templateWorkouts].sort((a, b) => new Date(a.created_at) > new Date(b.created_at))

    return (
        <View style={styles.wrapper}>
            <View style={styles.header}>
                <TextH1>Workout templates</TextH1>
            </View>

            <FlexColumnView viewStyle={styles.templateTile} rowGap={styles.templateTile.rowGap}>
                {templateWorkouts.length > 0 && (
                    sortedTemplates.map((template, index) => {
                        return <TemplateWorkoutTile key={index}
                                                    template={template}
                                                    moveToCreateTemplate={moveToCreateTemplate}
                                                    moveToWorkout={moveToWorkout}
                        />
                    })
                ) || (
                    NoTemplateWorkouts
                )}
            </FlexColumnView>

            <View style={styles.createButton}>
                <Button style={{}} onPress={moveToCreateTemplate} title="Create new template"/>
            </View>
        </View>
    )
}

export default TemplateWorkouts
