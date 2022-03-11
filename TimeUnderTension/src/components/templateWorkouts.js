import React from 'react'
import {useDispatch, useSelector} from "react-redux";

import {moveToCreateTemplate} from "../reducers/uiStateReducer";
import {selectTemplateWorkout} from "../reducers/templateWorkoutReducer";
import TemplateWorkoutTile from "./TemplateWorkoutTile";
import styled from "styled-components";
import {Button, Text, View} from "react-native";

const TemplateWorkouts = () => {
    const dispatch = useDispatch()
    const templateWorkouts = useSelector(selectTemplateWorkout)

    const createTemplate = () => {
        dispatch(moveToCreateTemplate())
    }

    return (
        <View>
            <Text>Template workouts</Text>
            <View>
                {templateWorkouts.templates.map((template, index) => {
                    return <TemplateWorkoutTile key={index} template={template} />
                })}
            </View>
            <View>
                <Button onPress={createTemplate} title="Create new template" />
            </View>
        </View>
    )
}

export default TemplateWorkouts
