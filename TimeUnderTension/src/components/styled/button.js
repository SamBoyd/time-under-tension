import React from 'react'

import {Button as UnStyledButton, withTheme} from "react-native-elements";

import theme from '../../theme'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';

export const EditButton = props => <UnStyledButton
    {...props}
    title="edit"
    type="clear"
    titleStyle={{
        fontSize: 12,
        textAlignVertical: "top",
        textDecorationColor: theme.colors.grey0,
        fontWeight: 'normal'
    }}
    buttonStyle={{
        marginHorizontal: 0,
        marginVertical: 0,
        padding: 0
    }}
    containerStyle={{
        padding: 0,
        marginHorizontal: 10,
        marginVertical: 0,
    }}
/>

export const Button = props => {
    return <UnStyledButton
        {...props}
        buttonStyle={{
            backgroundColor: theme.colors.grey0,
            borderWidth: 0,
            borderRadius: theme.borderRadius,
            borderColor: theme.colors.secondary,
            paddingTop: 0,
            paddingBottom: 0,
            height: hp(4),

        }}
        titleStyle={{
            color: theme.colors.white,
            fontSize: 12,
        }}
        containerStyle={[
            props.containerStyle,
            {
                padding: 0,
                height: hp(4),
            },
        ]}
    />
}