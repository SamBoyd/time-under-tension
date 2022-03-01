import React from 'react'
import {useDispatch} from "react-redux";
import {moveToWorkout} from "../reducers/uiStateReducer";
import TemplateWorkouts from "../components/templateWorkouts";
import History from "../components/history";

function MainPage() {
    const dispatch = useDispatch()

    const newBlankWorkout = () => {
        dispatch(moveToWorkout())
    }
    return (
        <div>
            <button onClick={newBlankWorkout}>New blank workout</button>
            <TemplateWorkouts />
            <History />
        </div>
    )
}

export default MainPage;