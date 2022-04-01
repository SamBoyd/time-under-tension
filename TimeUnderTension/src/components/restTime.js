import theme from "../theme";
import {OverlaySlider} from "./styled/input";
import React from "react";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Shadow} from "./styled/shadow";

const RestTime = props => {
    return <Shadow>
        <OverlaySlider
            overlayTitle="Rest time"
            onChangeText={props.onChangeText}
            value={props.value}
            minimumValue={0}
            maximumValue={90}
            textStyle={{
                borderRadius: wp(4),
                paddingVertical: wp(1),
                paddingHorizontal: wp(2),
                textAlign: 'center',
                textAlignVertical: 'center',
            }}
        />
    </Shadow>
}

export default RestTime