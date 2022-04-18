import {createSlice} from '@reduxjs/toolkit';
import {TIMER_STATE} from "../constants";

export const NO_ACTIVE_WORK = "NO_ACTIVE_WORK"


const timerReducer = createSlice({
    name: 'timer',
    initialState: {
        state: TIMER_STATE.ready,
        enteredStateAt: null,
        activeWorkId: NO_ACTIVE_WORK,
    },
    reducers: {
        reset: state => {
            state.state = TIMER_STATE.ready
            state.activeWorkId = NO_ACTIVE_WORK
        },
        moveToReady: state => {
            state.state = TIMER_STATE.ready
            state.enteredStateAt = (new Date()).toISOString()
        },
        moveToSetup: state => {
            state.state = TIMER_STATE.setup
            state.enteredStateAt = (new Date()).toISOString()
        },
        moveToWork: state => {
            state.state = TIMER_STATE.work
            state.enteredStateAt = (new Date()).toISOString()
        },
        moveToRest: state => {
            state.state = TIMER_STATE.rest
            state.enteredStateAt = (new Date()).toISOString()
        },
        resetTimerCount: state => {
            state.state = TIMER_STATE.ready
            state.enteredStateAt = null
        },
        changeActiveWork: (state, action) => {
            state.activeWorkId = action.payload
        },
        setActiveWorkIfUndefined: (state, action) => {
            if (state.activeWorkId === NO_ACTIVE_WORK) {
                state.activeWorkId = action.payload
            }
        },
    }
})

export const selectTimer = state => state.timer
export const {
    reset,
    moveToReady, moveToSetup, moveToWork, moveToRest,
    resetTimerCount, changeActiveWork,
    setActiveWorkIfUndefined
} = timerReducer.actions
export default timerReducer.reducer
