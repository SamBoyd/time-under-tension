import React from "react";
import { useDispatch } from "react-redux";
import {changeSetReps, changeSetWeight, finishSet, removeSet} from "../reducers/workoutReducer";
import {Text, View} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import InputSpinner from "react-native-input-spinner";
import {TextNormal} from "./styled/text";
import {FlexRowView} from "./styled/view";
import {Button} from "./styled/button";
import {Icon} from "react-native-elements";

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

    return (
        <View>
            <TextNormal>Set #{props.index}</TextNormal>

            <FlexRowView>
                <InputSpinner onChange={updateReps} value={props.numberReps} />
                <TextNormal>x</TextNormal>
                <InputSpinner onChange={updateWeight} value={props.weight} />
                <BouncyCheckbox
                    onPress={finish}
                    isChecked={props.finished}
                />
                <Icon
                    name='delete'
                    onPress={fireRemoveSetById(props.id)}
                />
            </FlexRowView>


        </View>
    )
}

export default Set
