import React from 'react'
import {Header} from "react-native-elements";
import {Platform, StatusBar, StyleSheet, View} from "react-native";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";

import theme from '../theme'

// const statusBarHeight = Platform.OS === 'ios' ? 100: 100;

const statusBarHeight = StatusBar.currentHeight

const styles = StyleSheet.create({
    containerStyle: {
        margin: 0,
        paddingTop: 0,
    },

    header: {
        height: hp(8),
        margin: 0,
        paddingVertical: hp(1),
        paddingHorizontal: wp(5),

        backgroundColor: theme.colors.grey0,

        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "baseline",
    },

    leftComponent: {
        flex: 1
    },

    centerComponent: {
        flex: 3,
        alignItems: "center",
    },

    rightComponent: {
        flex: 1
    },

    statusBar: {
        backgroundColor: theme.colors.secondary,
        padding: 0
    },
})

const Wrapper = props => <View style={styles.header}>{props.children}</View>

const HeaderStyled = props => {
    return <View
        style={styles.header}
    >
        <View style={styles.leftComponent}>{props.leftComponent  || <View></View>}</View>
        <View style={styles.centerComponent}>{props.centerComponent  || <View></View>}</View>
        <View style={styles.rightComponent}>{props.rightComponent  || <View></View>}</View>

    </View>
}

export default HeaderStyled