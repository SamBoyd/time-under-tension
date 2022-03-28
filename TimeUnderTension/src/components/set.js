import React from "react";
import {useDispatch} from "react-redux";
import {changeSetReps, changeSetWeight, finishSet, removeSet} from "../reducers/workoutReducer";
import {Text, View, StyleSheet, Dimensions} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import InputSpinner from "react-native-input-spinner";
import {TextNormal} from "./styled/text";
import {FlexRowView} from "./styled/view";
import {Button} from "./styled/button";
import {CheckBox, Icon} from "react-native-elements";
import {OverlaySlider} from "./styled/input";

import theme from '../theme'

import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Set = props => {

    const dispatch = useDispatch()

    const updateReps = value => {
        dispatch(changeSetReps({
            setId: props.id,
            reps: value
        }))
    }

    const updateWeight = value => {
        dispatch(changeSetWeight({
            setId: props.id,
            weight: value
        }))
    }

    const finish = () => {
        // console.log(`${props.finished} -> ${!props.finished}`)
        // dispatch(finishSet({
        //     setId: props.id
        // }))
    }

    const fireRemoveSetById = setId => () => {
        dispatch(removeSet({setId: props.id, workId: props.workId}))
    }

    let styles

    if (props.active) {
        styles = StyleSheet.create({
            container: {
                marginTop: hp(1),
                justifyContent: "space-evenly",
                alignItems: 'center',
                backgroundColor: theme.colors.primary,
                color: theme.colors.white,
            },
            setIndex: {
                color: theme.colors.white,
            },
            repsAndWeight: {
                width: wp(10),
                justifyContent: "space-between",
                textStyle: {
                    color: theme.colors.white,
                }
            },
            checkbox: {
                height: hp(2),
                width: wp(2),
                uncheckedIcon: {
                    color: theme.colors.white,
                },
                checkedIcon: {
                    color: theme.colors.primary,
                }
            },
            removeIcon: {
                size: 15,
                color: theme.colors.white,
            }
        })
    } else {
        styles = StyleSheet.create({
            container: {
                marginTop: hp(1),
                justifyContent: "space-evenly",
                alignItems: 'center',
            },
            repsAndWeight: {
                width: wp(10),
                justifyContent: "space-between",
                textStyle: {}
            },
            checkbox: {
                height: hp(2),
                width: hp(2),
                uncheckedIcon: {
                    color: theme.colors.secondary,
                },
                checkedIcon: {
                    color: theme.colors.primary,
                }
            },
            removeIcon: {
                size: 15,
            }
        })
    }

    return (
        <FlexRowView viewStyle={styles.container}>
            <TextNormal style={styles.setIndex}>{props.index}</TextNormal>
            <FlexRowView viewStyle={styles.repsAndWeight}>
                <OverlaySlider
                    overlayTitle="Number of reps"
                    onChangeText={updateReps}
                    value={props.numberReps}
                    minimumValue={0}
                    maximumValue={20}
                    textStyle={styles.repsAndWeight.textStyle}
                />
                <TextNormal
                    style={styles.repsAndWeight.textStyle}
                >
                    x
                </TextNormal>
                <OverlaySlider
                    overlayTitle="Weight"
                    onChangeText={updateWeight}
                    value={props.weight}
                    minimumValue={0}
                    maximumValue={100}
                    textStyle={styles.repsAndWeight.textStyle}
                />
            </FlexRowView>
            <CheckBox
                center
                onPress={finish}
                checked={props.finished}
                iconProps={styles.checkbox.icon}
                checkedIcon={
                    <Icon
                        name="radio-button-checked"
                        type="material"
                        color={styles.checkbox.checkedIcon.color}
                    />
                }
                uncheckedIcon={
                    <Icon
                        name="radio-button-unchecked"
                        type="material"
                        color={styles.checkbox.uncheckedIcon.color}
                    />
                }
            />
            <Icon
                name='delete'
                onPress={fireRemoveSetById(props.id)}
                {...styles.removeIcon}
            />
        </FlexRowView>
    )
}

export default Set
