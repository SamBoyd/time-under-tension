import settingsReducer, {
    setDefaultRestTime,
    setDefaultSetupTime,
    setDefaultWorkTime,
    setSoundSetup,
    setSoundTargetWorkEnd,
    setSoundTargetWorkStart,
    setStartWorkSound
} from "./settingsReducer";

describe('settingsReducer', () => {
    it('has a correct initial state', () => {
        const initialState = settingsReducer(undefined, {})

        expect(initialState).toEqual(
            {
                defaultWorkTimeStart: 5,
                defaultWorkTimeEnd: 15,
                defaultRestTime: 90,
                defaultSetupTime: 2,
                soundSetup: 'buzzer.mp3',
                soundStartWork: 'buzzer.mp3',
                soundTargetWorkStart: 'train_horn.mp3',
                soundTargetWorkEnd: 'train_horn.mp3',
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

    it('can set the sound for work', () => {
        const previousState = {
            soundStartWork: 'firstSound.mp3'
        }

        const nextState = settingsReducer(previousState, setStartWorkSound('secondSound.mp3'))

        expect(nextState).toEqual({
            soundStartWork: 'secondSound.mp3'
        })
    })

    it('can set the sound for work target start', () => {
        const previousState = {
            soundTargetWorkStart: 'firstSound.mp3'
        }

        const nextState = settingsReducer(previousState, setSoundTargetWorkStart('secondSound.mp3'))

        expect(nextState).toEqual({
            soundTargetWorkStart: 'secondSound.mp3'
        })
    })

    it('can set the sound for work target end', () => {
        const previousState = {
            soundTargetWorkEnd: 'firstSound.mp3'
        }

        const nextState = settingsReducer(previousState, setSoundTargetWorkEnd('secondSound.mp3'))

        expect(nextState).toEqual({
            soundTargetWorkEnd: 'secondSound.mp3'
        })
    })

    it('can set the sound for setup', () => {
        const previousState = {
            soundSetup: 'firstSound.mp3'
        }

        const nextState = settingsReducer(previousState, setSoundSetup('secondSound.mp3'))

        expect(nextState).toEqual({
            soundSetup: 'secondSound.mp3'
        })
    })
})