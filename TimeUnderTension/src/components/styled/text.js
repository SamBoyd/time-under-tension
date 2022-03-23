import React from 'react';
import {Text, withTheme} from "react-native-elements";

const h1Style = {
    fontSize: 14,
    fontWeight: "bold"
}
export const TextH1 = props => <Text h1 {...props} h1Style={[props.style, h1Style]}/>

export const TextNormal = withTheme(props => {
    return <Text {...props} />
})

export const TextBold = withTheme(props => {
    const { theme } = props
    return <Text {...props} style={[props.fontStyle, {fontWeight: "bold"}]}/>
})

export const TextLighter = withTheme(props => {
    const { theme } = props
    return <Text {...props} style={{color: theme.colors.grey0}} />
})
