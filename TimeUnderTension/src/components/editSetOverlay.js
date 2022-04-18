import React, {useState} from 'react'
import {StyleSheet, View} from "react-native"
import {Overlay} from "@rneui/base";
import {TextBold, TextNormal} from "./styled/text";
import {Picker} from "@react-native-picker/picker";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';

import theme, {standardHorizontalPadding, standardVerticalPadding} from '../theme';
import {FlexRowView} from "./styled/view";
import {useDispatch} from "react-redux";
import {changeSetReps, changeSetWeight} from "../reducers/setReducer";
import {Button} from "./styled/button";


const _ = require('lodash')


const EditSetOverlay = props => {
    const [updateReps, setUpdateReps] = useState(false)
    const [updateWeight, setUpdateWeight] = useState(false)

    const [numReps, setNumReps] = useState(props.numberReps)
    const [weight, setWeight] = useState(Math.floor(props.weight))
    const [weightDecimal, setWeightDecimal] = useState(props.weight - Math.floor(props.weight))

    const dispatch = useDispatch()

    const styles = StyleSheet.create({
        container: {
            // width: wp(80)
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

        picker: {

            item: {
                color: theme.colors.white,
                height: hp(20),
                fontSize: 14,
            },
        },

        reps: {
            container: {
                // backgroundColor:theme.colors.grey0,
                // height: hp(30),
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
            },


        },

        bottomButton: {
            marginVertical: standardVerticalPadding,
        }
    })

    const backdropPress = () => {
        if (updateReps) {
            dispatch(changeSetReps({setId: props.id, reps: numReps}))
        }
        if (updateWeight) {
            dispatch(changeSetWeight({setId: props.id, weight: weight + weightDecimal}))
        }

        setUpdateReps(false)
        setUpdateWeight(false)
        props.toggleShowEditSet()
    }

    const removeSetPress = () => {
        props.fireRemoveSet(props.id)
        props.toggleShowEditSet()
    }

    return <Overlay
        overlayStyle={styles.container}
        isVisible={props.visible}
        onBackdropPress={backdropPress}
    >
        <View style={styles.title.container}>
            <FlexRowView viewStyle={styles.title.wrapper}>
                <FlexRowView>
                    <TextBold>{props.workName}</TextBold>
                    <TextNormal> - set #{props.setIndex}</TextNormal>
                </FlexRowView>
                <Button
                    onPress={backdropPress}
                    title="Save"
                    containerStyle={styles.saveButton}
                />
            </FlexRowView>
        </View>

        <FlexRowView viewStyle={styles.reps.container}>
            <TextNormal>Reps</TextNormal>
            <View style={styles.reps.pickerWrapper}>
                <Picker
                    selectedValue={numReps}
                    onValueChange={(itemValue, itemIndex) => {
                        setUpdateReps(true)
                        setNumReps(itemValue)
                    }}
                    itemStyle={styles.picker.item}
                >
                    {_.range(0, 100, 1).map(i => <Picker.Item key={i} label={`${i}`} value={i}
                                                              testId={`optionNumReps_${i}`}/>)}
                </Picker>
            </View>
        </FlexRowView>

        <FlexRowView viewStyle={styles.reps.container}>
            <TextNormal>Weight</TextNormal>
            <View style={styles.reps.pickerWrapper}>

                <Picker
                    selectedValue={weight}
                    onValueChange={(itemValue, itemIndex) => {
                        setUpdateWeight(true)
                        setWeight(itemValue)
                    }}
                    itemStyle={styles.picker.item}
                >
                    {_.range(0, 100, 1).map(i => <Picker.Item key={i} label={`${i}`} value={i}/>)}
                </Picker>
            </View>
            <TextBold>.</TextBold>
            <View style={styles.reps.pickerWrapper}>
                <Picker
                    selectedValue={weightDecimal}
                    onValueChange={(itemValue, itemIndex) => {
                        setUpdateWeight(true)
                        setWeightDecimal(itemValue)
                    }}
                    // style={styles.picker.weightDecimal}
                    itemStyle={styles.picker.item}
                >
                    {_.range(0, 1, 0.125).map(i => <Picker.Item key={i} label={i.toString().slice(2) || '0'} value={i}/>)}
                </Picker>
            </View>
            <TextNormal>kg</TextNormal>
        </FlexRowView>

        <Button
            title="Remove set"
            containerStyle={styles.bottomButton}
            onPress={removeSetPress}
        />

        <Button
            onPress={backdropPress}
            title="Save"
            containerStyle={styles.bottomButton}
        />
    </Overlay>
}

export default EditSetOverlay
