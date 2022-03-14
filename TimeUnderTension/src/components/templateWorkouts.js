import React from 'react'
import {useDispatch, useSelector} from "react-redux";

import {moveToCreateTemplate} from "../reducers/uiStateReducer";
import {selectTemplateWorkout} from "../reducers/templateWorkoutReducer";
import TemplateWorkoutTile from "./TemplateWorkoutTile";
import {View} from "react-native";
import {TextH1} from "./styled/text";
import {Button} from "./styled/button";

const TemplateWorkouts = () => {
    const dispatch = useDispatch()
    const templateWorkouts = useSelector(selectTemplateWorkout)

    const createTemplate = () => {
        dispatch(moveToCreateTemplate())
    }

    return (
        <View>
            <TextH1>Template workouts</TextH1>
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
