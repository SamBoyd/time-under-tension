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

export const Button = withTheme(props => {
    const { theme } = props
    return <UnStyledButton
        {...props}
        buttonStyle={{ backgroundColor: 'rgba(39, 39, 39, 1)' }}
        containerStyle={{
            width: 200,
            // marginHorizontal: 50,
            marginVertical: 10,
        }}
        titleStyle={{ color: 'white', marginHorizontal: 20 }}
        />
})