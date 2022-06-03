import React, {useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {Pressable, StyleSheet, View} from "react-native";
import {TextH1, TextLighter, TextNormal} from "./styled/text";
import {Button} from "./styled/button";
import theme, {standardVerticalPadding} from "../theme";
import {selectWork} from "../reducers/workReducer";
import {loadWorkByIds} from "../utils/stateUtils";
import {Icon, Overlay, ThemeProvider} from "react-native-elements";
import {FlexColumnView, FlexRowView} from "./styled/view";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import {deleteTemplate as deleteTemplateAction} from "../reducers/workoutTemplatesReducer";
import {editTemplate as editTemplateAction} from "../reducers/newTemplateWorkoutReducer";
import {createWorkoutFromTemplateAction, finishWorkoutAndCreateHistoryAction} from "../reducers/actions";
import {selectSet} from "../reducers/setReducer";
import {selectWorkout, startWorkoutIfNotStarted} from "../reducers/workoutReducer";

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

    actionsOverlay: {
        rowGap: standardVerticalPadding,
        container: {
            width: wp(75),
            backgroundColor: theme.colors.tertiary,
        },
        wrapper: {},
        backdropStyle: {
            backgroundColor: 'rgba(20, 14, 8, 0.8)',
        },
    },

    confirmOverlay: {
        container: {
            width: wp(75),
            backgroundColor: theme.colors.tertiary,
            alignItems: 'center',
            paddingVertical: standardVerticalPadding,
        },
        rowGap: standardVerticalPadding,

        actionsContainer: {
            justifyContent: 'space-around',
        },

        actionButtonPrimary: {
            container: {
                width: wp(20),
            },

            button: {
                backgroundColor: theme.colors.grey1,
            }
        },

        actionButtonSecondary: {
            container: {
                width: wp(20),
            },

            button: {
                backgroundColor: theme.colors.grey0,
            }
        }
    }
});

const TemplateWorkoutTile = props => {
    const workoutState = useSelector(selectWorkout)
    const workState = useSelector(selectWork)
    const setState = useSelector(selectSet)
    const dispatch = useDispatch()

    const [displayActionsOverlay, setDisplayActionsOverlay] = useState(false)
    const [displayExistingWorkoutOverlay, setDisplayExistingWorkoutOverlay] = useState(false)

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
        if (workoutState.started_at !== null) {
            setDisplayExistingWorkoutOverlay(true)
        } else {
            createWorkoutFromTemplateAction(props.template, workState, setState, dispatch)
            dispatch(startWorkoutIfNotStarted())
            props.moveToWorkout()
        }
    }

    const finishWorkoutAndCreateNewFromTemplate = () => {
        finishWorkoutAndCreateHistoryAction(dispatch, workoutState)
        createWorkoutFromTemplateAction(props.template, workState, setState, dispatch)
        dispatch(startWorkoutIfNotStarted())
        setDisplayExistingWorkoutOverlay(false)
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

                {work.map((work, i) => {
                    return <Work key={i} exercise={work.exercise} sets={work.sets}/>
                })}
            </View>
            <Overlay isVisible={displayActionsOverlay}
                     overlayStyle={styles.actionsOverlay.container}
                     backdropStyle={styles.actionsOverlay.backdropStyle}
                     onBackdropPress={toggleOverlay}
            >
                <FlexColumnView viewStyles={styles.actionsOverlay.wrapper} rowGap={styles.actionsOverlay.rowGap}>
                    <TextH1>{props.template.name}</TextH1>
                    <Button onPress={editTemplate} title="Edit"/>
                    <Button onPress={deleteTemplate} title="Delete"/>
                </FlexColumnView>
            </Overlay>
            <Overlay isVisible={displayExistingWorkoutOverlay}
                     overlayStyle={styles.confirmOverlay.container}
                     backdropStyle={styles.confirmOverlay.backdropStyle}
                     onBackdropPress={() => {
                     }}
            >
                <FlexColumnView viewStyles={styles.confirmOverlay.wrapper} rowGap={styles.confirmOverlay.rowGap}>
                    <TextNormal>There is already an active workout. </TextNormal>
                    <TextNormal>Finish this workout and create a new workout from this template?</TextNormal>
                    <FlexRowView viewStyle={styles.confirmOverlay.actionsContainer}>
                        <Button title='Cancel'
                                onPress={() => setDisplayExistingWorkoutOverlay(false)}
                                containerStyle={styles.confirmOverlay.actionButtonSecondary.container}
                                buttonStyle={styles.confirmOverlay.actionButtonSecondary.button}
                        />
                        <Button title='Yes'
                                onPress={finishWorkoutAndCreateNewFromTemplate}
                                containerStyle={styles.confirmOverlay.actionButtonPrimary.container}
                                buttonStyle={styles.confirmOverlay.actionButtonPrimary.button}
                        />
                    </FlexRowView>
                </FlexColumnView>
            </Overlay>

        </ThemeProvider>
    )
}

export default TemplateWorkoutTile