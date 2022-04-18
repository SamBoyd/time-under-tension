import React, {useEffect, useRef, useState} from 'react'
import {Icon} from "react-native-elements";
import {TextNormal} from "./styled/text";
import humanizeDuration from "humanize-duration";
import {View} from "react-native";
import theme from "../theme";
import {widthPercentageToDP as wp} from "react-native-responsive-screen";


const shortEnglishHumanizer = humanizeDuration.humanizer({
    language: "shortEn",
    languages: {
        shortEn: {
            y: () => "year",
            mo: () => "month",
            w: () => "week",
            d: () => "day",
            h: () => "hour",
            m: () => "min",
            s: () => "sec",
        },
    },
});
export const WorkoutDuration = props => {
    const [duration, setDuration] = useState(0)

    const intervalId = useRef(null)

    useEffect(() => {
        if (intervalId.current !== null) {
            clearInterval(intervalId.current);
        }
        const tick = () => {
            setDuration(Date.now() - Date.parse(props.startedAt))
        }
        intervalId.current = setInterval(tick, 1000);
    }, [props.startedAt]);

    const styles = {
        container: {
            marginHorizontal: wp(4),

            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
        },

        icon: {
            color: theme.colors.white,
        },

        iconContainer: {
            marginRight: wp(2)
        },

        textContainer: {
            textAlign: 'flex-start'
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <Icon name='clock' type='foundation' color={styles.icon.color}/>
            </View>
            <View style={styles.textContainer}>
                <TextNormal>{shortEnglishHumanizer(duration, {largest: 2, round: true})}</TextNormal>
            </View>
        </View>
    )
}