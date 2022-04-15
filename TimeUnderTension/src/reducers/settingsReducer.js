import {createSlice} from "@reduxjs/toolkit";
import {
    DEFAULT_REST_TIME,
    DEFAULT_SETUP_TIME,
    DEFAULT_SOUND_START_WORK,
    DEFAULT_SOUND_TARGET_WORK_END,
    DEFAULT_SOUND_TARGET_WORK_START,
    DEFAULT_WORK_TIME_LOWER,
    DEFAULT_WORK_TIME_UPPER
} from "../constants";
import {isRealValue} from "../utils/utils";

const getInitialState = () => {
    return {
        defaultWorkTimeStart: DEFAULT_WORK_TIME_LOWER,
        defaultWorkTimeEnd: DEFAULT_WORK_TIME_UPPER,
        defaultRestTime: DEFAULT_REST_TIME,
        defaultSetupTime: DEFAULT_SETUP_TIME,
        soundStartWork: DEFAULT_SOUND_START_WORK,
        soundTargetWorkStart: DEFAULT_SOUND_TARGET_WORK_START,
        soundTargetWorkEnd: DEFAULT_SOUND_TARGET_WORK_END,
    }
}
const settingsSlice = createSlice({
    name: 'settings',
    initialState: getInitialState(),
    reducers: {
        reset: (state) => {
            const initialState = getInitialState()
            Object.keys(initialState).forEach(key => state[key] = initialState[key])
        },
        setDefaultWorkTime: (state, action) => {
            if (
                !('start' in action.payload) ||
                !('end' in action.payload)
            ) {
                throw `bad setDefaultWorkTime action payload: ${JSON.stringify(action.payload)}`
            }

            state.defaultWorkTimeStart = action.payload.start
            state.defaultWorkTimeEnd = action.payload.end
        },
        setDefaultRestTime: (state, action) => {
            if (!isRealValue(action.payload)) {
                throw `bad setDefaultRestTime action payload: ${JSON.stringify(action.payload)}`
            }

            state.defaultRestTime = action.payload
        },
        setDefaultSetupTime: (state, action) => {
            if (!isRealValue(action.payload)) {
                throw `bad setDefaultSetupTime action payload: ${JSON.stringify(action.payload)}`
            }

            state.defaultSetupTime = action.payload
        },
        setStartWorkSound: (state, action) => {
            if (!isRealValue(action.payload)) {
                throw `bad setStartWorkSound action payload: ${JSON.stringify(action.payload)}`
            }

            state.soundStartWork = action.payload
        },
        setSoundTargetWorkStart: (state, action) => {
            if (!isRealValue(action.payload)) {
                throw `bad setSoundTargetWorkStart action payload: ${JSON.stringify(action.payload)}`
            }

            state.soundTargetWorkStart = action.payload
        },
        setSoundTargetWorkEnd: (state, action) => {
            if (!isRealValue(action.payload)) {
                throw `bad setSoundTargetWorkEnd action payload: ${JSON.stringify(action.payload)}`
            }

            state.soundTargetWorkEnd = action.payload
        }
    }
})

export const selectSettings = state => state.settings

export const {
    reset, setDefaultWorkTime, setDefaultRestTime, setDefaultSetupTime,
    setStartWorkSound, setSoundTargetWorkStart, setSoundTargetWorkEnd
} = settingsSlice.actions

export default settingsSlice.reducer