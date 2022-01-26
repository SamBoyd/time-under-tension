import {v4 as uuidv4} from 'uuid';

export const PAGE = {
    workout: 'workout',
    pickExercise: 'pickExercise'
}


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
