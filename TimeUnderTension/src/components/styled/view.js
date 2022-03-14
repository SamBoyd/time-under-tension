import React from 'react'
import {StyleSheet, View} from "react-native";

const styles = StyleSheet.create({
    row: {
        // paddingVertical: "auto",
        flexDirection: "row",
        textAlignVertical: "center"
        // flexWrap: "wrap",
    },

});

export const FlexRowView = props => <View {...props} style={styles.row}/>