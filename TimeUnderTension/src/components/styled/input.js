import {Button, Input, Overlay, Text} from "react-native-elements";
import {View, StyleSheet, Dimensions} from "react-native";

import React, {useState} from "react";
import {FlexRowView} from "./view";

import {Slider} from '@miblanchard/react-native-slider';


export const OverlaySlider = props => {
    const [state, setState] = useState({editing: false})
    const [sliderValue, setSliderValue] = useState(props.value)
    const style = StyleSheet.create({
        width: 100,
        height: 40,
        overlay: {
            width: '75%',
            height: 70,
        }
    })

    var {width, height} = Dimensions.get('window');

    const setSliderRounded = value => {
        setSliderValue(Math.round(value))
    }

    const toggleEdit = (props) => {
        setState({editing: !state.editing})
    }

    const saveEdit = () => {
        setState({editing: !state.editing})
        props.onChangeText(sliderValue)
    }

    return (
        <>
            <Overlay overlayStyle={style.overlay} isVisible={state.editing} onBackdropPress={saveEdit}>
                <FlexRowView>
                    <Text>{props.overlayTitle}</Text>
                    <Text>: {sliderValue}</Text>
                </FlexRowView>
                    <Slider
                        minimumValue={props.minimumValue}
                        value={sliderValue}
                        maximumValue={props.maximumValue}
                        onValueChange={setSliderRounded}
                    />
            </Overlay>
            <Text
                style={props.textStyle}
                onPress={toggleEdit}
            >
                {props.value}
            </Text>
        </>
    )
}