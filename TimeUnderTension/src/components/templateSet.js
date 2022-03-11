import React from "react";
import { useDispatch } from "react-redux";
import {changeSetReps, changeSetWeight} from "../reducers/templateWorkoutReducer";
import {Text, View} from "react-native";
import InputSpinner from "react-native-input-spinner";

const TemplateSet = props => {

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

    return (
        <View>
            <Text>{props.index}</Text>
            <InputSpinner onChange={updateReps} value={props.numberReps} />

            <Text>x</Text>
            <InputSpinner onChange={updateWeight} value={props.weight} />

        </View>
    )
}

export default TemplateSet
