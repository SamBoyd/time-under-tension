import React from 'react'
import theme from "../../theme";
import {Shadow as UnstyledShadow} from "react-native-shadow-2";

export const Shadow = props => {
    return <UnstyledShadow
        startColor={theme.colors.shadowDark}
        sides={['bottom', "right"]}
        corners={['bottomRight', 'bottomLeft', 'topRight']}
        distance={theme.shadowDistance}
        radius={theme.borderRadius}
    >
        <UnstyledShadow
            startColor={theme.colors.shadowLight}
            sides={['top', "left"]}
            corners={['topLeft', 'topRight', 'bottomLeft']}
            distance={theme.shadowDistance}
            radius={theme.borderRadius}
        >
            {props.children && (props.children) || (props.child)}
        </UnstyledShadow>
    </UnstyledShadow>
}