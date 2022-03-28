import {FlexRowView} from "./styled/view";
import theme from "../theme";
import {OverlaySlider} from "./styled/input";
import {TextNormal} from "./styled/text";
import React from "react";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {changeWorkTime} from "../reducers/workoutReducer";
import {useDispatch} from "react-redux";


const u = wp(1)

const WorkTime = props => {
    const dispatch = useDispatch()

    const fireChangeWorkTimeStart = value => {
        dispatch(changeWorkTime({
            workId: props.workId,
            workTime: {
                start: value,
                end: props.workTimeEnd
            }
        }))
    }

    const fireChangeWorkTimeEnd = value => {
        dispatch(changeWorkTime({
            workId: props.workId,
            workTime: {
                start: props.workTimeStart,
                end: value
            }
        }))
    }

    if (props.workTimeStart > props.workTimeEnd) {
        fireChangeWorkTimeEnd(props.workTimeStart+1)
    }

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
            onChangeText={fireChangeWorkTimeStart}
            value={props.workTimeStart}
            minimumValue={0}
            maximumValue={90}
        />
        <TextNormal> : </TextNormal>
        <OverlaySlider
            overlayTitle="Work end time"
            onChangeText={fireChangeWorkTimeEnd}
            value={props.workTimeEnd > props.workTimeStart ? props.workTimeEnd: props.workTimeStart + 10}
            minimumValue={props.workTimeStart}
            maximumValue={props.workTimeStart + 90}
        />
    </FlexRowView>
}

export default WorkTime
