import React from 'react'

import {Button as UnStyledButton, withTheme} from "react-native-elements";

import theme from '../../theme'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';

export const Button = props => {
    return <UnStyledButton
        {...props}
        buttonStyle={[
            {
                backgroundColor: theme.colors.grey0,
                borderWidth: 0,
                borderRadius: theme.borderRadius,
                borderColor: theme.colors.secondary,
                paddingTop: 0,
                paddingBottom: 0,
                height: hp(4),
            },
            {}
        ]}
        titleStyle={[
            {
                color: theme.colors.white,
                fontSize: theme.textSize,
                fontFamily: theme.fontFamily,
            }
        ]}
        containerStyle={[
            props.containerStyle,
            {
                padding: 0,
                height: hp(4),
            },
        ]}
    />
}