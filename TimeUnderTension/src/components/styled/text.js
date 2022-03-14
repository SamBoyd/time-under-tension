import React from 'react';
import {Text, withTheme} from "react-native-elements";

const h1Style = {
    fontSize: 14,
    fontWeight: "bold"
}
export const TextH1 = withTheme(props => {
    const { theme } = props
    return <TextNormal h1 {...props} h1Style={h1Style} />
})

export const TextNormal = withTheme(props => {
    const { theme } = props
    return <Text {...props} />
})

export const TextBold = withTheme(props => {
    const { theme } = props
    return <Text {...props} style={{fontWeight: "bold"}}/>
})

export const TextLighter = withTheme(props => {
    const { theme } = props
    return <Text {...props} style={{color: theme.colors.grey0}} />
})
