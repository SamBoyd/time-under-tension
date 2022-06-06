import 'react-native-get-random-values';

export const PAGE = {
    main: 'main',
    main_nav: 'main_nav',
    workout: 'workout',
    pickExercise: 'pickExercise',
    createTemplateWorkout: 'createTemplateWorkout',
    manageExercises: 'manageExercises',
    addExercise: 'addExercise',
    settings: 'settings',
    analytics: 'analytics',
    history: 'history',
}

export const TIMER_STATE = {
    ready: 'ready',
    setup: 'setup',
    work: 'work',
    rest: 'rest'
}

export const DEFAULT_SETUP_TIME = 2
export const DEFAULT_WORK_TIME_LOWER = 5
export const DEFAULT_WORK_TIME_UPPER = 15
export const DEFAULT_REST_TIME = 45

export const AVAILABLE_SOUNDS = [
    {name: 'Buzzer', filename: 'buzzer.mp3'},
    {name: 'Train horn', filename: 'train_horn.mp3'},
]
export const DEFAULT_SOUND_SETUP = 'buzzer.mp3'
export const DEFAULT_SOUND_START_WORK = 'buzzer.mp3'
export const DEFAULT_SOUND_TARGET_WORK_START = 'train_horn.mp3'
export const DEFAULT_SOUND_TARGET_WORK_END = 'train_horn.mp3'

export const exerciseCategory = {
    chest: 'chest',
    arms: 'arms',
    shoulders: 'shoulders',
    back: 'back',
    legs: 'legs',
    abs: 'abs',
}
