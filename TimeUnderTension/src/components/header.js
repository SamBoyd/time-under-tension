import React from 'react'
import {Header} from "react-native-elements";
import {StyleSheet, ScrollView, View} from "react-native";

import theme from '../theme'


const styles = StyleSheet.create({
    backgroundColor: theme.colors.secondary,
    containerStyle: {
        backgroundColor: theme.colors.secondary,
        height: 50
    },

})

const HeaderStyled = props => {
    return <Header
            leftComponent={props.leftComponent}
            rightComponent={props.rightComponent}

            containerStyle={styles.containerStyle}
            backgroundColor={styles.backgroundColor}
        />
}

export default HeaderStyled