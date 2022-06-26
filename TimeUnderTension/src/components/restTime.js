import React from "react";
import {FlexRowView} from "./styled/view";
import {TextNormal} from "./styled/text";

const RestTime = props => {
    return <FlexRowView>
        <TextNormal testId={`restTime_${props.workId}`}>Rest time for {props.value} seconds</TextNormal>
    </FlexRowView>
}

export default RestTime