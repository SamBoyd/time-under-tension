import React from 'react';
import {ScrollView, StyleSheet, View, StatusBar} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import Header from "./header";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import theme from "../theme";
import {TextH1} from "./styled/text";


const styles = StyleSheet.create({
    statusBackgroundView: {
        zIndex: -1000,
        position:"absolute",
        top: 0,
        left:0,
        width: wp(100),
        height: hp(10),

        backgroundColor: theme.colors.tertiary
    },
    wrapper: {
        flex: 1,
        height: hp(100),
        backgroundColor: theme.colors.tertiary
    },

    statusBar: {
        backgroundColor: theme.colors.tertiary
    },

    scrollWrapper: {
        flex: 1,
        backgroundColor: theme.colors.tertiary,
        paddingLeft: wp(5),
        paddingRight: wp(5),
        height: hp(100) ,
    },

    scrollContent: {
        paddingBottom: 200,
    },

    title: {
        color: theme.colors.secondary
    },
})

const BasePage = props => {
    return(
        <SafeAreaView style={styles.wrapper}>
            <View style={styles.statusBackgroundView}></View>
            <StatusBar translucent backgroundColor={styles.statusBar.color} barStyle="dark-content"/>
            <Header
                leftComponent={props.leftHeaderComponent}
                centerComponent={<View><TextH1 style={styles.title}>{props.headerTitle}</TextH1></View>}
                rightComponent={props.rightHeaderComponent}
            />
            <View style={styles.scrollWrapper}>
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    {props.children}
                </ScrollView>
            </View>

        </SafeAreaView>
    )
};

export default BasePage