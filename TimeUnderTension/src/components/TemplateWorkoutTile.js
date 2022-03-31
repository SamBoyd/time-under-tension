import React, {useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {createWorkoutFromTemplateAndMoveToWorkout, moveToEditTemplate} from "../reducers/actions";
import {StyleSheet, FlatList, View} from "react-native";
import {TextLighter, TextNormal} from "./styled/text";
import {Button, EditButton} from "./styled/button";
import {standardHorizontalPadding, standardVerticalPadding} from "../theme";
import {selectWork} from "../reducers/workReducer";
import {loadWorkByIds} from "../utils/stateUtils";
import {Icon, Overlay} from "react-native-elements";
import {FlexColumnView} from "./styled/view";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import {deleteTemplate as deleteTemplateAction} from "../reducers/workoutTemplatesReducer";

const styles = StyleSheet.create({
    wrapper: {},

    row: {
        flexDirection: "row",
        // flexWrap: "wrap",
    },

    toggleOverlay: {
        size: 12,
        container: {
            marginLeft: wp(1),
        },
        icon: {}
    },

    overlay: {
        rowGap: standardVerticalPadding,
        container: {
            width: wp(75),
        },
        wrapper: {
        },
    }
});

const TemplateWorkoutTile = props => {
    const workState = useSelector(selectWork)
    const dispatch = useDispatch()
    const [displayActionsOverlay, setDisplayActionsOverlay] = useState(false)

    const work = loadWorkByIds(props.template.work, workState)

    const editTemplate = () => {
        moveToEditTemplate(dispatch, props.template)
    }

    const deleteTemplate = () => {
        setDisplayActionsOverlay(false)
        dispatch(deleteTemplateAction(props.template.id))
    }

    const toggleOverlay = () => {
        setDisplayActionsOverlay(!displayActionsOverlay)
    }

    const startWorkoutFromTemplate = () => {
        createWorkoutFromTemplateAndMoveToWorkout(dispatch, props.template)
    }

    const Work = ({exercise, sets}) => {
        return <TextLighter>{exercise.name} - {sets.length} sets</TextLighter>
    }

    return (
        <>
            <View style={styles.wrapper}>
                <View style={styles.row}>
                    <TextNormal onPress={startWorkoutFromTemplate}>{props.template.name}</TextNormal>
                    <Icon name='edit'
                          onPress={toggleOverlay}
                          size={styles.toggleOverlay.size}
                          style={styles.toggleOverlay.icon}
                          containerStyle={styles.toggleOverlay.container}
                    />
                </View>
                <FlatList
                    data={work}
                    renderItem={({item}) => <Work exercise={item.exercise} sets={item.sets}/>}
                    keyExtractor={work => work.id}
                />
            </View>
            <Overlay overlayStyle={styles.overlay.container} isVisible={displayActionsOverlay} onBackdropPress={toggleOverlay}>
                <FlexColumnView viewStyles={styles.overlay.wrapper} rowGap={styles.overlay.rowGap}>
                    <TextNormal>{props.template.name}</TextNormal>
                    <Button onPress={editTemplate} title="Edit" />
                    <Button onPress={deleteTemplate} title="Delete" />
                </FlexColumnView>
            </Overlay>
        </>
    )
}

export default TemplateWorkoutTile