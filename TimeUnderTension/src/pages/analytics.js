import React from 'react'
import {StyleSheet, View} from "react-native";
import {TextNormal} from "../components/styled/text";
import BasePage from "../components/basePage";
import {standardHorizontalPadding, standardVerticalPadding} from "../theme";

const Analytics = props => {

    const styles = StyleSheet.create({
        wrapper: {
            marginTop: standardVerticalPadding,
            marginHorizontal: standardHorizontalPadding,
        }
    })
    return (
        <BasePage>
            <View style={styles.wrapper}>
                <TextNormal>Analytics coming soon...</TextNormal>
            </View>
        </BasePage>
    )
}

export default Analytics
