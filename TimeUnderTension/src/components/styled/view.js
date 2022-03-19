import React from 'react'
import {StyleSheet, View} from "react-native";

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        textAlignVertical: "center"
    },

});

export const FlexRowView = props => <View {...props} style={{...styles.row, ...props.viewStyle}}/>