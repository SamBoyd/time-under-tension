import workoutReducer, {
    addSet,
    addWork,
    changeRestTime,
    changeSetReps,
    changeSetWeight,
    changeWorkTime,
    finishSet,
    moveWorkDown,
    moveWorkUp,
    removeSet,
    removeWork
} from "./workoutreducers";

describe('For Workout can', () => {
    test('test initial state', () => {
        const state = workoutReducer(undefined, {})
        expect(state).toEqual(
            {
                name: 'New workout',
                id: expect.any(String),
                created_at: expect.any(String),
                work: [],
                finished_at: null
            }
        )
    })

    test('test add work', () => {
        const previousState = {
            name: 'New workout',
            id: 'fa2de79b-85f7-4e85-a238-c9e6265cda2e',
            created_at: "2022-01-19T17:53:11.336Z",
            work: [],
            finished_at: null
        }

        const newState = workoutReducer(previousState, addWork())

        expect(newState).toEqual(
            {
                name: 'New workout',
                id: 'fa2de79b-85f7-4e85-a238-c9e6265cda2e',
                created_at: "2022-01-19T17:53:11.336Z",
                work: [
                    {
                        id: expect.any(String),
                        exercise: {type: 'bench_press', value: 'Bench Press'},
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
                ],
                finished_at: null
            }
        )
    })


    test('test remove work', () => {
        const previousState = {
            name: 'New workout',
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
            ],
            finished_at: null
        }

        const newState = workoutReducer(previousState, removeWork({index: 0}))

        expect(newState).toEqual(
            {
                name: 'New workout',
                id: 'fa2de79b-85f7-4e85-a238-c9e6265cda2e',
                created_at: "2022-01-19T17:53:11.336Z",
                work: [
                    {
                        id: 'bbbbbbb-85f7-4e85-a238-c9e6265cda2e',
                        exercise: {type: 'placeholder', value: 'Choose an exercise'},
                        sets: []
                    }
                ],
                finished_at: null
            }
        )
    })

    test('test move work', () => {
        const previousState = {
            name: 'New workout',
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
            ],
            finished_at: null
        }

        let newState = workoutReducer(previousState, moveWorkDown({index: 0}))

        expect(newState).toEqual(
            {
                name: 'New workout',
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
                ],
                finished_at: null
            }
        )

        newState = workoutReducer(newState, moveWorkUp({index: 2}))

        expect(newState).toEqual(
            {
                name: 'New workout',
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
                ],
                finished_at: null
            }
        )
    })
})

describe('For Work can', () => {
    test('can add a set', () => {
        const previousState = {
            name: 'New workout',
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
            ],
            finished_at: null
        }

        const newState = workoutReducer(previousState, addSet({
            workId: 'aaaaaaa-85f7-4e85-a238-c9e6265cda2e'
        }))

        expect(newState).toEqual(
            {
                name: 'New workout',
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
                ],
                finished_at: null
            }
        )
    })

    test('remove a set', () => {
        const previousState = {
            name: 'New workout',
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
            ],
            finished_at: null
        }

        const newState = workoutReducer(previousState, removeSet({
            setId: "41479206-10ed-4877-9466-d5c1f122b667",
            workId: 'aaaaaaa-85f7-4e85-a238-c9e6265cda2e'
        }))

        expect(newState).toEqual(
            {
                name: 'New workout',
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
                ],
                finished_at: null
            }
        )
    })

    test('change rest time', () => {
        const previousState = {
            name: 'New workout',
            id: 'fa2de79b-85f7-4e85-a238-c9e6265cda2e',
            created_at: "2022-01-19T17:53:11.336Z",
            work: [
                {
                    id: 'aaaaaaa-85f7-4e85-a238-c9e6265cda2e',
                    exercise: {type: 'placeholder', value: 'Choose an exercise'},
                    sets: []
                }
            ],
            finished_at: null
        }

        const newState = workoutReducer(previousState, changeRestTime({
            workId: 'aaaaaaa-85f7-4e85-a238-c9e6265cda2e',
            restTime: 35
        }))

        expect(newState).toEqual(
            {
                name: 'New workout',
                id: 'fa2de79b-85f7-4e85-a238-c9e6265cda2e',
                created_at: "2022-01-19T17:53:11.336Z",
                work: [
                    {
                        id: 'aaaaaaa-85f7-4e85-a238-c9e6265cda2e',
                        exercise: {type: 'placeholder', value: 'Choose an exercise'},
                        sets: [],
                        restTime: 35
                    }
                ],
                finished_at: null
            }
        )
    })

    test('change work time', () => {
        const previousState = {
            name: 'New workout',
            id: 'fa2de79b-85f7-4e85-a238-c9e6265cda2e',
            created_at: "2022-01-19T17:53:11.336Z",
            work: [
                {
                    id: 'aaaaaaa-85f7-4e85-a238-c9e6265cda2e',
                    exercise: {type: 'placeholder', value: 'Choose an exercise'},
                    sets: []
                }
            ],
            finished_at: null
        }

        const newState = workoutReducer(previousState, changeWorkTime({
            workId: 'aaaaaaa-85f7-4e85-a238-c9e6265cda2e',
            workTime: {start: 35, end: 60}
        }))

        expect(newState).toEqual(
            {
                name: 'New workout',
                id: 'fa2de79b-85f7-4e85-a238-c9e6265cda2e',
                created_at: "2022-01-19T17:53:11.336Z",
                work: [
                    {
                        id: 'aaaaaaa-85f7-4e85-a238-c9e6265cda2e',
                        exercise: {type: 'placeholder', value: 'Choose an exercise'},
                        sets: [],
                        workTime: {start: 35, end: 60}
                    }
                ],
                finished_at: null
            }
        )
    })
})

describe('For Set can', () => {
    test('change the number of reps', () => {
        const previousState = {
            name: 'New workout',
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
            ],
            finished_at: null
        }

        const newState = workoutReducer(previousState, changeSetReps({
            setId: '341de2a2-da16-462a-9fc4-266f7b542234',
            reps: 10
        }))

        expect(newState).toEqual(
            {
                name: 'New workout',
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
                ],
                finished_at: null
            }
        )
    })

    test('change the weight', () => {
        const previousState = {
            name: 'New workout',
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
            ],
            finished_at: null
        }

        const newState = workoutReducer(previousState, changeSetWeight({
            setId: '341de2a2-da16-462a-9fc4-266f7b542234',
            weight: 30
        }))

        expect(newState).toEqual(
            {
                name: 'New workout',
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
                ],
                finished_at: null
            }
        )
    })

    test('finish the set', () => {
        const previousState = {
            name: 'New workout',
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
            ],
            finished_at: null
        }

        const newState = workoutReducer(previousState, finishSet({
            setId: '341de2a2-da16-462a-9fc4-266f7b542234'
        }))

        expect(newState).toEqual(
            {
                name: 'New workout',
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
                                weight: 40,
                                workTime: null,
                                finished: true
                            },
                            {
                                id: "41479206-10ed-4877-9466-d5c1f122b667",
                                numberReps: 12,
                                weight: 40,
                                workTime: null
                            },
                        ]
                    }
                ],
                finished_at: null
            }
        )

        const newerState = workoutReducer(newState, finishSet({
            setId: '341de2a2-da16-462a-9fc4-266f7b542234'
        }))

        expect(newerState).toEqual(
            {
                name: 'New workout',
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
                                weight: 40,
                                workTime: null,
                                finished: false
                            },
                            {
                                id: "41479206-10ed-4877-9466-d5c1f122b667",
                                numberReps: 12,
                                weight: 40,
                                workTime: null
                            },
                        ]
                    }
                ],
                finished_at: null
            }
        )
    })
})