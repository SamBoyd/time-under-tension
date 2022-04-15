import timerReducer, {
    changeActiveWork,
    incrementCount,
    moveToReady,
    moveToRest,
    moveToSetup,
    moveToWork, NO_ACTIVE_WORK,
    resetCount,
    resetTimerCount, 
    setActiveWorkIfUndefined
} from "./timerReducer";
import {TIMER_STATE} from "../constants";

describe('Timer', () => {
    test('test initial state', () => {
        const initialState = timerReducer(undefined, {})
        expect(initialState).toEqual({
            state: TIMER_STATE.ready,
            activeWorkId: NO_ACTIVE_WORK,
        })
    })

    test('can move to state ready', () => {
        const previousState = {
            state: TIMER_STATE.ready
        }
        const nextState = timerReducer(previousState, moveToReady())
        expect(nextState).toEqual({
            state: TIMER_STATE.ready
        })
    })

    test('can move to state setup', () => {
        const previousState = {
            state: TIMER_STATE.ready
        }
        const nextState = timerReducer(previousState, moveToSetup())
        expect(nextState).toEqual({
            state: TIMER_STATE.setup,
            count: 0
        })
    })

    test('can move to state work', () => {
        const previousState = {
            state: TIMER_STATE.ready
        }
        const nextState = timerReducer(previousState, moveToWork())
        expect(nextState).toEqual({
            state: TIMER_STATE.work,
            count: 0
        })
    })

    test('can move to state rest', () => {
        const previousState = {
            state: TIMER_STATE.ready
        }
        const nextState = timerReducer(previousState, moveToRest())
        expect(nextState).toEqual({
            state: TIMER_STATE.rest,
            count: 0
        })
    })

    test('can increment count', () => {
        const previousState = { count: 0 }
        const nextState = timerReducer(previousState, incrementCount())
        expect(nextState).toEqual({ count: 1})
    })

    test('can reset count', () => {
        const previousState = { count: 42 }
        const nextState = timerReducer(previousState, resetCount())
        expect(nextState).toEqual({ count: 0})
    })

    test('can reset timer', () => {
        const previousState = { state: TIMER_STATE.work, count: 42, activeWorkId: 'work_123'}
        const nextState = timerReducer(previousState, resetTimerCount())
        expect(nextState).toEqual({
            state:TIMER_STATE.ready,
            count: 0,
            activeWorkId: 'work_123',
        })
    })

    test('can update the active work', () => {
        const previousState = { state: TIMER_STATE.work, count: 42 }
        const nextState = timerReducer(previousState, changeActiveWork('work_123'))
        expect(nextState).toEqual({
            state:TIMER_STATE.work,
            count: 42,
            activeWorkId: 'work_123'
        })
    })

    test('can select update the active work when the active work isnt already set ', () => {
        const previousState = {
            state: TIMER_STATE.work,
            count: 42,
            activeWorkId: NO_ACTIVE_WORK,
        }
        const newState = timerReducer(previousState, setActiveWorkIfUndefined('work_123'))
        expect(newState).toEqual({
            state:TIMER_STATE.work,
            count: 42,
            activeWorkId: 'work_123'
        })
        const newerState = timerReducer(newState, setActiveWorkIfUndefined('work_456'))
        expect(newerState).toEqual({
            state:TIMER_STATE.work,
            count: 42,
            activeWorkId: 'work_123'
        })
    })
})