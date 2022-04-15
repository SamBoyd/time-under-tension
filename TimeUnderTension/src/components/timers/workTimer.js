import React, {useState} from 'react'
import {StyleSheet, View} from "react-native";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import theme from "../../theme";
import CountdownCircleTimer from "../CountdownCircleTimer";
import {TextH1, TextNormal} from "../styled/text";
import {FlexColumnView, FlexRowView} from "../styled/view";
import {playSound} from "../../services/soundService";
import {useSelector} from "react-redux";
import {selectSettings} from "../../reducers/settingsReducer";

const CIRCLE_PADDING = wp(2)
const SHADOW_DISTANCE = wp(0.8)
const CIRCLE_SIZE = wp(50)
const CIRCLE_OFFSET = 2
const CIRCLE_STROKE_WIDTH = 10


const styles = StyleSheet.create({
    titleContainer: {
        alignItems: 'center',
        rowGap: hp(1),
    },

    workTitle: {
        color: theme.colors.grey1,

        timeDisplay: {
            width: wp(30),
            time: {
                flex: 2,
                alignItems: 'flex-end'
            },
            seconds: {
                flex: 1,
                justifyContent: 'flex-end'
            }
        }
    }
})

const WorkTimer = props => {
    const settingsState = useSelector(selectSettings)
    const [timeElapsedOffset, setTimeElapsedOffset] = useState(0)
    const restDuration = props.duration


    return (
        <CountdownCircleTimer
            key={props.cb}
            isPlaying
            duration={props.workTimeEnd}
            colors={theme.colors.primary}
            trailColor={theme.colors.tertiary}
            colorsTime={[7, 5, 2, 0]}
            size={CIRCLE_SIZE}
            strokeWidth={CIRCLE_STROKE_WIDTH}
            circlePadding={CIRCLE_PADDING}
            children={({remainingTime, elapsedTime, color}) => {
                return <FlexColumnView viewStyle={styles.titleContainer} rowGap={styles.titleContainer.rowGap}>
                    <TextNormal style={styles.workTitle}>Work</TextNormal>
                    <FlexRowView viewStyle={styles.workTitle.timeDisplay}>
                        <View style={styles.workTitle.timeDisplay.time}>
                            <TextH1>{Math.floor(elapsedTime) + timeElapsedOffset} / {props.workTimeEnd}</TextH1>
                        </View>
                        <View style={styles.workTitle.timeDisplay.seconds}><TextNormal>sec</TextNormal></View>
                    </FlexRowView>
                    <TextNormal style={styles.workTitle}>Click when finished</TextNormal>
                </FlexColumnView>
            }}
            onUpdate={(remainingTime) => {
                if (timeElapsedOffset === 0) {
                    if (remainingTime === props.workTimeEnd - props.workTimeStart) {
                        playSound(settingsState.soundTargetWorkStart)
                    }

                    if (remainingTime === 0) {
                        playSound(settingsState.soundTargetWorkEnd)
                    }
                }
            }}
            onPress={props.onComplete}
            onComplete={() => {
                setTimeElapsedOffset(timeElapsedOffset + props.workTimeEnd)
                return {shouldRepeat: true}
            }}
            isComplete={timeElapsedOffset >= props.workTimeEnd}
        />
    )
}

export default WorkTimer
