import {NO_ACTIVE_WORK} from "../reducers/timerReducer";
import * as workoutStateService from "./workoutStateService";
import {NOOP_TIMINGS} from "./workoutStateService";

jest.mock('react-native-sound')

describe("workoutStateService it can", () => {
    test("handle no active work", () => {

        const result = workoutStateService.getCurrentTimings(
            jest.fn(),
            {
                timerState: {
                    activeWorkId: NO_ACTIVE_WORK,
                },
                workoutState: {},
                workState: {},
                setState: {},
                settingsState: {}
            }
        )

        expect(result).toEqual(NOOP_TIMINGS)
    })
})