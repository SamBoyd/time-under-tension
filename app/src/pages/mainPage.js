import React from 'react'
import {useDispatch} from "react-redux";
import styled from "styled-components";

import {moveToManageExercises, moveToWorkout} from "../reducers/uiStateReducer";
import TemplateWorkouts from "../components/templateWorkouts";
import History from "../components/history";

const ManageExercisesButton = styled.button`
    margin-top: 20px;
`

function MainPage() {
    const dispatch = useDispatch()

    const newBlankWorkout = () => {
        dispatch(moveToWorkout())
    }

    const clickManageExercises = () => {
        dispatch(moveToManageExercises())
    }

    return (
        <div>
            <button onClick={newBlankWorkout}>New blank workout</button>
            <TemplateWorkouts />
            <History />

            <ManageExercisesButton onClick={clickManageExercises}>Manage Exercises</ManageExercisesButton>
        </div>
    )
}

export default MainPage;