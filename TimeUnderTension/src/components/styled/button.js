import React from 'react'

import {Button as UnStyledButton, withTheme} from "react-native-elements";

import theme from '../../theme'

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
            backgroundColor: theme.colors.tertiary,
            borderWidth: 1,
            borderRadius: theme.borderRadius,
            borderColor: theme.colors.secondary,
            paddingTop: 0,
            paddingBottom: 0,
        }}
        titleStyle={{
            color: theme.colors.secondary,
            fontSize: 12,
        }}
        containerStyle={[
            props.containerStyle,
            {
                padding: 0,
                height: 30,
            },
        ]}
    />
}