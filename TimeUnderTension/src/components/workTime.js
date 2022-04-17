import {FlexRowView} from "./styled/view";
import theme from "../theme";
import {OverlaySlider} from "./styled/input";
import {TextNormal} from "./styled/text";
import React from "react";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {useDispatch} from "react-redux";
import {Shadow} from "./styled/shadow";



const WorkTime = props => {

    return <FlexRowView
        viewStyle={{
            textAlign: 'center',
            textAlignVertical: 'center',
            ...props.styles,
        }}
    >
        <TextNormal testId={`workTime_${props.workId}`}>Target tension for {props.workTimeStart} to {props.workTimeEnd} sec </TextNormal>
    </FlexRowView>
}

export default WorkTime
