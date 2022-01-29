import timerReducer, {
    incrementCount,
    moveToReady,
    moveToRest,
    moveToSetup,
    moveToWork,
    resetCount
} from "./timerReducer";
import {TIMER_STATE} from "../constants";

describe('Timer', () => {
    test('test initial state', () => {
        const initialState = timerReducer(undefined, {})
        expect(initialState).toEqual({
            state: TIMER_STATE.ready
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
})