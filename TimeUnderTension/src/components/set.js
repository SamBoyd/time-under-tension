import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {changeSetReps, changeSetWeight} from "../reducers/setReducer";
import {Dimensions, Pressable, StyleSheet, View} from "react-native";
import {TextNormal} from "./styled/text";
import {FlexRowView} from "./styled/view";
import {Icon} from "react-native-elements";
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'

import theme from '../theme'

import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import EditSetOverlay from "./editSetOverlay";

const _ = require('lodash');

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Set = props => {
    const [showEditSet, setShowEditSet] = useState(false)
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

    const toggleShowEditSet = () => {
        setShowEditSet(!showEditSet)
    }

    let allStyles = {
        container: {
            marginTop: hp(1),
            alignItems: 'baseline',
            // paddingHorizontal: wp(1),
            // width: wp(90)
        },

        leftComponent: {
            flex: 1,
            alignItems: 'flex-start',
        },
        previousSet: {
            flex: 3,
            alignItems: 'center',
        },

        repsAndWeight: {
            flex: 3,
            alignItems: 'center',
        },
        rightComponent: {
            flex: 1,
            alignItems: 'flex-end',
        },

        finishedCheckbox: {
            // height: hp(2),
            // width: hp(2),
            container: {
                width: wp(3),
            },
            size: 12,
            uncheckedIcon: {
                color: theme.colors.white,
            },
            checkedIcon: {
                color: theme.colors.white,
            }
        },
        removeIcon: {
            size: 15,
        },
        dragIcon: {
            size: 15
        },
        text: {
            color: theme.colors.white
        },
    }

    const activeStyles = {
        container: {
            borderTopWidth: 1,
            borderBottomWidth: 1,
            // borderRadius: theme.borderRadius,
            borderColor: theme.colors.primary,
            paddingVertical: hp(0.5),
        },
    }

    const unfinishedStyles = {
        text: {
            color: theme.colors.grey0
        }
    }

    let styles
    if (props.active) {
        styles = StyleSheet.create(_.merge(allStyles, activeStyles))
    } else if (props.finished) {
        styles = StyleSheet.create(allStyles)
    } else {
        styles = StyleSheet.create(_.merge(allStyles, unfinishedStyles))
    }

    let leftmostComponent
    if (props.finished) {
        leftmostComponent = <Icon
            name="check-circle"
            type="feather"
            color={styles.text.color}
            size={styles.finishedCheckbox.size}
        />
    } else if (props.active) {
        leftmostComponent = <Icon
            name="arrow-right"
            type="feather"
            color={styles.text.color}
            size={styles.finishedCheckbox.size}
        />
    } else {
        leftmostComponent = <TextNormal style={styles.setIndex}>#{props.index}</TextNormal>
    }

    let currentSetText = `${props.numberReps} / ${props.weight} / `
    if (props.finished) {
        currentSetText += `${props.workTime}`
    } else {
        currentSetText += `${props.workTimeStart}-${props.workTimeEnd}`
    }

    const prevSet = props.previousSet

    return (
        <>
            <Pressable onPress={toggleShowEditSet}>
                <FlexRowView viewStyle={styles.container}>
                    <View style={styles.leftComponent}>
                        {leftmostComponent}
                    </View>

                    <View style={styles.previousSet}>
                        {prevSet && (
                            <TextNormal style={styles.text}>{prevSet.numberReps} / {prevSet.weight} / {prevSet.workTime}</TextNormal>
                        ) || (
                            <TextNormal style={styles.text}>- / - / -</TextNormal>
                        )}
                    </View>

                    <View style={styles.repsAndWeight}>
                        <TextNormal style={styles.text}>{currentSetText}</TextNormal>
                    </View>


                    <View style={styles.rightComponent}>
                        <MaterialCommunityIcon
                            name="drag-vertical"
                            size={styles.dragIcon.size}
                            color={styles.text.color}
                        />
                    </View>
                </FlexRowView>
            </Pressable>
            <EditSetOverlay
                toggleShowEditSet={toggleShowEditSet}
                id={props.id}
                numberReps={props.numberReps}
                weight={props.weight}
                restTime={props.restTime}
                workTimeStart={props.workTimeStart}
                workTimeEnd={props.workTimeEnd}
                workName={props.workName}
                setIndex={props.index}
                visible={showEditSet}
                fireRemoveSet={props.fireRemoveSet}
                cb={false}
            />
        </>
    )
}

export default Set
