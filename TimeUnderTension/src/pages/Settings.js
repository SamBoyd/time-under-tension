import React, {useState} from 'react'
import BasePage from "../components/basePage";
import {FlexColumnView, FlexRowView} from "../components/styled/view";
import {TextH1, TextNormal} from "../components/styled/text";
import {
    selectSettings,
    setDefaultRestTime,
    setDefaultSetupTime,
    setDefaultWorkTime,
    setSoundSetup,
    setSoundTargetWorkEnd,
    setSoundTargetWorkStart,
    setStartWorkSound
} from "../reducers/settingsReducer";
import {useDispatch, useSelector} from "react-redux";
import {StyleSheet, View} from "react-native";
import theme, {standardHorizontalPadding, standardVerticalPadding} from "../theme";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Divider, Input} from "react-native-elements";
import {Select} from "@mobile-reality/react-native-select-pro";
import {AVAILABLE_SOUNDS} from "../constants";

const Settings = props => {
    const settingsState = useSelector(selectSettings)
    const dispatch = useDispatch()

    const [workTimeStart, setWorkTimeStart] = useState(settingsState.defaultWorkTimeStart)
    const [workTimeEnd, setWorkTimeEnd] = useState(settingsState.defaultWorkTimeEnd)
    const [restTime, setRestTime] = useState(settingsState.defaultRestTime)
    const [setupTime, setSetupTime] = useState(settingsState.defaultSetupTime)

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

    const setRestTimeAction = () => {
        dispatch(setDefaultRestTime(restTime))
    }

    const setSetupTimeAction = () => {
        dispatch(setDefaultSetupTime(setupTime))
    }

    const changeSoundSetup = ({value}) => {
        dispatch(setSoundSetup(value))
    }

    const changeSoundStartWork = ({value}) => {
        dispatch(setStartWorkSound(value))
    }

    const changeSoundTargetWorkStart = ({value}) => {
        dispatch(setSoundTargetWorkStart(value))
    }

    const changeSoundTargetWorkEnd = ({value}) => {
        dispatch(setSoundTargetWorkEnd(value))
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

        select: {
            selectContainerStyle: {
                width: wp(40)
            },

            selectControlStyle: {
                backgroundColor: theme.colors.grey0,
                borderWidth: 0,
            },

            selectControlTextStyle: {
                color: theme.colors.white
            },

            selectControlArrowImageStyle: {
                tintColor: theme.colors.white
            },

            optionStyle: {
                backgroundColor: theme.colors.grey0,
                borderTopWidth: 1,
            },

            optionSelectedStyle: {
                backgroundColor: theme.colors.grey1,
                borderWidth: 0,
            },

            optionTextStyle: {
                color: theme.colors.white
            },

            optionsListStyle: {
                borderWidth: 0
            }
        }
    })

    return (
        <BasePage>
            <View style={styles.wrapping}>
                <TextH1>Work time</TextH1>
                <FlexColumnView viewStyle={styles.workTime} rowGap={styles.rowGap}>
                    <Input
                        keyboardAppearance="default"
                        keyboardType='number-pad'
                        onChangeText={value => setWorkTimeStart(parseInt(value) || 0)}
                        onBlur={setWorkTimeStartAction}
                        value={(workTimeStart || 0).toString()}
                        inputStyle={styles.input}
                        containerStyle={styles.input.container}
                        inputContainerStyle={styles.input.inputContainer}
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
                        placeholderTextColor={styles.input.placeholderColor}
                        label={<TextNormal>Default target end</TextNormal>}
                    />

                    <Input
                        keyboardAppearance="default"
                        keyboardType='number-pad'
                        onChangeText={value => setRestTime(parseInt(value) || 0)}
                        onBlur={setRestTimeAction}
                        value={(restTime || 0).toString()}
                        inputStyle={styles.input}
                        containerStyle={styles.input.container}
                        inputContainerStyle={styles.input.inputContainer}
                        placeholderTextColor={styles.input.placeholderColor}
                        label={<TextNormal>Default rest time</TextNormal>}
                    />

                    <Input
                        keyboardAppearance="default"
                        keyboardType='number-pad'
                        onChangeText={value => setSetupTime(parseInt(value) || 0)}
                        onBlur={setSetupTimeAction}
                        value={(setupTime || 0).toString()}
                        inputStyle={styles.input}
                        containerStyle={styles.input.container}
                        inputContainerStyle={styles.input.inputContainer}
                        placeholderTextColor={styles.input.placeholderColor}
                        label={<TextNormal>Default setup time</TextNormal>}
                    />


                    <Divider/>

                    <TextH1>Sounds</TextH1>

                    <FlexRowView viewStyle={styles.input.container}>
                        <TextNormal>Setup sound</TextNormal>
                        <Select
                            defaultOption={
                                AVAILABLE_SOUNDS
                                    .map(({name, filename}) => {
                                        return {value: filename, label: name}
                                    })
                                    .find(({value, label}) => value === settingsState.soundSetup)
                            }
                            onSelect={changeSoundSetup}
                            options={AVAILABLE_SOUNDS.map(sound => {
                                return {value: sound.filename, label: sound.name}
                            })}
                            multiSelection={false}
                            clearable={false}
                            {...styles.select}
                        />
                    </FlexRowView>

                    <FlexRowView viewStyle={styles.input.container}>
                        <TextNormal>End of rest sound</TextNormal>
                        <Select
                            defaultOption={
                                AVAILABLE_SOUNDS
                                    .map(({name, filename}) => {
                                        return {value: filename, label: name}
                                    })
                                    .find(({value, label}) => value === settingsState.soundStartWork)
                            }
                            onSelect={changeSoundStartWork}
                            options={AVAILABLE_SOUNDS.map(sound => {
                                return {value: sound.filename, label: sound.name}
                            })}
                            multiSelection={false}
                            clearable={false}
                            {...styles.select}
                        />
                    </FlexRowView>

                    <FlexRowView viewStyle={styles.input.container}>
                        <TextNormal>Target work time start</TextNormal>
                        <Select
                            defaultOption={
                                AVAILABLE_SOUNDS
                                    .map(({name, filename}) => {
                                        return {value: filename, label: name}
                                    })
                                    .find(({value, label}) => value === settingsState.soundTargetWorkStart)
                            }
                            onSelect={changeSoundTargetWorkStart}
                            options={AVAILABLE_SOUNDS.map(sound => {
                                return {value: sound.filename, label: sound.name}
                            })}
                            multiSelection={false}
                            clearable={false}
                            {...styles.select}
                        />
                    </FlexRowView>

                    <FlexRowView viewStyle={styles.input.container}>
                        <TextNormal>Target work time end</TextNormal>
                        <Select
                            defaultOption={
                                AVAILABLE_SOUNDS
                                    .map(({name, filename}) => {
                                        return {value: filename, label: name}
                                    })
                                    .find(({value, label}) => value === settingsState.soundTargetWorkEnd)
                            }
                            onSelect={changeSoundTargetWorkEnd}
                            options={AVAILABLE_SOUNDS.map(sound => {
                                return {value: sound.filename, label: sound.name}
                            })}
                            multiSelection={false}
                            clearable={false}
                            {...styles.select}
                        />
                    </FlexRowView>

                    <Divider/>

                </FlexColumnView>
            </View>
        </BasePage>
    )
}

export default Settings
