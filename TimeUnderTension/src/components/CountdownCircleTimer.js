import theme from "../theme";
import {TextNormal} from "./styled/text";
import {CountdownCircleTimer as CCT, useCountdown} from "react-native-countdown-circle-timer";
import React from "react";
import {StyleSheet, View} from "react-native";
import Svg, {Defs, LinearGradient, Path, RadialGradient, Stop} from "react-native-svg";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";


const CountdownCircleTimer = props => {
    const styles = StyleSheet.create({
        container: {
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 10,

            padding: props.circlePadding,
            borderRadius: props.size/2,
            backgroundColor: theme.colors.tertiary,
        },
        time: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%'
        }
    });

    const {
        path,
        pathLength,
        stroke,
        strokeDashoffset,
        remainingTime,
        elapsedTime,
        size,
        strokeWidth,
    } = useCountdown({
        isPlaying: true,
        duration: props.duration,
        colors: 'url(#your-unique-id)',
        strokeWidth: props.strokeWidth
        })

    return (
        <View style={styles.container}>
            <View style={{ width: size, height: size, position: 'relative' }}>
                <Svg width={size} height={size}>
                    <Defs>
                        {/*<LinearGradient id="your-unique-id" x1="1" y1="0" x2="0" y2="0">*/}
                        {/*    <Stop offset="5%" stopColor={theme.colors.primary}/>*/}
                        {/*    <Stop offset="90%" stopColor={theme.colors.secondary}/>*/}
                        {/*    <Stop offset="95%" stopColor={theme.colors.primary}/>*/}
                        {/*</LinearGradient>*/}
                        <RadialGradient
                            id="your-unique-id"
                            cx={(props.size/3)}
                            cy={(props.size/2) + (2* props.circlePadding)}
                            rx={props.size/2}
                            ry={(props.size/2)}
                            fx="150"
                            fy="75"
                            gradientUnits="userSpaceOnUse"
                        >
                            <Stop offset="0" stopColor={theme.colors.primary} stopOpacity="1" />
                            <Stop offset="1" stopColor={theme.colors.secondary} stopOpacity="1" />
                        </RadialGradient>
                    </Defs>
                    <Path
                        d={path}
                        fill="none"
                        stroke={theme.colors.tertiary}
                        strokeWidth={strokeWidth}
                    />
                    {elapsedTime !== props.duration && (
                        <Path
                            d={path}
                            fill="none"
                            stroke={stroke}
                            strokeLinecap="butt"
                            strokeWidth={strokeWidth}
                            strokeDasharray={pathLength}
                            strokeDashoffset={strokeDashoffset}
                        />
                    )}
                </Svg>
                <View style={styles.time}>
                    <TextNormal style={{ fontSize: 36 }}>{remainingTime}</TextNormal>
                </View>
            </View>
        </View>
    )

    // return (<CCT
    //     key={props.key}
    //     isPlaying
    //     duration={props.duration}
    //     colors={props.colors}
    //     trailColor={props.trailColor}
    //     colorsTime={props.colorsTime}
    //     size={props.size}
    //     strokeWidth={props.strokeWidth}
    // >
    //     {({remainingTime}) => <TextNormal>{remainingTime}</TextNormal>}
    // </CCT>
    // )
}

export default CountdownCircleTimer