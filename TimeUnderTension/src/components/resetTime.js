import theme from "../theme";
import {OverlaySlider} from "./styled/input";
import React from "react";


const RestTime = props => {
    return <OverlaySlider
        overlayTitle="Rest time"
        onChangeText={props.onChangeText}
        value={props.value}
        minimumValue={0}
        maximumValue={90}
        someStyling={{
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
    />
}

export default RestTime