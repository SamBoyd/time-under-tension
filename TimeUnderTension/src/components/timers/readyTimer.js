import React from 'react'
import {StyleSheet} from "react-native";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
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
    title: {
        // fontFamily: theme.fontFamily,
        color: theme.colors.white
    },

    titleContainer: {
        alignItems: "center",
        rowGap: hp(1)
    },

    clickCopy: {
        color: theme.colors.grey1,
    }
})

const ReadyTimer = props => {

    return (
        <CountdownCircleTimer
            key={props.cb}
            isPlaying={false}
            duration={10}
            colors={theme.colors.primary}
            trailColor={theme.colors.tertiary}
            colorsTime={[7, 5, 2, 0]}
            size={CIRCLE_SIZE}
            strokeWidth={CIRCLE_STROKE_WIDTH}
            circlePadding={CIRCLE_PADDING}
            children={({remainingTime, elapsedTime, color}) => {
                return <FlexColumnView viewStyle={styles.titleContainer} rowGap={styles.titleContainer.rowGap}>
                    <TextH1>Ready</TextH1>
                    <TextNormal style={styles.clickCopy}>Click to setup</TextNormal>
                </FlexColumnView>
            }}
            onPress={props.onPress()}
            onComplete={()=>{}}
        />
    )
}

export default ReadyTimer
