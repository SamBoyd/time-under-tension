import {Button, Input, Overlay, Text} from "react-native-elements";
import {View, StyleSheet, Dimensions} from "react-native";

import React, {useState} from "react";
import {FlexRowView} from "./view";

import {Slider} from '@miblanchard/react-native-slider';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';


export const OverlaySlider = props => {
    const [state, setState] = useState({editing: false})
    const [sliderValue, setSliderValue] = useState(props.value)
    const styles = StyleSheet.create({
        overlay: {
            width: wp(85),
            height: hp(10),
            justifyContent: "center",
        }
    })

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
            <Overlay overlayStyle={styles.overlay} isVisible={state.editing} onBackdropPress={saveEdit}>
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