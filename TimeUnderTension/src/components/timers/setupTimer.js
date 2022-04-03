import React from 'react'
import {StyleSheet} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import theme from "../../theme";
import CountdownCircleTimer from "../CountdownCircleTimer";
import {TextH1, TextNormal} from "../styled/text";
import {FlexColumnView} from "../styled/view";

const CIRCLE_PADDING = wp(2)
const SHADOW_DISTANCE = wp(0.8)
const CIRCLE_SIZE = wp(50)
const CIRCLE_OFFSET = 2
const CIRCLE_STROKE_WIDTH = 10


const styles = StyleSheet.create({
    titleContainer: {
        alignItems: "center",
        rowGap: hp(1),
    },

    setupTitle: {
        color: theme.colors.grey1
    }
})

const SetupTimer = props => {
    const restDuration = props.duration


    return (
        <CountdownCircleTimer
            key={props.cb}
            isPlaying
            duration={props.duration}
            colors={theme.colors.primary}
            trailColor={theme.colors.tertiary}
            colorsTime={[7, 5, 2, 0]}
            size={CIRCLE_SIZE}
            strokeWidth={CIRCLE_STROKE_WIDTH}
            circlePadding={CIRCLE_PADDING}
            children={({remainingTime, elapsedTime, color}) => {
                return <FlexColumnView viewStyle={styles.titleContainer} rowGap={styles.titleContainer.rowGap}>
                    <TextNormal style={styles.setupTitle}>Setup</TextNormal>
                    <TextH1>{remainingTime}</TextH1>
                    <TextNormal style={styles.setupTitle}>Get ready!</TextNormal>
                </FlexColumnView>
            }}
            onComplete={props.onComplete}
        />
    )
}

export default SetupTimer
