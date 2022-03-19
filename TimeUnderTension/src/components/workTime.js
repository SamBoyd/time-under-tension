import {FlexRowView} from "./styled/view";
import theme from "../theme";
import {OverlaySlider} from "./styled/input";
import {TextNormal} from "./styled/text";
import React from "react";

const WorkTime = props => {
    return <FlexRowView
        viewStyle={{
            borderWidth: 1,
            borderColor: theme.colors.primary,
            borderRadius: 10,
            paddingTop: 2,
            paddingBottom: 2,
            paddingLeft: 10,
            paddingRight: 10,

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
