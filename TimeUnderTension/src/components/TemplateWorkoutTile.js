import React from 'react'
import {useDispatch} from "react-redux";
import {createWorkoutFromTemplateAndMoveToWorkout, moveToEditTemplate} from "../reducers/actions";
import {StyleSheet, FlatList, View} from "react-native";
import {TextLighter, TextNormal} from "./styled/text";
import {EditButton} from "./styled/button";


const styles = StyleSheet.create({

    row: {
        flexDirection: "row",
        // flexWrap: "wrap",
    },

});

const TemplateWorkoutTile = props => {
    const dispatch = useDispatch()

    const editTemplate = () => {
        moveToEditTemplate(dispatch, props.template.id)
    }

    const startWorkoutFromTemplate = () => {
        createWorkoutFromTemplateAndMoveToWorkout(dispatch, props.template)
    }

    const Work = ({exercise, sets}) => {
        return <TextLighter>{exercise.name} - {sets.length} sets</TextLighter>
    }

    return (
        <View style={{paddingTop: 5}}>
            <View style={styles.row} >
                <TextNormal onPress={startWorkoutFromTemplate}>{props.template.name}</TextNormal>
                <EditButton onPress={editTemplate}/>
            </View>
            <FlatList
                data={props.template.work}
                renderItem={({item}) => <Work exercise={item.exercise} sets={item.sets} />}
                keyExtractor={work => work.id}
            />
        </View>
    )
}

export default TemplateWorkoutTile