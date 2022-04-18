import timerReducer, {
    changeActiveWork,
    moveToReady,
    moveToRest,
    moveToSetup,
    moveToWork,
    NO_ACTIVE_WORK,
    resetTimerCount,
    setActiveWorkIfUndefined
} from "./timerReducer";
import {TIMER_STATE} from "../constants";
import tk from "timekeeper";

const time = new Date(1330688329321);

tk.freeze(time)

describe('Timer', () => {
    test('test initial state', () => {
        const initialState = timerReducer(undefined, {})
        expect(initialState).toEqual({
            state: TIMER_STATE.ready,
            enteredStateAt: null,
            activeWorkId: NO_ACTIVE_WORK,
        })
    })

    test('can move to state ready', () => {
        const previousState = {
            state: TIMER_STATE.ready,
            enteredStateAt: null,
        }
        const nextState = timerReducer(previousState, moveToReady())
        expect(nextState).toEqual({
            state: TIMER_STATE.ready,
            enteredStateAt: time.toISOString(),
        })
    })

    test('can move to state setup', () => {
        const previousState = {
            state: TIMER_STATE.ready,
            enteredStateAt: null,
        }
        const nextState = timerReducer(previousState, moveToSetup())
        expect(nextState).toEqual({
            state: TIMER_STATE.setup,
            enteredStateAt: time.toISOString(),
        })
    })

    test('can move to state work', () => {
        const previousState = {
            state: TIMER_STATE.ready,
            enteredStateAt: null,
        }
        const nextState = timerReducer(previousState, moveToWork())
        expect(nextState).toEqual({
            state: TIMER_STATE.work,
            enteredStateAt: time.toISOString(),
        })
    })

    test('can move to state rest', () => {
        const previousState = {
            state: TIMER_STATE.ready,
            enteredStateAt: null,
        }
        const nextState = timerReducer(previousState, moveToRest())
        expect(nextState).toEqual({
            state: TIMER_STATE.rest,
            enteredStateAt: time.toISOString(),
        })
    })

    test('can reset timer', () => {
        const previousState = {
            state: TIMER_STATE.work,
            activeWorkId: 'work_123',
            enteredStateAt: time.toISOString(),
        }
        const nextState = timerReducer(previousState, resetTimerCount())
        expect(nextState).toEqual({
            state: TIMER_STATE.ready,
            activeWorkId: 'work_123',
            enteredStateAt: null,
        })
    })

    test('can update the active work', () => {
        const previousState = {state: TIMER_STATE.work}
        const nextState = timerReducer(previousState, changeActiveWork('work_123'))
        expect(nextState).toEqual({
            state: TIMER_STATE.work,
            activeWorkId: 'work_123'
        })
    })

    test('can select update the active work when the active work isnt already set ', () => {
        const previousState = {
            state: TIMER_STATE.work,
            activeWorkId: NO_ACTIVE_WORK,
        }
        const newState = timerReducer(previousState, setActiveWorkIfUndefined('work_123'))
        expect(newState).toEqual({
            state: TIMER_STATE.work,
            activeWorkId: 'work_123'
        })
        const newerState = timerReducer(newState, setActiveWorkIfUndefined('work_456'))
        expect(newerState).toEqual({
            state: TIMER_STATE.work,
            activeWorkId: 'work_123'
        })
    })
})