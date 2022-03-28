import theme from "../theme";
import {OverlaySlider} from "./styled/input";
import React from "react";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';


const RestTime = props => {
    return <OverlaySlider
        overlayTitle="Rest time"
        onChangeText={props.onChangeText}
        value={props.value}
        minimumValue={0}
        maximumValue={90}
        textStyle={{
            borderWidth: 1,
            borderColor: theme.colors.secondary,
            borderRadius: wp(2),
            paddingVertical: wp(1),
            paddingHorizontal: wp(2),
            textAlign: 'center',
            textAlignVertical: 'center',
            ...props.styles,
        }}
    />
}

export default RestTime