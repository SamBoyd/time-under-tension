import React from 'react'
import {View} from "react-native";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import theme from "../theme";

const ProgressBar = props => {
    const styles = {
            position: 'absolute',
            top: 0,
            left: 0,
            height: hp(12),
            width: `${props.precent || 1}%`,
            backgroundColor: theme.colors.primary,
            borderBottomLeftRadius: theme.borderRadius,
            borderTopLeftRadius: theme.borderRadius,
    }

    return (
        <View style={styles}/>
    )
}

export default ProgressBar