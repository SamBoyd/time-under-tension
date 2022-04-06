import {createSlice} from '@reduxjs/toolkit';
import {TIMER_STATE} from "../constants";

export const NO_ACTIVE_WORK = "NO_ACTIVE_WORK"

const timerReducer = createSlice({
    name: 'timer',
    initialState: {
        state: TIMER_STATE.ready,
        activeWorkId: NO_ACTIVE_WORK
    },
    reducers: {
        reset: state => {
            state.state = TIMER_STATE.ready
            state.count = 0
            state.activeWorkId = NO_ACTIVE_WORK
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
        },
        changeActiveWork: (state, action) => {
            state.activeWorkId = action.payload
        },
        setActiveWorkIfUndefined: (state, action) => {
            if (state.activeWorkId === NO_ACTIVE_WORK) {
                state.activeWorkId = action.payload
            }
        }
    }
})

export const selectTimer = state => state.timer
export const {
    reset,
    moveToReady, moveToSetup, moveToWork, moveToRest,
    incrementCount, resetCount, resetTimer, changeActiveWork,
    setActiveWorkIfUndefined
} = timerReducer.actions
export default timerReducer.reducer
