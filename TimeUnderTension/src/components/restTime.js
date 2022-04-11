import theme from "../theme";
import {OverlaySlider} from "./styled/input";
import React from "react";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Shadow} from "./styled/shadow";
import {FlexRowView} from "./styled/view";
import {TextNormal} from "./styled/text";

const RestTime = props => {
    return <FlexRowView>
        <TextNormal>Rest time for {props.value}</TextNormal>
    </FlexRowView>
}

export default RestTime