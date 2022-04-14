import settingsReducer, {setDefaultWorkTime} from "./settingsReducer";

describe('settingsReducer', () => {
    it('has a correct initial state', () => {
        const initialState = settingsReducer(undefined, {})

        expect(initialState).toEqual(
            {
                defaultWorkTimeStart: 5,
                defaultWorkTimeEnd: 15
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
})