import React from 'react'
import {useDispatch} from "react-redux";
import {createWorkoutFromTemplateAndMoveToWorkout, moveToEditTemplate} from "../reducers/actions";
import {FlatList, Text, View} from "react-native";

const TemplateWorkoutTile = props => {
    const dispatch = useDispatch()

    const editTemplate = () => {
        moveToEditTemplate(dispatch, props.template.id)
    }

    const startWorkoutFromTemplate = () => {
        createWorkoutFromTemplateAndMoveToWorkout(dispatch, props.template)
    }

    const Work = ({exercise, sets}) => {
        return <Text>{exercise.name} - {sets.length} sets</Text>
    }

    return (
        <View>
            <Text onPress={startWorkoutFromTemplate}>{props.template.name}</Text>
            <Text onPress={editTemplate}>edit</Text>
            <FlatList
                data={props.template.work}
                renderItem={({item}) => <Work exercise={item.exercise} sets={item.sets} />}
                keyExtractor={work => work.id}
            />
        </View>
    )
}

export default TemplateWorkoutTile