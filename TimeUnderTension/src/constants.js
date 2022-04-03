import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

export const PAGE = {
    main: 'main',
    workout: 'workout',
    pickExercise: 'pickExercise',
    createTemplateWorkout: 'createTemplateWorkout',
    manageExercises: 'manageExercises',
    addExercise: 'addExercise'
}

export const TIMER_STATE = {
    ready: 'ready',
    setup: 'setup',
    work: 'work',
    rest: 'rest'
}

export const DEFAULT_SOUND_FILE = 'buzzer.mp3'

export const DEFAULT_SETUP_TIME = 2
export const DEFAULT_WORK_TIME_LOWER = 5
export const DEFAULT_WORK_TIME_UPPER = 15
export const DEFAULT_REST_TIME = 3


export const exerciseCategory = {
    chest: 'chest',
    arms: 'arms',
    shoulders: 'shoulders',
    back: 'back',
    legs: 'legs'
}

export const exercises = [
    {
        id: uuidv4(),
        name: 'Bench press',
        category: exerciseCategory.chest
    },
    {
        id: uuidv4(),
        name: 'Dumbbell Fly',
        category: exerciseCategory.chest
    },
    {
        id: uuidv4(),
        name: 'Incline bench press',
        category: exerciseCategory.chest
    },
    {
        id: uuidv4(),
        name: 'Machine press',
        category: exerciseCategory.chest
    },
    {
        id: uuidv4(),
        name: 'Cable bench press',
        category: exerciseCategory.chest
    },

    {
        id: uuidv4(),
        name: 'Leg press',
        category: exerciseCategory.legs
    },
    {
        id: uuidv4(),
        name: 'Back squat',
        category: exerciseCategory.legs
    },
    {
        id: uuidv4(),
        name: 'Front squat',
        category: exerciseCategory.legs
    },
    {
        id: uuidv4(),
        name: 'Leg curl',
        category: exerciseCategory.legs
    },
    {
        id: uuidv4(),
        name: 'Calf raise',
        category: exerciseCategory.legs
    },

    {
        id: uuidv4(),
        name: 'Military press',
        category: exerciseCategory.shoulders
    },
    {
        id: uuidv4(),
        name: 'Lateral raise',
        category: exerciseCategory.shoulders
    },
    {
        id: uuidv4(),
        name: 'Arnold press',
        category: exerciseCategory.shoulders
    },

    {
        id: uuidv4(),
        name: 'Barbell curl',
        category: exerciseCategory.arms
    },
    {
        id: uuidv4(),
        name: 'Tricep extension',
        category: exerciseCategory.arms
    },
    {
        id: uuidv4(),
        name: 'Dips',
        category: exerciseCategory.arms
    },

    {
        id: uuidv4(),
        name: 'Lat pulldown',
        category: exerciseCategory.back
    },
    {
        id: uuidv4(),
        name: 'Row',
        category: exerciseCategory.back
    },
    {
        id: uuidv4(),
        name: 'Pull up',
        category: exerciseCategory.back
    },
]
