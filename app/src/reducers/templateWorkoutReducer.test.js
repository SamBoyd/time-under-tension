import {v4 as uuidv4} from 'uuid';

import workoutReducer, {
    addSet,
    addWork, cancelEditTemplate,
    changeRestTime,
    changeSetReps,
    changeSetWeight,
    changeWorkTime,
    editTemplate, editTemplateName,
    moveWorkDown,
    moveWorkUp,
    removeSet,
    removeWork,
    renameTemplate,
    saveTemplate
} from "./templateWorkoutReducer";
import {exerciseCategory} from "../constants";

describe('When creating a template workout can', () => {
    test('test initial state', () => {
        const state = workoutReducer(undefined, {})
        expect(state).toEqual(
            {
                newTemplate: {
                    name: 'New template workout',
                    id: expect.any(String),
                    created_at: expect.any(String),
                    work: []
                },
                templates: []
            }
        )
    })

    test('save template workout', () => {
        const previousState = {
            newTemplate: {
                name: 'Someday workout',
                id: 'fa2de79b-85f7-4e85-a238-c9e6265cda2e',
                created_at: "2022-01-19T17:53:11.336Z",
                work: [
                    {
                        id: 'fa2de79b-85f7-4e85-a238-c9e6265cd111',
                        exercise: "Press up",
                        sets: [
                            {
                                id: 'fa2de79b-85f7-4e85-a238-c9e6265cd222',
                                numberReps: 3,
                                weight: 4,
                                workTime: 50
                            }
                        ]
                    }
                ]
            },
            templates: []
        }

        const newState = workoutReducer(previousState, saveTemplate())

        expect(newState).toEqual({
            newTemplate: {
                name: 'New template workout',
                id: expect.any(String),
                created_at: expect.any(String),
                work: []
            },
            templates: [
                {
                    name: 'Someday workout',
                    id: 'fa2de79b-85f7-4e85-a238-c9e6265cda2e',
                    created_at: "2022-01-19T17:53:11.336Z",
                    work: [
                        {
                            id: 'fa2de79b-85f7-4e85-a238-c9e6265cd111',
                            exercise: "Press up",
                            sets: [
                                {
                                    id: 'fa2de79b-85f7-4e85-a238-c9e6265cd222',
                                    numberReps: 3,
                                    weight: 4,
                                    workTime: 50
                                }
                            ]
                        }
                    ]
                }
            ]
        })
    })

    test('can set name of template workout', () => {
        const previousState = {
            newTemplate: {
                name: 'Someday workout',
                id: 'fa2de79b-85f7-4e85-a238-c9e6265cda2e',
                created_at: "2022-01-19T17:53:11.336Z",
                work: []
            },
            templates: []
        }

        const newState = workoutReducer(previousState, renameTemplate({name: 'Monday workout'}))

        expect(newState).toEqual(
            {
                newTemplate: {
                    name: 'Monday workout',
                    id: 'fa2de79b-85f7-4e85-a238-c9e6265cda2e',
                    created_at: "2022-01-19T17:53:11.336Z",
                    work: []
                },
                templates: []
            }
        )

    })

    test('edit template workout', () => {
        const previousState = {
            newTemplate: {
                name: 'New template workout',
                id: expect.any(String),
                created_at: expect.any(String),
                work: []
            },
            templates: [
                {
                    name: 'Someday workout',
                    id: 'fa2de79b-85f7-4e85-a238-c9e6265cda2e',
                    created_at: "2022-01-19T17:53:11.336Z",
                    work: [
                        {
                            id: 'fa2de79b-85f7-4e85-a238-c9e6265cd111',
                            exercise: "Press up",
                            sets: [
                                {
                                    id: 'fa2de79b-85f7-4e85-a238-c9e6265cd222',
                                    numberReps: 3,
                                    weight: 4,
                                    workTime: 50
                                }
                            ]
                        }
                    ]
                },
                {
                    name: 'Someday workout',
                    id: 'fa2de79b-85f7-4e85-a238-c9e6265cd123',
                    created_at: "2022-01-19T17:53:11.336Z",
                    work: [
                        {
                            id: 'fa2de79b-85f7-4e85-a238-c9e6265cd444',
                            exercise: "Press up",
                            sets: [
                                {
                                    id: 'fa2de79b-85f7-4e85-a238-c9e6265cd555',
                                    numberReps: 3,
                                    weight: 4,
                                    workTime: 50
                                }
                            ]
                        }
                    ]
                },
            ]
        }

        const editState = workoutReducer(previousState, editTemplate({id: 'fa2de79b-85f7-4e85-a238-c9e6265cd123'}))

        expect(editState).toEqual(
            {
                newTemplate: {
                    name: 'Someday workout',
                    id: 'fa2de79b-85f7-4e85-a238-c9e6265cd123',
                    indexInTemplates: 1,
                    created_at: "2022-01-19T17:53:11.336Z",
                    work: [
                        {
                            id: 'fa2de79b-85f7-4e85-a238-c9e6265cd444',
                            exercise: "Press up",
                            sets: [
                                {
                                    id: 'fa2de79b-85f7-4e85-a238-c9e6265cd555',
                                    numberReps: 3,
                                    weight: 4,
                                    workTime: 50
                                }
                            ]
                        }
                    ]
                },
                templates: [
                    {
                        name: 'Someday workout',
                        id: 'fa2de79b-85f7-4e85-a238-c9e6265cda2e',
                        created_at: "2022-01-19T17:53:11.336Z",
                        work: [
                            {
                                id: 'fa2de79b-85f7-4e85-a238-c9e6265cd111',
                                exercise: "Press up",
                                sets: [
                                    {
                                        id: 'fa2de79b-85f7-4e85-a238-c9e6265cd222',
                                        numberReps: 3,
                                        weight: 4,
                                        workTime: 50
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: 'Someday workout',
                        id: 'fa2de79b-85f7-4e85-a238-c9e6265cd123',
                        created_at: "2022-01-19T17:53:11.336Z",
                        work: [
                            {
                                id: 'fa2de79b-85f7-4e85-a238-c9e6265cd444',
                                exercise: "Press up",
                                sets: [
                                    {
                                        id: 'fa2de79b-85f7-4e85-a238-c9e6265cd555',
                                        numberReps: 3,
                                        weight: 4,
                                        workTime: 50
                                    }
                                ]
                            }
                        ]
                    },
                ]
            }
        )

        const withEditsState = {
            newTemplate: {
                name: 'Someday workout',
                id: 'fa2de79b-85f7-4e85-a238-c9e6265cd123',
                indexInTemplates: 1,
                created_at: "2022-01-19T17:53:11.336Z",
                work: [
                    {
                        id: 'fa2de79b-85f7-4e85-a238-c9e6265cd444',
                        exercise: "Press up",
                        sets: [
                            {
                                id: 'fa2de79b-85f7-4e85-a238-c9e6265cd555',
                                numberReps: 3,
                                weight: 49,
                                workTime: 50
                            }
                        ]
                    },
                    {
                        id: 'fa2de79b-85f7-4e85-a238-c9e6265cd444',
                        exercise: "Press up",
                        sets: [
                            {
                                id: 'fa2de79b-85f7-4e85-a238-c9e6265cd987',
                                numberReps: 3,
                                weight: 4,
                                workTime: 50
                            }
                        ]
                    }
                ]
            },
            templates: [
                {
                    name: 'Someday workout',
                    id: 'fa2de79b-85f7-4e85-a238-c9e6265cda2e',
                    created_at: "2022-01-19T17:53:11.336Z",
                    work: [
                        {
                            id: 'fa2de79b-85f7-4e85-a238-c9e6265cd111',
                            exercise: "Press up",
                            sets: [
                                {
                                    id: 'fa2de79b-85f7-4e85-a238-c9e6265cd222',
                                    numberReps: 3,
                                    weight: 4,
                                    workTime: 50
                                }
                            ]
                        }
                    ]
                },
                {
                    name: 'Someday workout',
                    id: 'fa2de79b-85f7-4e85-a238-c9e6265cd123',
                    created_at: "2022-01-19T17:53:11.336Z",
                    work: [
                        {
                            id: 'fa2de79b-85f7-4e85-a238-c9e6265cd444',
                            exercise: "Press up",
                            sets: [
                                {
                                    id: 'fa2de79b-85f7-4e85-a238-c9e6265cd555',
                                    numberReps: 3,
                                    weight: 4,
                                    workTime: 50
                                }
                            ]
                        }
                    ]
                },
            ]
        }


        const savedState = workoutReducer(withEditsState, saveTemplate())

        expect(savedState).toEqual(
            {
                newTemplate: {
                    name: 'New template workout',
                    id: expect.any(String),
                    created_at: expect.any(String),
                    work: []
                },
                templates: [
                    {
                        name: 'Someday workout',
                        id: 'fa2de79b-85f7-4e85-a238-c9e6265cda2e',
                        created_at: "2022-01-19T17:53:11.336Z",
                        work: [
                            {
                                id: 'fa2de79b-85f7-4e85-a238-c9e6265cd111',
                                exercise: "Press up",
                                sets: [
                                    {
                                        id: 'fa2de79b-85f7-4e85-a238-c9e6265cd222',
                                        numberReps: 3,
                                        weight: 4,
                                        workTime: 50
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: 'Someday workout',
                        id: 'fa2de79b-85f7-4e85-a238-c9e6265cd123',
                        created_at: "2022-01-19T17:53:11.336Z",
                        work: [
                            {
                                id: 'fa2de79b-85f7-4e85-a238-c9e6265cd444',
                                exercise: "Press up",
                                sets: [
                                    {
                                        id: 'fa2de79b-85f7-4e85-a238-c9e6265cd555',
                                        numberReps: 3,
                                        weight: 49,
                                        workTime: 50
                                    }
                                ]
                            },
                            {
                                id: 'fa2de79b-85f7-4e85-a238-c9e6265cd444',
                                exercise: "Press up",
                                sets: [
                                    {
                                        id: 'fa2de79b-85f7-4e85-a238-c9e6265cd987',
                                        numberReps: 3,
                                        weight: 4,
                                        workTime: 50
                                    }
                                ]
                            }
                        ]
                    },
                ]
            }
        )
    })

    test('can cancel editing template', () => {
        const withEditsState = {
            newTemplate: {
                name: 'Monday workout',
                id: 'fa2de79b-85f7-4e85-a238-c9e6265cd123',
                indexInTemplates: 1,
                created_at: "2022-01-19T17:53:11.336Z",
                work: []
            },
            templates: [
                {
                    name: 'Someday workout',
                    id: 'fa2de79b-85f7-4e85-a238-c9e6265cd123',
                    indexInTemplates: 1,
                    created_at: "2022-01-19T17:53:11.336Z",
                    work: []
                }
            ]
        }

        const newState = workoutReducer(withEditsState, cancelEditTemplate())

        expect(newState).toEqual(
            {
                newTemplate: {
                    name: 'New template workout',
                    id: expect.any(String),
                    created_at: expect.any(String),
                    work: []
                },
                templates: [
                    {
                        name: 'Someday workout',
                        id: 'fa2de79b-85f7-4e85-a238-c9e6265cd123',
                        indexInTemplates: 1,
                        created_at: "2022-01-19T17:53:11.336Z",
                        work: []
                    }
                ]
            }
        )
    })

    test('can cancel edit template name', () => {
        const previousState = {
            newTemplate: {
                name: 'Monday workout',
                id: 'fa2de79b-85f7-4e85-a238-c9e6265cd123',
            }
        }

        const newState = workoutReducer(previousState, editTemplateName({
            name: 'Tuesday workout'
        }))

        expect(newState).toEqual(
            {
                newTemplate: {
                    name: 'Tuesday workout',
                    id: 'fa2de79b-85f7-4e85-a238-c9e6265cd123',
                }
            }
        )
    })

    test('test add work', () => {
        const previousState = {
            newTemplate: {
                name: 'New template workout',
                id: 'fa2de79b-85f7-4e85-a238-c9e6265cda2e',
                created_at: "2022-01-19T17:53:11.336Z",
                work: []
            },
        }

        const exercise = {
            id: uuidv4(),
            name: 'Bench press',
            category: exerciseCategory.chest
        }

        const newState = workoutReducer(previousState, addWork({exercise: exercise}))

        expect(newState).toEqual(
            {
                newTemplate: {
                    name: 'New template workout',
                    id: 'fa2de79b-85f7-4e85-a238-c9e6265cda2e',
                    created_at: "2022-01-19T17:53:11.336Z",
                    work: [
                        {
                            id: expect.any(String),
                            exercise: {
                                id: expect.any(String),
                                name: 'Bench press',
                                category: exerciseCategory.chest
                            },
                            sets: [
                                {
                                    id: expect.any(String),
                                    numberReps: 12,
                                    weight: 40,
                                    workTime: null
                                },
                                {
                                    id: expect.any(String),
                                    numberReps: 12,
                                    weight: 40,
                                    workTime: null
                                },
                                {
                                    id: expect.any(String),
                                    numberReps: 12,
                                    weight: 40,
                                    workTime: null
                                }
                            ]
                        }
                    ]
                }
            }
        )
    })


    test('test remove work', () => {
        const previousState = {
            newTemplate: {
                name: 'New template workout',
                id: 'fa2de79b-85f7-4e85-a238-c9e6265cda2e',
                created_at: "2022-01-19T17:53:11.336Z",
                work: [
                    {
                        id: 'aaaaaaa-85f7-4e85-a238-c9e6265cda2e',
                        exercise: {type: 'placeholder', value: 'Choose an exercise'},
                        sets: []
                    },
                    {
                        id: 'bbbbbbb-85f7-4e85-a238-c9e6265cda2e',
                        exercise: {type: 'placeholder', value: 'Choose an exercise'},
                        sets: []
                    }
                ]
            }
        }

        const newState = workoutReducer(previousState, removeWork({index: 0}))

        expect(newState).toEqual(
            {
                newTemplate: {
                    name: 'New template workout',
                    id: 'fa2de79b-85f7-4e85-a238-c9e6265cda2e',
                    created_at: "2022-01-19T17:53:11.336Z",
                    work: [
                        {
                            id: 'bbbbbbb-85f7-4e85-a238-c9e6265cda2e',
                            exercise: {type: 'placeholder', value: 'Choose an exercise'},
                            sets: []
                        }
                    ]
                }
            }
        )
    })

    test('test move work', () => {
        const previousState = {
            newTemplate: {
                name: 'New template workout',
                id: 'fa2de79b-85f7-4e85-a238-c9e6265cda2e',
                created_at: "2022-01-19T17:53:11.336Z",
                work: [
                    {
                        id: 'aaaaaaa-85f7-4e85-a238-c9e6265cda2e',
                        exercise: {type: 'placeholder', value: 'Choose an exercise'},
                        sets: []
                    },
                    {
                        id: 'bbbbbbb-85f7-4e85-a238-c9e6265cda2e',
                        exercise: {type: 'placeholder', value: 'Choose an exercise'},
                        sets: []
                    },
                    {
                        id: 'ccccccc-85f7-4e85-a238-c9e6265cda2e',
                        exercise: {type: 'placeholder', value: 'Choose an exercise'},
                        sets: []
                    }
                ]
            }
        }

        let newState = workoutReducer(previousState, moveWorkDown({index: 0}))

        expect(newState).toEqual(
            {
                newTemplate: {
                    name: 'New template workout',
                    id: 'fa2de79b-85f7-4e85-a238-c9e6265cda2e',
                    created_at: "2022-01-19T17:53:11.336Z",
                    work: [
                        {
                            id: 'bbbbbbb-85f7-4e85-a238-c9e6265cda2e',
                            exercise: {type: 'placeholder', value: 'Choose an exercise'},
                            sets: []
                        },
                        {
                            id: 'aaaaaaa-85f7-4e85-a238-c9e6265cda2e',
                            exercise: {type: 'placeholder', value: 'Choose an exercise'},
                            sets: []
                        },
                        {
                            id: 'ccccccc-85f7-4e85-a238-c9e6265cda2e',
                            exercise: {type: 'placeholder', value: 'Choose an exercise'},
                            sets: []
                        }
                    ]
                }
            }
        )

        newState = workoutReducer(newState, moveWorkUp({index: 2}))

        expect(newState).toEqual(
            {
                newTemplate: {
                    name: 'New template workout',
                    id: 'fa2de79b-85f7-4e85-a238-c9e6265cda2e',
                    created_at: "2022-01-19T17:53:11.336Z",
                    work: [
                        {
                            id: 'bbbbbbb-85f7-4e85-a238-c9e6265cda2e',
                            exercise: {type: 'placeholder', value: 'Choose an exercise'},
                            sets: []
                        },
                        {
                            id: 'ccccccc-85f7-4e85-a238-c9e6265cda2e',
                            exercise: {type: 'placeholder', value: 'Choose an exercise'},
                            sets: []
                        },
                        {
                            id: 'aaaaaaa-85f7-4e85-a238-c9e6265cda2e',
                            exercise: {type: 'placeholder', value: 'Choose an exercise'},
                            sets: []
                        }
                    ]
                }
            }
        )
    })
})

describe('For Work can', () => {
    test('can add a set', () => {
        const previousState = {
            newTemplate: {
                name: 'New template workout',
                id: 'fa2de79b-85f7-4e85-a238-c9e6265cda2e',
                created_at: "2022-01-19T17:53:11.336Z",
                work: [
                    {
                        id: 'aaaaaaa-85f7-4e85-a238-c9e6265cda2e',
                        exercise: {type: 'placeholder', value: 'Choose an exercise'},
                        sets: [
                            {id: "341de2a2-da16-462a-9fc4-266f7b542234"},
                            {id: "41479206-10ed-4877-9466-d5c1f122b667"},
                        ]
                    }
                ]
            }
        }

        const newState = workoutReducer(previousState, addSet({
            workId: 'aaaaaaa-85f7-4e85-a238-c9e6265cda2e'
        }))

        expect(newState).toEqual(
            {
                newTemplate: {
                    name: 'New template workout',
                    id: expect.any(String),
                    created_at: expect.any(String),
                    work: [
                        {
                            id: 'aaaaaaa-85f7-4e85-a238-c9e6265cda2e',
                            exercise: {type: 'placeholder', value: 'Choose an exercise'},
                            sets: [
                                {id: "341de2a2-da16-462a-9fc4-266f7b542234"},
                                {id: "41479206-10ed-4877-9466-d5c1f122b667"},
                                {
                                    id: expect.any(String),
                                    numberReps: 12,
                                    weight: 40,
                                    workTime: null
                                }

                            ]
                        }
                    ]
                }
            }
        )
    })

    test('remove a set', () => {
        const previousState = {
            newTemplate: {
                name: 'New template workout',
                id: 'fa2de79b-85f7-4e85-a238-c9e6265cda2e',
                created_at: "2022-01-19T17:53:11.336Z",
                work: [
                    {
                        id: 'aaaaaaa-85f7-4e85-a238-c9e6265cda2e',
                        exercise: {type: 'placeholder', value: 'Choose an exercise'},
                        sets: [
                            {id: "341de2a2-da16-462a-9fc4-266f7b542234"},
                            {id: "41479206-10ed-4877-9466-d5c1f122b667"},
                            {id: "cc511608-72c6-451c-8f86-eea8bdb55fc4"},
                        ]
                    }
                ]
            }
        }

        const newState = workoutReducer(previousState, removeSet({
            setId: "41479206-10ed-4877-9466-d5c1f122b667",
            workId: 'aaaaaaa-85f7-4e85-a238-c9e6265cda2e'
        }))

        expect(newState).toEqual(
            {
                newTemplate: {
                    name: 'New template workout',
                    id: expect.any(String),
                    created_at: expect.any(String),
                    work: [
                        {
                            id: 'aaaaaaa-85f7-4e85-a238-c9e6265cda2e',
                            exercise: {type: 'placeholder', value: 'Choose an exercise'},
                            sets: [
                                {id: "341de2a2-da16-462a-9fc4-266f7b542234"},
                                {id: "cc511608-72c6-451c-8f86-eea8bdb55fc4"},
                            ]
                        }
                    ]
                }
            }
        )
    })

    test('change rest time', () => {
        const previousState = {
            newTemplate: {
                name: 'New template workout',
                id: 'fa2de79b-85f7-4e85-a238-c9e6265cda2e',
                created_at: "2022-01-19T17:53:11.336Z",
                work: [
                    {
                        id: 'aaaaaaa-85f7-4e85-a238-c9e6265cda2e',
                        exercise: {type: 'placeholder', value: 'Choose an exercise'},
                        sets: []
                    }
                ]
            }
        }

        const newState = workoutReducer(previousState, changeRestTime({
            workId: 'aaaaaaa-85f7-4e85-a238-c9e6265cda2e',
            restTime: 35
        }))

        expect(newState).toEqual(
            {
                newTemplate: {
                    name: 'New template workout',
                    id: 'fa2de79b-85f7-4e85-a238-c9e6265cda2e',
                    created_at: "2022-01-19T17:53:11.336Z",
                    work: [
                        {
                            id: 'aaaaaaa-85f7-4e85-a238-c9e6265cda2e',
                            exercise: {type: 'placeholder', value: 'Choose an exercise'},
                            sets: [],
                            restTime: 35
                        }
                    ]
                }
            }
        )
    })

    test('change work time', () => {
        const previousState = {
            newTemplate: {
                name: 'New template workout',
                id: 'fa2de79b-85f7-4e85-a238-c9e6265cda2e',
                created_at: "2022-01-19T17:53:11.336Z",
                work: [
                    {
                        id: 'aaaaaaa-85f7-4e85-a238-c9e6265cda2e',
                        exercise: {type: 'placeholder', value: 'Choose an exercise'},
                        sets: []
                    }
                ]
            }
        }

        const newState = workoutReducer(previousState, changeWorkTime({
            workId: 'aaaaaaa-85f7-4e85-a238-c9e6265cda2e',
            workTime: {start: 35, end: 60}
        }))

        expect(newState).toEqual(
            {
                newTemplate: {
                    name: 'New template workout',
                    id: 'fa2de79b-85f7-4e85-a238-c9e6265cda2e',
                    created_at: "2022-01-19T17:53:11.336Z",
                    work: [
                        {
                            id: 'aaaaaaa-85f7-4e85-a238-c9e6265cda2e',
                            exercise: {type: 'placeholder', value: 'Choose an exercise'},
                            sets: [],
                            workTime: {start: 35, end: 60}
                        }
                    ]
                }
            }
        )
    })
})

describe('For Set can', () => {
    test('change the number of reps', () => {
        const previousState = {
            newTemplate: {
                name: 'New template workout',
                id: 'fa2de79b-85f7-4e85-a238-c9e6265cda2e',
                created_at: "2022-01-19T17:53:11.336Z",
                work: [
                    {
                        id: 'aaaaaaa-85f7-4e85-a238-c9e6265cda2e',
                        exercise: {type: 'placeholder', value: 'Choose an exercise'},
                        sets: [
                            {
                                id: "341de2a2-da16-462a-9fc4-266f7b542234",
                                numberReps: 12,
                                weight: 40,
                                workTime: null
                            },
                            {
                                id: "41479206-10ed-4877-9466-d5c1f122b667",
                                numberReps: 12,
                                weight: 40,
                                workTime: null
                            },
                        ]
                    }
                ]
            }
        }

        const newState = workoutReducer(previousState, changeSetReps({
            setId: '341de2a2-da16-462a-9fc4-266f7b542234',
            reps: 10
        }))

        expect(newState).toEqual(
            {
                newTemplate: {
                    name: 'New template workout',
                    id: 'fa2de79b-85f7-4e85-a238-c9e6265cda2e',
                    created_at: "2022-01-19T17:53:11.336Z",
                    work: [
                        {
                            id: 'aaaaaaa-85f7-4e85-a238-c9e6265cda2e',
                            exercise: {type: 'placeholder', value: 'Choose an exercise'},
                            sets: [
                                {
                                    id: "341de2a2-da16-462a-9fc4-266f7b542234",
                                    numberReps: 10,
                                    weight: 40,
                                    workTime: null
                                },
                                {
                                    id: "41479206-10ed-4877-9466-d5c1f122b667",
                                    numberReps: 12,
                                    weight: 40,
                                    workTime: null
                                },
                            ]
                        }
                    ]
                }
            }
        )
    })

    test('change the weight', () => {
        const previousState = {
            newTemplate: {
                name: 'New template workout',
                id: 'fa2de79b-85f7-4e85-a238-c9e6265cda2e',
                created_at: "2022-01-19T17:53:11.336Z",
                work: [
                    {
                        id: 'aaaaaaa-85f7-4e85-a238-c9e6265cda2e',
                        exercise: {type: 'placeholder', value: 'Choose an exercise'},
                        sets: [
                            {
                                id: "341de2a2-da16-462a-9fc4-266f7b542234",
                                numberReps: 12,
                                weight: 40,
                                workTime: null
                            },
                            {
                                id: "41479206-10ed-4877-9466-d5c1f122b667",
                                numberReps: 12,
                                weight: 40,
                                workTime: null
                            },
                        ]
                    }
                ]
            }
        }

        const newState = workoutReducer(previousState, changeSetWeight({
            setId: '341de2a2-da16-462a-9fc4-266f7b542234',
            weight: 30
        }))

        expect(newState).toEqual(
            {
                newTemplate: {
                    name: 'New template workout',
                    id: expect.any(String),
                    created_at: expect.any(String),
                    work: [
                        {
                            id: 'aaaaaaa-85f7-4e85-a238-c9e6265cda2e',
                            exercise: {type: 'placeholder', value: 'Choose an exercise'},
                            sets: [
                                {
                                    id: "341de2a2-da16-462a-9fc4-266f7b542234",
                                    numberReps: 12,
                                    weight: 30,
                                    workTime: null
                                },
                                {
                                    id: "41479206-10ed-4877-9466-d5c1f122b667",
                                    numberReps: 12,
                                    weight: 40,
                                    workTime: null
                                },
                            ]
                        }
                    ]
                }
            }
        )
    })
})