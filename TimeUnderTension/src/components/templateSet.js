import React from "react";
import { useDispatch } from "react-redux";
import {changeSetReps, changeSetWeight, removeSet} from "../reducers/templateWorkoutReducer";
import {View} from "react-native";
import InputSpinner from "react-native-input-spinner";
import {TextNormal} from "./styled/text";
import {FlexRowView} from "./styled/view";
import {Icon} from "react-native-elements";

const TemplateSet = props => {

    const dispatch = useDispatch()

    const fireRemoveSetById = setId => () => {
        dispatch(removeSet({setId: setId, workId: props.workId}))
    }

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
            <TextNormal>Set #{props.index}</TextNormal>
            <FlexRowView>
                <InputSpinner onChange={updateReps} value={props.numberReps} />
                <TextNormal>x</TextNormal>
                <InputSpinner onChange={updateWeight} value={props.weight} />
                <Icon
                    name='delete'
                    onPress={fireRemoveSetById(props.id)}
                />
            </FlexRowView>
        </View>
    )
}

export default TemplateSet
