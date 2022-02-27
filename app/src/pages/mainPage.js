import React from 'react'
import {useDispatch} from "react-redux";
import {moveToWorkout} from "../reducers/uiStateReducer";
import TemplateWorkouts from "../components/templateWorkouts";

function MainPage() {
    const dispatch = useDispatch()

    const newBlankWorkout = () => {
        dispatch(moveToWorkout())
    }
    return (
        <div>
            <button onClick={newBlankWorkout}>New blank workout</button>
            <TemplateWorkouts />
        </div>
    )
}

export default MainPage;