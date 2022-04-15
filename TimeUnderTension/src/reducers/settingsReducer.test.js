import settingsReducer, {setDefaultRestTime, setDefaultSetupTime, setDefaultWorkTime} from "./settingsReducer";

describe('settingsReducer', () => {
    it('has a correct initial state', () => {
        const initialState = settingsReducer(undefined, {})

        expect(initialState).toEqual(
            {
                defaultWorkTimeStart: 5,
                defaultWorkTimeEnd: 15,
                defaultRestTime: 90,
                defaultSetupTime: 2,
            }
        )
    })

    it('can set the default work time', () => {
        const previousState = {
            defaultWorkTimeStart: 5,
            defaultWorkTimeEnd: 15
        }

        const nextState = settingsReducer(previousState, setDefaultWorkTime({start: 60, end: 70}))

        expect(nextState).toEqual(
            {
                defaultWorkTimeStart: 60,
                defaultWorkTimeEnd: 70
            }
        )
    })

    it('can set the default rest time', () => {
        const previousState = {
            defaultRestTime: 10
        }

        const nextState = settingsReducer(previousState, setDefaultRestTime(20))

        expect(nextState).toEqual({
            defaultRestTime: 20
        })
    })

    it('can set the default setup time', () => {
        const previousState = {
            defaultSetupTime: 10
        }

        const nextState = settingsReducer(previousState, setDefaultSetupTime(20))

        expect(nextState).toEqual({
            defaultSetupTime: 20
        })
    })
})