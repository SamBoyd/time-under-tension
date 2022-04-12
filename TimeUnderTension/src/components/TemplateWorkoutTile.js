import React, {useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {StyleSheet, FlatList, View, Pressable} from "react-native";
import {TextH1, TextLighter, TextNormal} from "./styled/text";
import {Button} from "./styled/button";
import {standardHorizontalPadding, standardVerticalPadding} from "../theme";
import {selectWork} from "../reducers/workReducer";
import {loadWorkByIds} from "../utils/stateUtils";
import {Icon, Overlay, ThemeProvider} from "react-native-elements";
import {FlexColumnView} from "./styled/view";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import {deleteTemplate as deleteTemplateAction} from "../reducers/workoutTemplatesReducer";
import theme from '../theme'
import {editTemplate as editTemplateAction} from "../reducers/newTemplateWorkoutReducer";
import {createWorkoutFromTemplate} from "../reducers/workoutReducer";
import {PAGE} from "../constants";

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

    overlayButton: {
      width: wp(10),
        height: hp(2.5)
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
        setDisplayActionsOverlay(false)
        dispatch(editTemplateAction(props.template))
        props.moveToCreateTemplate()
    }

    const deleteTemplate = () => {
        setDisplayActionsOverlay(false)
        dispatch(deleteTemplateAction(props.template.id))
    }

    const toggleOverlay = () => {
        setDisplayActionsOverlay(!displayActionsOverlay)
    }

    const startWorkoutFromTemplate = () => {
        dispatch(createWorkoutFromTemplate(props.template))
        props.moveToWorkout()
    }

    const Work = ({exercise, sets}) => {
        return <TextLighter>{exercise.name} - {sets.length} sets</TextLighter>
    }

    return (
        <ThemeProvider theme={theme}>
            <View style={styles.wrapper}>
                <View style={styles.row}>
                    <TextNormal onPress={startWorkoutFromTemplate}>{props.template.name}</TextNormal>
                    <Pressable style={styles.overlayButton} onPress={toggleOverlay}>
                        <Icon name='edit'
                              size={styles.toggleOverlay.size}
                              style={styles.toggleOverlay.icon}
                              containerStyle={styles.toggleOverlay.container}
                        />
                    </Pressable>
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