import {Overlay, Text} from "react-native-elements";
import {StyleSheet} from "react-native";

import React, {useState} from "react";
import {FlexRowView} from "./view";

import {Slider} from '@miblanchard/react-native-slider';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';


const AMOUNT_TO_ADD_TO_MAXIMUM_VALUE = 45

export const OverlaySlider = props => {
    const [state, setState] = useState({editing: false})
    const [tempSliderValue, setTempSliderValue] = useState(props.value)
    const [sliderValue, setSliderValue] = useState(props.value)
    const [maximumValue, setMaximumValue] = useState(props.maximumValue)

    const styles = StyleSheet.create({
        overlay: {
            width: wp(85),
            height: hp(10),
            justifyContent: "center",
        }
    })

    const setTempSliderRounded = value => {
        setTempSliderValue(Math.round(value))
    }

    const setSliderRounded = value => {
        const roundedValue = Math.round(value)
        if (roundedValue === maximumValue) {
            setSliderValue(roundedValue)
            setMaximumValue(maximumValue + AMOUNT_TO_ADD_TO_MAXIMUM_VALUE)
        } else {
            setSliderValue(roundedValue)
        }
    }

    const toggleEdit = (props) => {
        setState({editing: !state.editing})
    }

    const saveEdit = () => {
        toggleEdit()
        props.onChangeText(sliderValue)
    }

    return (
        <>
            <Overlay overlayStyle={styles.overlay} isVisible={state.editing} onBackdropPress={saveEdit}>
                <FlexRowView>
                    <Text>{props.overlayTitle}</Text>
                    <Text>: {tempSliderValue}</Text>
                </FlexRowView>
                <Slider
                    minimumValue={props.minimumValue}
                    value={tempSliderValue}
                    maximumValue={maximumValue}
                    onValueChange={setTempSliderRounded}
                    onSlidingComplete={setSliderRounded}
                />
            </Overlay>
            <Text
                style={props.textStyle}
                onPress={toggleEdit}
            >
                {sliderValue}
            </Text>
        </>
    )
}