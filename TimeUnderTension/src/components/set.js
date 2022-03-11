import React from "react";
import { useDispatch } from "react-redux";
import {changeSetReps, changeSetWeight, finishSet} from "../reducers/workoutReducer";
import {Text, View} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import InputSpinner from "react-native-input-spinner";

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

    return (
        <View>
            <Text>{props.index}</Text>
            <InputSpinner onChange={updateReps} value={props.numberReps} />

            <Text>x</Text>
            <InputSpinner onChange={updateWeight} value={props.weight} />


            <BouncyCheckbox
                onPress={finish}
                isChecked={props.finished}
            />
        </View>
    )
}

export default Set
