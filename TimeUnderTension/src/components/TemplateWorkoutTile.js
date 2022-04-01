import React, {useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {createWorkoutFromTemplateAndMoveToWorkout, moveToEditTemplate} from "../reducers/actions";
import {StyleSheet, FlatList, View} from "react-native";
import {TextH1, TextLighter, TextNormal} from "./styled/text";
import {Button, EditButton} from "./styled/button";
import {standardHorizontalPadding, standardVerticalPadding} from "../theme";
import {selectWork} from "../reducers/workReducer";
import {loadWorkByIds} from "../utils/stateUtils";
import {Icon, Overlay, ThemeProvider} from "react-native-elements";
import {FlexColumnView} from "./styled/view";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import {deleteTemplate as deleteTemplateAction} from "../reducers/workoutTemplatesReducer";
import theme from '../theme'

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: theme.colors.grey0,
        borderRadius: theme.borderRadius,
        padding: theme.internalPadding,
    },

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
            backgroundColor: theme.colors.tertiary,
        },
        wrapper: {},
        backdropStyle: {
            backgroundColor: 'rgba(20, 14, 8, 0.8)',
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
        <ThemeProvider theme={theme}>
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
            <Overlay isVisible={displayActionsOverlay}
                     overlayStyle={styles.overlay.container}
                     backdropStyle={styles.overlay.backdropStyle}
                     onBackdropPress={toggleOverlay}
            >
                <FlexColumnView viewStyles={styles.overlay.wrapper} rowGap={styles.overlay.rowGap}>
                    <TextH1>{props.template.name}</TextH1>
                    <Button onPress={editTemplate} title="Edit"/>
                    <Button onPress={deleteTemplate} title="Delete"/>
                </FlexColumnView>
            </Overlay>
        </ThemeProvider>
    )
}

export default TemplateWorkoutTile