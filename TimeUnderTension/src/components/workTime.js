import {FlexRowView} from "./styled/view";
import theme from "../theme";
import {OverlaySlider} from "./styled/input";
import {TextNormal} from "./styled/text";
import React from "react";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';


const u = wp(1)

const WorkTime = props => {
    return <FlexRowView
        viewStyle={{
            borderWidth: 1,
            borderColor: theme.colors.secondary,
            borderRadius: wp(2),
            padding: wp(1),

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
            value={props.workTimeEnd}
            minimumValue={props.workTimeStart}
            maximumValue={90}
        />
    </FlexRowView>
}

export default WorkTime
