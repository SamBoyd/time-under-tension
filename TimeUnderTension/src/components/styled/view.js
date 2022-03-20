import React from 'react'
import {StyleSheet, View} from "react-native";

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        textAlignVertical: "center"
    },

    column: {
        flexDirection: "column",
    },
});

export const FlexRowView = props => <View {...props} style={{...styles.row, ...props.viewStyle}}/>

export const FlexColumnView = props => <View {...props} style={{...styles.column, ...props.viewStyle}}/>