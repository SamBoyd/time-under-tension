import React from 'react';
import theme from "../../theme";
import {Text} from "react-native-elements";

const h1Style = {
    fontSize: theme.Text.style.fontSize + 5,
    color: theme.Text.style.color,
    fontWeight: "bold"
}

export const TextH1 = props => <Text h1 {...props} h1Style={[theme.Text.style, props.style, h1Style]}/>

export const TextNormal = props => <Text {...props} style={[theme.Text.style, props.style]}/>

export const TextBold = props => {
    return <Text {...props} style={[theme.Text.style, props.fontStyle, {fontWeight: "bold"}]}/>
}

export const TextLighter = props => {
    return <Text {...props} style={[theme.Text.style, {color: theme.colors.grey1}]} />
}
