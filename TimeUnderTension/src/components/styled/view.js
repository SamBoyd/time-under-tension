import React from 'react'
import {StyleSheet, View} from "react-native";
import {isRealValue} from "../../utils/utils";
import {TextNormal} from "./text";

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

export const FlexColumnView = props => {
    if (!('rowGap' in props) || !Array.isArray(props.children)) {
        return <View {...props} style={{...styles.column, ...props.viewStyle}}/>
    }

    const wrappedChildren = props.children.map((child, index) => {
        if (index === 0) {
            return <View key={index}>{child}</View>
        } else {
            return <View key={index} style={{marginTop: props.rowGap}}>{child}</View>
        }
    })

    return <View {...props} style={{...styles.column, ...props.viewStyle}}>
        {wrappedChildren}
    </View>
}