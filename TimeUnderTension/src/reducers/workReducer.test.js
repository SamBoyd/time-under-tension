import workReducer, {
    addSetToWork, newWorkForExercise,
    removeWork,
    updateRestOnWork,
    updateSetsOnWork,
    updateWorkTimeOnWork
} from "./workReducer";
import {v4 as uuidv4} from "uuid";
import {addWork} from "./workReducer";

describe("Work reducer can", () => {
    test('initialise state', () => {
        const initialState = workReducer(undefined, {})

        expect(initialState).toEqual([])
    })

    test('get new work object for exercise', () => {
        const newWork = newWorkForExercise('exercise')

        expect(newWork).toEqual(
            {
                id: expect.any(String),
                exercise: 'exercise',
                sets: [],
                restTime: null,
                workTimeStart: null,
                workTimeEnd: null,
                finished: false,
            }
        )
    })

    test('add work', () => {
        const previousState = [
            {
                id: uuidv4(),
                exercise: uuidv4(),
                sets: [
                    uuidv4(),
                    uuidv4(),
                ],
            },
        ]

        const nextState = workReducer(previousState, addWork({
            id: "fa2de79b-85f7-4e85-a238-c9e6265cda2e",
            exercise: "fa2de79b-85f7-4e85-a238-c9e6265cd111",
            sets: [
                "fa2de79b-85f7-4e85-a238-c9e6265cd222",
                "fa2de79b-85f7-4e85-a238-c9e6265cd333",
            ],
            restTime: 90,
            workTimeStart: 30,
            workTimeEnd: 45,
            finished: false,
        }))

        expect(nextState).toEqual(
            [
                {
                    id: expect.any(String),
                    exercise: expect.any(String),
                    sets: [
                        expect.any(String),
                        expect.any(String),
                    ],
                },
                {
                    id: "fa2de79b-85f7-4e85-a238-c9e6265cda2e",
                    exercise: "fa2de79b-85f7-4e85-a238-c9e6265cd111",
                    sets: [
                        "fa2de79b-85f7-4e85-a238-c9e6265cd222",
                        "fa2de79b-85f7-4e85-a238-c9e6265cd333",
                    ],
                    restTime: 90,
                    workTimeStart: 30,
                    workTimeEnd: 45,
                    finished: false,
                },
            ]
        )
    })

    test('remove work', () => {
        const previousState = [
            {
                id: "fa2de79b-85f7-4e85-a238-c9e6265cda2e",
                exercise: "fa2de79b-85f7-4e85-a238-c9e6265cd111",
                sets: [
                    "fa2de79b-85f7-4e85-a238-c9e6265cd222",
                    "fa2de79b-85f7-4e85-a238-c9e6265cd333",
                ],
            },
            {
                id: 'id-11111',
                exercise: uuidv4(),
                sets: [
                    uuidv4(),
                    uuidv4(),
                ],
            },
        ]

        const nextState = workReducer(previousState, removeWork("fa2de79b-85f7-4e85-a238-c9e6265cda2e"))

        expect(nextState).toEqual(
            [
                {
                    id: 'id-11111',
                    exercise: expect.any(String),
                    sets: [
                        expect.any(String),
                        expect.any(String),
                    ],
                },
            ]
        )
    })

    test('add set to work', () => {
        const previousState = [
            {
                id: "fa2de79b-85f7-4e85-a238-c9e6265cda2e",
                exercise: "fa2de79b-85f7-4e85-a238-c9e6265cd111",
                sets: [
                    "fa2de79b-85f7-4e85-a238-c9e6265cd222",
                    "fa2de79b-85f7-4e85-a238-c9e6265cd333",
                ],
            },
            {
                id: 'workId-11111',
                exercise: uuidv4(),
                sets: [
                    uuidv4(),
                    uuidv4(),
                ],
            },
        ]

        const nextState = workReducer(previousState, addSetToWork({workId: "workId-11111", setId: "set-id-1111"}))

        expect(nextState).toEqual([
                {
                    id: "fa2de79b-85f7-4e85-a238-c9e6265cda2e",
                    exercise: "fa2de79b-85f7-4e85-a238-c9e6265cd111",
                    sets: [
                        "fa2de79b-85f7-4e85-a238-c9e6265cd222",
                        "fa2de79b-85f7-4e85-a238-c9e6265cd333",
                    ],
                },
                {
                    id: 'workId-11111',
                    exercise: expect.any(String),
                    sets: [
                        expect.any(String),
                        expect.any(String),
                        "set-id-1111",
                    ],
                },
            ]
        )
    })

    test('update sets on work', () => {
        const previousState = [
            {
                id: "fa2de79b-85f7-4e85-a238-c9e6265cda2e",
                exercise: "fa2de79b-85f7-4e85-a238-c9e6265cd111",
                sets: [
                    "fa2de79b-85f7-4e85-a238-c9e6265cd222",
                    "fa2de79b-85f7-4e85-a238-c9e6265cd333",
                ],
            },
            {
                id: 'workId-11111',
                exercise: uuidv4(),
                sets: [
                    "fa2de79b-85f7-4e85-a238-c9e6265cd444",
                    "fa2de79b-85f7-4e85-a238-c9e6265cd555",
                ],
            },
        ]

        const nextState = workReducer(previousState, updateSetsOnWork({
            workId: "workId-11111",
            sets: [
                "fa2de79b-85f7-4e85-a238-c9e6265cd444",
                "fa2de79b-85f7-4e85-a238-c9e6265cd666",
                "fa2de79b-85f7-4e85-a238-c9e6265cd777",
                "fa2de79b-85f7-4e85-a238-c9e6265cd888",
            ]
        }))

        expect(nextState).toEqual([
                {
                    id: "fa2de79b-85f7-4e85-a238-c9e6265cda2e",
                    exercise: "fa2de79b-85f7-4e85-a238-c9e6265cd111",
                    sets: [
                        "fa2de79b-85f7-4e85-a238-c9e6265cd222",
                        "fa2de79b-85f7-4e85-a238-c9e6265cd333",
                    ],
                },
                {
                    id: 'workId-11111',
                    exercise: expect.any(String),
                    sets: [
                        "fa2de79b-85f7-4e85-a238-c9e6265cd444",
                        "fa2de79b-85f7-4e85-a238-c9e6265cd666",
                        "fa2de79b-85f7-4e85-a238-c9e6265cd777",
                        "fa2de79b-85f7-4e85-a238-c9e6265cd888",
                    ]
                },
            ]
        )
    })

    test('update work time', () => {
        const previousState = [
            {
                id: "fa2de79b-85f7-4e85-a238-c9e6265cda2e",
                exercise: "fa2de79b-85f7-4e85-a238-c9e6265cd111",
                sets: [
                    "fa2de79b-85f7-4e85-a238-c9e6265cd222",
                    "fa2de79b-85f7-4e85-a238-c9e6265cd333",
                ],
                workRestTime: 90,
                workTimeStart: 30,
                workTimeEnd: 45,
            },
            {
                id: 'workId-11111',
                exercise: uuidv4(),
                sets: [
                    "fa2de79b-85f7-4e85-a238-c9e6265cd444",
                    "fa2de79b-85f7-4e85-a238-c9e6265cd555",
                ],
            },
        ]

        const nextState = workReducer(previousState, updateWorkTimeOnWork({
            workId: "workId-11111",
            workTimeStart: 45,
            workTimeEnd: 60
        }))

        expect(nextState).toEqual([
                {
                    id: "fa2de79b-85f7-4e85-a238-c9e6265cda2e",
                    exercise: "fa2de79b-85f7-4e85-a238-c9e6265cd111",
                    sets: [
                        "fa2de79b-85f7-4e85-a238-c9e6265cd222",
                        "fa2de79b-85f7-4e85-a238-c9e6265cd333",
                    ],
                    workRestTime: 90,
                    workTimeStart: 30,
                    workTimeEnd: 45,
                },
                {
                    id: 'workId-11111',
                    exercise: expect.any(String),
                    sets: [
                        "fa2de79b-85f7-4e85-a238-c9e6265cd444",
                        "fa2de79b-85f7-4e85-a238-c9e6265cd555",
                    ],
                    workTimeStart: 45,
                    workTimeEnd: 60
                },
            ]
        )
    })

    test('update rest time', () => {
        const previousState = [
            {
                id: "fa2de79b-85f7-4e85-a238-c9e6265cda2e",
                exercise: "fa2de79b-85f7-4e85-a238-c9e6265cd111",
                sets: [
                    "fa2de79b-85f7-4e85-a238-c9e6265cd222",
                    "fa2de79b-85f7-4e85-a238-c9e6265cd333",
                ],
                restTime: 190,
            },
            {
                id: 'workId-11111',
                exercise: uuidv4(),
                sets: [
                    "fa2de79b-85f7-4e85-a238-c9e6265cd444",
                    "fa2de79b-85f7-4e85-a238-c9e6265cd555",
                ],
            },
        ]

        const nextState = workReducer(previousState, updateRestOnWork({
            workId: "workId-11111",
            restTime: 90
        }))

        expect(nextState).toEqual([
                {
                    id: "fa2de79b-85f7-4e85-a238-c9e6265cda2e",
                    exercise: "fa2de79b-85f7-4e85-a238-c9e6265cd111",
                    sets: [
                        "fa2de79b-85f7-4e85-a238-c9e6265cd222",
                        "fa2de79b-85f7-4e85-a238-c9e6265cd333",
                    ],
                    restTime: 190,
                },
                {
                    id: 'workId-11111',
                    exercise: expect.any(String),
                    sets: [
                        "fa2de79b-85f7-4e85-a238-c9e6265cd444",
                        "fa2de79b-85f7-4e85-a238-c9e6265cd555",
                    ],
                    restTime: 90
                },
            ]
        )
    })
})