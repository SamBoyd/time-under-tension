import React, {useEffect, useState} from 'react'
import {Icon} from "react-native-elements";
import {TextNormal} from "./styled/text";
import humanizeDuration from "humanize-duration";
import {View} from "react-native";
import theme, {standardVerticalPadding} from "../theme";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";

export const WorkoutDuration = props => {
    const [duration, setDuration] = useState(0)

    useEffect(() => {
        const tick = () => {
            setDuration(Date.now() - Date.parse(props.startedAt))
        }
        const interval = setInterval(tick, 1000);
        return () => clearInterval(interval);
    }, []);


    const styles = {
        container: {
            borderWidth: 1,
            borderColor: theme.colors.secondary,
            borderRadius: theme.borderRadius,
            marginTop: standardVerticalPadding,
            width: wp(50),
            alignSelf: 'flex-end',
            marginRight: wp(4),

            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: hp(1),
        },

        icon: {
            color: theme.colors.secondary,
        }
    }

    return (
        <View style={styles.container}>
            <Icon name='clock' type='foundation' color={styles.icon.color}/>
            <TextNormal>{humanizeDuration(duration, {largest: 2, round: true})}</TextNormal>
        </View>
    )
}