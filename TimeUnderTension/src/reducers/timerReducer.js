import {createSlice} from '@reduxjs/toolkit';
import {TIMER_STATE} from "../constants";

const timerReducer = createSlice({
    name: 'timer',
    initialState: {
        state: TIMER_STATE.ready
    },
    reducers: {
        reset: state => {
            state.state = TIMER_STATE.ready
            state.count = 0
        },
        moveToReady: state => {
            state.state = TIMER_STATE.ready
        },
        moveToSetup: state => {
            state.state = TIMER_STATE.setup
            state.count = 0
        },
        moveToWork: state => {
            state.state = TIMER_STATE.work
            state.count = 0
        },
        moveToRest: state => {
            state.state = TIMER_STATE.rest
            state.count = 0
        },

        incrementCount: state => {
            state.count += 1
        },
        resetCount: state => {
            state.count = 0
        },
        resetTimer: state => {
            state.state = TIMER_STATE.ready
            state.count = 0
        }
    }
})

export const selectTimer = state => state.timer
export const {
    reset,
    moveToReady, moveToSetup, moveToWork, moveToRest,
    incrementCount, resetCount, resetTimer
} = timerReducer.actions
export default timerReducer.reducer
