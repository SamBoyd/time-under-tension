import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {incrementCount, moveToRest, moveToSetup, moveToWork, selectTimer} from "../reducers/timerReducer";
import {
    DEFAULT_REST_TIME,
    DEFAULT_SETUP_TIME,
    DEFAULT_WORK_TIME_LOWER,
    DEFAULT_WORK_TIME_UPPER,
    TIMER_STATE
} from "../constants";


const ready = dispatch => {
    const click = () => {
        dispatch(moveToSetup())
    }
    return (
        <div>
            <p>Timer</p>
            <p>Ready</p>
            <button onClick={click}>Click to start</button>
        </div>
    )
}

const setup = count => {
    return (
        <div>
            <p>Timer</p>
            <p>Setup - {count}</p>
        </div>
    )
}

const work = (dispatch, count, lower, upper) => {
    const finish = () => dispatch(moveToRest())
    return (
        <div>
            <p>Timer</p>
            <p>Work - {count}</p>
            <p>{lower}s -> {upper}s</p>
            <p><button onClick={finish}>Finish</button> </p>
        </div>
    )
}

const rest = count => {
    return (
        <div>
            <p>Timer</p>
            <p>Rest - {count}</p>
        </div>
    )}

const Timer = () => {
    const timer = useSelector(selectTimer)
    const dispatch = useDispatch()

    if (timer.state === TIMER_STATE.setup && timer.count >= DEFAULT_SETUP_TIME) {
        dispatch(moveToWork())
    } else if (timer.state === TIMER_STATE.rest && timer.count >= DEFAULT_REST_TIME)  {
        dispatch(moveToWork())
    }

    useEffect(() => {
        const interval = setInterval(() => dispatch(incrementCount()), 1000);
        return () => clearInterval(interval);
    }, []);

    switch (timer.state) {
        case TIMER_STATE.ready:
            return ready(dispatch);
            break;
        case TIMER_STATE.setup:
            return setup(timer.count);
            break;
        case TIMER_STATE.work:
            return work(dispatch, timer.count, DEFAULT_WORK_TIME_LOWER, DEFAULT_WORK_TIME_UPPER);
            break;
        case TIMER_STATE.rest:
            return rest(timer.count);
            break;
        default:
            return <div>Nothing here</div>
    }
}

export default Timer
