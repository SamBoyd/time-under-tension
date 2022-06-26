import {FlexRowView} from "./styled/view";
import {TextNormal} from "./styled/text";
import React from "react";


const WorkTime = props => {

    return <FlexRowView
        viewStyle={{
            textAlign: 'center',
            textAlignVertical: 'center',
            ...props.styles,
        }}
    >
        <TextNormal testId={`workTime_${props.workId}`}>Target tension for {props.workTimeStart} to {props.workTimeEnd} seconds </TextNormal>
    </FlexRowView>
}

export default WorkTime
