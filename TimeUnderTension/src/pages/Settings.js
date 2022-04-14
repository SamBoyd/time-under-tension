import React, {useState} from 'react'
import BasePage from "../components/basePage";
import {FlexColumnView, FlexRowView} from "../components/styled/view";
import {TextH1, TextNormal} from "../components/styled/text";
import {selectSettings, setDefaultWorkTime} from "../reducers/settingsReducer";
import {useDispatch, useSelector} from "react-redux";
import {StyleSheet, View} from "react-native";
import theme, {standardHorizontalPadding, standardVerticalPadding} from "../theme";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Input} from "react-native-elements";

const Settings = props => {
    const settingsState = useSelector(selectSettings)
    const dispatch = useDispatch()

    const [workTimeStart, setWorkTimeStart] = useState(settingsState.defaultWorkTimeStart)
    const [workTimeEnd, setWorkTimeEnd] = useState(settingsState.defaultWorkTimeEnd)

    const setWorkTimeStartAction = () => {
        let end = settingsState.defaultWorkTimeEnd
        if (workTimeStart > settingsState.defaultWorkTimeEnd) {
            end = workTimeStart + 1
            setWorkTimeEnd(end)
        }
        dispatch(setDefaultWorkTime({start: workTimeStart, end: end}))
    }

    const setWorkTimeEndAction = () => {
        let start = settingsState.defaultWorkTimeStart
        if (workTimeEnd < start) {
            if (workTimeEnd === 0) {
                start = 0
            } else {
                start = workTimeEnd - 1

            }
            setWorkTimeStart(start)
        }
        dispatch(setDefaultWorkTime({start: start, end: workTimeEnd}))
    }

    const styles = StyleSheet.create({
        wrapping: {
            paddingVertical: standardVerticalPadding,
            paddingHorizontal: standardHorizontalPadding,
        },

        rowGap: hp(2),

        workTime: {
            marginTop: standardVerticalPadding
        },

        input: {
            container: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: wp(80),
            },
            inputContainer: {
                width: wp(30),
                backgroundColor: theme.colors.grey0,
                borderRadius: theme.borderRadius,

            },
            label: {
                width: wp(50)
            },

            placeholderColor: theme.colors.grey0,
            color: theme.colors.white,
            textAlign: 'center',
        },
    })

    return (
        <BasePage>
            <View style={styles.wrapping}>
                <TextH1>Work time</TextH1>
                <FlexColumnView viewStyle={styles.workTime} rowGap={styles.rowGap}>
                    <Input
                        keyboardAppearance="default"
                        keyboardType='number-pad'
                        onChangeText={value => setWorkTimeStart(parseInt( value) || 0)}
                        onBlur={setWorkTimeStartAction}
                        value={(workTimeStart || 0).toString()}
                        inputStyle={styles.input}
                        containerStyle={styles.input.container}
                        inputContainerStyle={styles.input.inputContainer}
                        placeholder={'Exercise name'}
                        placeholderTextColor={styles.input.placeholderColor}
                        label={<TextNormal>Default target start</TextNormal>}
                        labelStyle={styles.input.label}
                    />

                    <Input
                        keyboardAppearance="default"
                        keyboardType='number-pad'
                        onChangeText={value => setWorkTimeEnd(parseInt(value) || 0)}
                        onBlur={setWorkTimeEndAction}
                        value={(workTimeEnd || 0).toString()}
                        inputStyle={styles.input}
                        containerStyle={styles.input.container}
                        inputContainerStyle={styles.input.inputContainer}
                        placeholder={'Exercise name'}
                        placeholderTextColor={styles.input.placeholderColor}
                        label={<TextNormal>Default target end</TextNormal>}
                    />
                </FlexColumnView>
            </View>
        </BasePage>
    )
}

export default Settings
