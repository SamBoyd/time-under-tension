import React from "react";
import {useDispatch} from "react-redux";
import {changeSetReps, changeSetWeight, finishSet, removeSet} from "../reducers/workoutReducer";
import {Text, View, StyleSheet, Dimensions} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import InputSpinner from "react-native-input-spinner";
import {TextNormal} from "./styled/text";
import {FlexRowView} from "./styled/view";
import {Button} from "./styled/button";
import {Icon} from "react-native-elements";
import {OverlaySlider} from "./styled/input";


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
        dispatch(finishSet({
            setId: props.id
        }))
    }

    const fireRemoveSetById = setId => () => {
        dispatch(removeSet({setId: props.id, workId: props.workId}))
    }

    const styles = StyleSheet.create({
        container: {
            marginTop: 5,
            justifyContent: "space-evenly",
            alignItems: 'center',
            width: windowWidth * 0.8,
        },
        repsAndWeight: {
            width: 50,
            justifyContent: "space-between",
        },
        checkbox: {
            height: 15,
            width: 15,
        },
        removeIcon: {
            size: 15,
        }
    })

    return (
        <FlexRowView viewStyle={styles.container}>
            <TextNormal>{props.index}</TextNormal>
            <FlexRowView viewStyle={styles.repsAndWeight}>
                <OverlaySlider
                    overlayTitle="Number of reps"
                    onChangeText={updateReps}
                    value={props.numberReps}
                    minimumValue={0}
                    maximumValue={20}
                />
                <TextNormal>x</TextNormal>
                <OverlaySlider
                    overlayTitle="Weight"
                    onChangeText={updateWeight}
                    value={props.weight}
                    minimumValue={0}
                    maximumValue={100}
                />
            </FlexRowView>
            <BouncyCheckbox
                onPress={finish}
                isChecked={props.finished}
                iconStyle={styles.checkbox}
            />
            <Icon
                name='delete'
                onPress={fireRemoveSetById(props.id)}
                size={styles.removeIcon.size}
                style={styles.removeIcon}
            />
        </FlexRowView>
    )
}

export default Set
