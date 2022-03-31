import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import {createWorkoutFromTemplateAndMoveToWorkout, moveToEditTemplate} from "../reducers/actions";
import {StyleSheet, FlatList, View} from "react-native";
import {TextLighter, TextNormal} from "./styled/text";
import {EditButton} from "./styled/button";
import {standardHorizontalPadding, standardVerticalPadding} from "../theme";
import {selectWork} from "../reducers/workReducer";
import {loadWorkByIds} from "../utils/stateUtils";


const styles = StyleSheet.create({
    wrapper: {
    },

    row: {
        flexDirection: "row",
        // flexWrap: "wrap",
    },

});

const TemplateWorkoutTile = props => {
    const workState = useSelector(selectWork)
    const dispatch = useDispatch()

    const work = loadWorkByIds(props.template.work, workState)

    const editTemplate = () => {
        moveToEditTemplate(dispatch, props.template)
    }

    const startWorkoutFromTemplate = () => {
        createWorkoutFromTemplateAndMoveToWorkout(dispatch, props.template)
    }

    const Work = ({exercise, sets}) => {
        return <TextLighter>{exercise.name} - {sets.length} sets</TextLighter>
    }

    return (
        <View style={styles.wrapper}>
            <View style={styles.row} >
                <TextNormal onPress={startWorkoutFromTemplate}>{props.template.name}</TextNormal>
                <EditButton onPress={editTemplate}/>
            </View>
            <FlatList
                data={work}
                renderItem={({item}) => <Work exercise={item.exercise} sets={item.sets} />}
                keyExtractor={work => work.id}
            />
        </View>
    )
}

export default TemplateWorkoutTile