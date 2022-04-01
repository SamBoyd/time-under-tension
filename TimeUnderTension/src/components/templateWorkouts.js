import React from 'react'
import {useDispatch, useSelector} from "react-redux";

import {moveToCreateTemplate} from "../reducers/uiStateReducer";
import {StyleSheet, View} from "react-native";
import {TextH1, TextNormal} from "./styled/text";
import {Button} from "./styled/button";
import {standardHorizontalPadding, standardVerticalPadding} from "../theme";
import {selectTemplates} from "../reducers/workoutTemplatesReducer";
import {FlexColumnView} from "./styled/view";

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
const TemplateWorkouts = () => {
    const dispatch = useDispatch()
    const templateWorkouts = useSelector(selectTemplates)

    const sortedTemplate = [...templateWorkouts].sort((a, b) => new Date(a.created_at) > new Date(b.created_at))
    const createTemplate = () => {
        dispatch(moveToCreateTemplate())
    }

    return (
        <View style={styles.wrapper}>
            <View style={styles.header}>
                <TextH1>Template workouts</TextH1>
            </View>

            {templateWorkouts.length > 0 && (
                <FlexColumnView viewStyle={styles.templateTile} rowGap={styles.templateTile.rowGap}>
                    {sortedTemplate.map((template, index) => {
                        return <TemplateWorkoutTile key={index} template={template}/>
                    })}
                </FlexColumnView>
            ) || (
                NoTemplateWorkouts
            )}

            <View style={styles.createButton}>
                <Button style={{}} onPress={createTemplate} title="Create new template"/>
            </View>
        </View>
    )
}

export default TemplateWorkouts
