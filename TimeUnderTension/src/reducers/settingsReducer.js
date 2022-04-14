import {createSlice} from "@reduxjs/toolkit";
import {DEFAULT_WORK_TIME_LOWER, DEFAULT_WORK_TIME_UPPER} from "../constants";

const getInitialState = () => {
    return {
        defaultWorkTimeStart: DEFAULT_WORK_TIME_LOWER,
        defaultWorkTimeEnd: DEFAULT_WORK_TIME_UPPER,
    }
}
const settingsSlice = createSlice({
    name: 'settings',
    initialState: getInitialState(),
    reducers: {
        reset: (state) =>{
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
    }
})

export const selectSettings = state => state.settings

export const {
    reset, setDefaultWorkTime
} = settingsSlice.actions

export default settingsSlice.reducer