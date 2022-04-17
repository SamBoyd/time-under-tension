import React, {useState} from 'react'
import {StyleSheet, View} from "react-native";
import {FlexRowView} from "./styled/view";
import {TextBold, TextNormal} from "./styled/text";
import {Button} from "./styled/button";
import theme, {standardHorizontalPadding} from "../theme";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";

import {Overlay} from "react-native-elements";
import {Picker} from "@react-native-picker/picker";
import _ from "lodash";
import {useDispatch, useSelector} from "react-redux";
import {updateRestOnWork, updateWorkTimeOnWork} from "../reducers/workReducer";
import {selectWorkout} from "../reducers/workoutReducer";
import {changeActiveWork, NO_ACTIVE_WORK, selectTimer} from "../reducers/timerReducer";


const EditWorkOverlay = props => {
    const workoutState = useSelector(selectWorkout)
    const timerState = useSelector(selectTimer)

    const [restTime, setRestTime] = useState(props.restTime)
    const [workTimeStart, setWorkTimeStart] = useState(props.workTimeStart)
    const [workTimeEnd, setWorkTimeEnd] = useState(props.workTimeEnd)

    const dispatch = useDispatch()

    const backdropPress = () => {
        dispatch(
            updateWorkTimeOnWork({
                workId: props.workId,
                workTimeStart: workTimeStart,
                workTimeEnd: workTimeEnd,
            })
        )

        dispatch(
            updateRestOnWork({
                workId: props.workId,
                restTime: restTime
            })
        )
        props.toggleOverlay()
    }

    const removeWork = () => {
        const currentActiveWorkIndex = workoutState.work.indexOf(timerState.activeWorkId)
        const nextActiveWorkId = currentActiveWorkIndex + 1 < workoutState.work.length
            ? workoutState.work[currentActiveWorkIndex + 1]
            : NO_ACTIVE_WORK
        dispatch(changeActiveWork(nextActiveWorkId))

        props.removeWork()
        props.toggleOverlay()
    }

    const styles = StyleSheet.create({
        container: {
            // width: wp(80)
            backgroundColor: theme.colors.tertiary,
            paddingHorizontal: standardHorizontalPadding,
            borderWidth: 1,
            borderColor: theme.colors.grey1,
            borderRadius: theme.borderRadius,
        },

        title: {
            container: {
                height: hp(10),
                justifyContent: 'center',
                borderBottomWidth: 1,
                borderBottomColor: theme.colors.grey1,
            },

            wrapper: {
                justifyContent: 'space-between',
                alignItems: 'center',
            }
        },

        rest: {
            container: {
                alignItems: 'center',
                width: wp(70),
                justifyContent: 'space-around'
            },

            pickerWrapper: {
                position: 'relative',
                flex: 1,
                // backgroundColor: theme.colors.grey1,
                // height: hp(30),
                width: wp(30)
            }
        },

        picker: {
            item: {
                color: theme.colors.white,
                height: hp(20),
                fontSize: 14,
            },
        },
    })

    return (
        <Overlay
            overlayStyle={styles.container}
            isVisible={props.visible}
            onBackdropPress={backdropPress}
        >
            <View style={styles.title.container}>
                <FlexRowView viewStyle={styles.title.wrapper}>
                    <TextBold>{props.workName}</TextBold>
                    <Button
                        onPress={backdropPress}
                        title="Save"
                        containerStyle={styles.saveButton}
                        testId='saveEditWork'
                    />
                </FlexRowView>
            </View>

            <FlexRowView viewStyle={styles.rest.container}>
                <TextNormal>Rest time</TextNormal>
                <View style={styles.rest.pickerWrapper}>
                    <Picker
                        selectedValue={restTime}
                        onValueChange={(itemValue, itemIndex) =>
                            setRestTime(itemValue)
                        }
                        itemStyle={styles.picker.item}

                    >
                        {_.range(0, 100, 1).map(i => <Picker.Item testId={`optionRestTime_${i}`} key={i} label={`${i}`} value={i}/>)}
                    </Picker>
                </View>
                <TextNormal>sec</TextNormal>
            </FlexRowView>

            <FlexRowView viewStyle={styles.rest.container}>
                <TextNormal>Tension time</TextNormal>
                <View style={styles.rest.pickerWrapper}>
                    <Picker
                        selectedValue={workTimeStart}
                        onValueChange={(itemValue, itemIndex) => {
                            setWorkTimeStart(itemValue)
                            if (itemValue > workTimeEnd) {
                                setWorkTimeEnd(itemValue + 10)
                            }
                        }}
                        itemStyle={styles.picker.item}

                    >
                        {_.range(0, 100, 1).map(i => <Picker.Item key={i} label={`${i}`} value={i}/>)}
                    </Picker>
                </View>
                <TextNormal>to</TextNormal>
                <View style={styles.rest.pickerWrapper}>
                    <Picker
                        selectedValue={workTimeEnd}
                        onValueChange={(itemValue, itemIndex) => {
                            setWorkTimeEnd(itemValue)
                            if (itemValue < workTimeStart) {
                                setWorkTimeStart(itemValue - 10)
                            }
                        }}
                        itemStyle={styles.picker.item}

                    >
                        {_.range(0, 100, 1).map(i => <Picker.Item key={i} label={`${i}`} value={i}/>)}
                    </Picker>
                </View>
                <TextNormal>sec</TextNormal>
            </FlexRowView>

            <Button
                onPress={removeWork}
                title={`Remove`}
            />
            <Button
                onPress={() => {
                    props.moveWorkUp()
                    props.toggleOverlay()
                }}
                title={`Move up`}
            />
            <Button
                onPress={() => {
                    props.moveWorkDown()
                    props.toggleOverlay()
                }}
                title={`Move down`}
            />
        </Overlay>
    )
}

export default EditWorkOverlay