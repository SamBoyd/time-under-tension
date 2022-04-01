import {FlexRowView} from "./styled/view";
import theme from "../theme";
import {OverlaySlider} from "./styled/input";
import {TextNormal} from "./styled/text";
import React from "react";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {useDispatch} from "react-redux";
import {Shadow} from "./styled/shadow";


const u = wp(1)

const WorkTime = props => {
    const dispatch = useDispatch()

    if (props.workTimeStart >= props.workTimeEnd) {
        props.fireChangeWorkTimeEnd(props.workTimeStart + 1)
    }

    return <Shadow>
        <FlexRowView
            viewStyle={{
                paddingVertical: wp(1),
                paddingHorizontal: wp(2),

                textAlign: 'center',
                textAlignVertical: 'center',
                ...props.styles,
            }}
        >
            <OverlaySlider
                overlayTitle="Work start time"
                onChangeText={props.fireChangeWorkTimeStart}
                value={props.workTimeStart}
                minimumValue={0}
                maximumValue={90}
            />
            <TextNormal> : </TextNormal>
            <OverlaySlider
                overlayTitle="Work end time"
                onChangeText={props.fireChangeWorkTimeEnd}
                value={props.workTimeEnd > props.workTimeStart ? props.workTimeEnd : props.workTimeStart + 10}
                minimumValue={props.workTimeStart}
                maximumValue={props.workTimeStart + 90}
            />
        </FlexRowView>
    </Shadow>
}

export default WorkTime
