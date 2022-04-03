import theme from "../theme";
import {useCountdown} from "react-native-countdown-circle-timer";
import React from "react";
import {Pressable, StyleSheet, View} from "react-native";
import Svg, {Defs, Path, RadialGradient, Stop} from "react-native-svg";
import {Shadow as UnstyledShadow} from "react-native-shadow-2";
import {widthPercentageToDP as wp} from "react-native-responsive-screen";


const CIRCLE_PADDING = wp(2)
const SHADOW_DISTANCE = wp(0.8)
const CIRCLE_SIZE = wp(50)
const CIRCLE_OFFSET = 2
const CIRCLE_STROKE_WIDTH = 10

const CountdownCircleTimer = props => {
    const styles = StyleSheet.create({
        container: {
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 10,

            padding: props.circlePadding,
            borderRadius: props.size / 2,
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
        isPlaying: props.isPlaying,
        duration: props.duration,
        colors: 'url(#your-unique-id)',
        strokeWidth: CIRCLE_STROKE_WIDTH,
        children: props.children,
        onComplete:props.onComplete,
    })

    return (
        <Pressable onPressIn={props.onPress}>
            <UnstyledShadow
                startColor={'black'}
                // finalColor={theme.colors.tertiary}
                offset={[CIRCLE_OFFSET, CIRCLE_OFFSET]}
                // sides={[]}
                // corners={['bottomRight']}
                distance={SHADOW_DISTANCE}
                radius={(CIRCLE_SIZE / 2) + (CIRCLE_PADDING / 2)}
            >
                <UnstyledShadow
                    // finalColor={theme.colors.tertiary}
                    startColor={theme.colors.shadowLight}
                    offset={[-CIRCLE_OFFSET, -CIRCLE_OFFSET]}
                    // sides={['top', "left"]}
                    // corners={['topLeft', 'topRight', 'bottomLeft']}
                    distance={SHADOW_DISTANCE}
                    radius={(CIRCLE_SIZE / 2) + (CIRCLE_PADDING / 2)}
                >
                    <View style={styles.container}>
                        <View style={{width: size, height: size, position: 'relative'}}>
                            <Svg width={size} height={size}>
                                <Defs>
                                    {/*<LinearGradient id="your-unique-id" x1="1" y1="0" x2="0" y2="0">*/}
                                    {/*    <Stop offset="5%" stopColor={theme.colors.primary}/>*/}
                                    {/*    <Stop offset="90%" stopColor={theme.colors.secondary}/>*/}
                                    {/*    <Stop offset="95%" stopColor={theme.colors.primary}/>*/}
                                    {/*</LinearGradient>*/}
                                    <RadialGradient
                                        id="your-unique-id"
                                        cx={(props.size / 3)}
                                        cy={(props.size / 2) + (2 * props.circlePadding)}
                                        rx={props.size / 2}
                                        ry={(props.size / 2)}
                                        fx="150"
                                        fy="75"
                                        gradientUnits="userSpaceOnUse"
                                    >
                                        <Stop offset="0" stopColor={theme.colors.primary} stopOpacity="1"/>
                                        <Stop offset="1" stopColor={theme.colors.secondary} stopOpacity="1"/>
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
                                {props.children({
                                    remainingTime: remainingTime,
                                    elapsedTime: elapsedTime
                                })}
                            </View>
                        </View>
                    </View>
                </UnstyledShadow>
            </UnstyledShadow>
        </Pressable>
    )
}

export default CountdownCircleTimer