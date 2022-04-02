import React from 'react'
import {DefaultTheme, NavigationContainer as NC} from "@react-navigation/native";
import theme from '../theme'

// const navTheme = {
//     ...DefaultTheme,
//     dark: false,
//     colors: {
//         primary: theme.colors.primary,
//         background: theme.colors.grey0,
//         card: theme.colors.grey0,
//         text: theme.colors.white,
//         border: theme.colors.white,
//         notification: theme.colors.primary,
//     },
// }

const navTheme = {
    ...DefaultTheme,

}
export const NavigationContainer = props => <NC theme={navTheme}>{props.children}</NC>
