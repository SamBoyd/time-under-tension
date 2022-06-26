import * as stateUtils from "../utils/stateUtils";
import {finishWorkoutAndCreateHistoryAction} from "./actions";
import {addWorkoutToHistory} from "./workoutHistoryReducer";
import tk from "timekeeper";
import {updateSetsOnWork} from "./workReducer";
import {removeSet} from "./setReducer";

jest.mock('../utils/stateUtils', () => ({
    loadWorkByIds: jest.fn(),
    loadSetsByIds: jest.fn()
}));


describe("finishWorkoutAndCreateHistoryAction", () => {
    it("should only save finished sets", () => {
        const dispatchMock = jest.fn()

        const workout = {
            name: "Test workout",
            id: "fa2de79b-85f7-4e85-a238-c9e6265cda2e",
            created_at: "2022-01-19T17:53:11.336Z",
            work: ["fa2de79b-85f7-4e85-a238-c9e6265cda2e"],
            finished_at: null
        }

        const work = [
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
            }
        ]

        const sets = [
            {
                id: "fa2de79b-85f7-4e85-a238-c9e6265cd222",
                numberReps: 12,
                weight: 40,
                workTime: 34,
                finished: true
            },
            {
                id: "fa2de79b-85f7-4e85-a238-c9e6265cd333",
                numberReps: 8,
                weight: 79,
                workTime: null,
                finished: false
            }
        ]

        const time = new Date(1330688329321);  // "2012-03-02T11:38:49.321Z"

        tk.freeze(time)

        jest.mock("../utils/stateUtils.js")

        stateUtils.loadWorkByIds.mockImplementationOnce(()=> work)
        stateUtils.loadSetsByIds.mockImplementationOnce(() => sets)

        finishWorkoutAndCreateHistoryAction(dispatchMock, workout)

        expect(dispatchMock).toHaveBeenCalledWith(addWorkoutToHistory({workout: {
                name: "Test workout",
                id: "fa2de79b-85f7-4e85-a238-c9e6265cda2e",
                created_at: "2022-01-19T17:53:11.336Z",
                work: ["fa2de79b-85f7-4e85-a238-c9e6265cda2e"],
                finished_at: "2012-03-02T11:38:49.321Z"
            }}))


        expect(dispatchMock).toHaveBeenCalledWith(updateSetsOnWork({
            workId: "fa2de79b-85f7-4e85-a238-c9e6265cda2e",
            sets: ["fa2de79b-85f7-4e85-a238-c9e6265cd222"]
        }))
        
        expect(dispatchMock).toHaveBeenCalledWith(removeSet("fa2de79b-85f7-4e85-a238-c9e6265cd333"))
    })


})