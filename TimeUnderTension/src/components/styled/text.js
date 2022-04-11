import React from 'react';
import theme from "../../theme";
import {Text} from "react-native-elements";
import {StyleSheet} from "react-native"


const styles = StyleSheet.create({
    text: {
        fontSize: theme.textSize,
        color: theme.colors.white,
        // fontFamily: theme.fontFamily,
    },
    h1Style: {
        fontSize: theme.textSize + 5,
        fontWeight: "bold",
    },
    lighter: {
        color: theme.colors.grey1,
    },
    bold: {
        fontWeight: "bold",
    }
})

const StyledText = props => <Text {...props} style={[styles.text, props.style]} />

export const TextH1 = props => <StyledText h1 {...props} h1Style={[styles.text, styles.h1Style, props.style]}/>

export const TextNormal = props => <StyledText {...props} style={[styles.text, props.style]}/>

export const TextBold = props => {
    return <StyledText {...props} style={[styles.text, styles.bold, props.style]}/>
}

export const TextLighter = props => {
    return <StyledText {...props} style={[styles.text, styles.lighter, props.style]} />
}
