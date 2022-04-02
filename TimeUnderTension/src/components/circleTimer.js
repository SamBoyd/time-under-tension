import React, {useState} from 'react'
import {StyleSheet} from "react-native";
import {TextNormal} from "./styled/text";
import {View} from "react-native";
import {Button} from "./styled/button";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Shadow} from "./styled/shadow";
import theme, {standardVerticalPadding} from "../theme";
import {Shadow as UnstyledShadow} from "react-native-shadow-2";
import CountdownCircleTimer from "./CountdownCircleTimer";

const CIRCLE_PADDING = wp(2)
const SHADOW_DISTANCE = wp(0.8)
const CIRCLE_SIZE=wp(50)
const CIRCLE_OFFSET=2
const CIRCLE_STROKE_WIDTH=10


const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        padding: standardVerticalPadding,
    },

    button: {
        marginTop: standardVerticalPadding
    }
})

const CircleTimer = props => {
    const [cb, setCB] = useState(false)

    const reset = () => {
        setCB(!cb)
    }

    return (
        <View style={styles.container}>
            <UnstyledShadow
                startColor={'black'}
                // finalColor={theme.colors.tertiary}
                offset={[CIRCLE_OFFSET, CIRCLE_OFFSET]}
                // sides={[]}
                // corners={['bottomRight']}
                distance={SHADOW_DISTANCE}
                radius={(CIRCLE_SIZE/2) + (CIRCLE_PADDING/2)}
            >
            <UnstyledShadow
                // finalColor={theme.colors.tertiary}
                startColor={theme.colors.shadowLight}
                offset={[-CIRCLE_OFFSET, -CIRCLE_OFFSET]}
                // sides={['top', "left"]}
                // corners={['topLeft', 'topRight', 'bottomLeft']}
                distance={SHADOW_DISTANCE}
                radius={(CIRCLE_SIZE/2) + (CIRCLE_PADDING/2)}
            >
                    <CountdownCircleTimer
                        key={cb}
                        isPlaying
                        duration={20}
                        colors={theme.colors.primary}
                        trailColor={theme.colors.tertiary}
                        colorsTime={[7, 5, 2, 0]}
                        size={CIRCLE_SIZE}
                        strokeWidth={CIRCLE_STROKE_WIDTH}
                        circlePadding={CIRCLE_PADDING}
                    />
                </UnstyledShadow>
            </UnstyledShadow>
            <Button containerStyle={styles.button} onPress={reset} title="reset"/>

        </View>
    )
}

export default CircleTimer
