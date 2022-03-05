import React from 'react'
import styled from "styled-components";

import {useDispatch, useSelector} from "react-redux";
import {removeExercise, selectExercises} from "../reducers/exercisesReducer";
import {moveToAddExercise, moveToMainPage} from "../reducers/uiStateReducer";

const PageTitle = styled.h3`
`

const CategoryHeader = styled.div`
    
`

const CategoryExerciseList = styled.div`
    margin: auto;
`

const CategoryExerciseListItem = styled.div`
    margin: auto;
    font-weight: lighter;
`

const AddExercise = styled.button`
    margin-top: 20px;
`

const Category = (props) => {
    const dispatch = useDispatch()

    if (props.exercises.length === 0) {
        return <></>
    }

    const removeExerciseId = exerciseId => () => {
        dispatch(removeExercise({id: exerciseId}))
    }

    return (
        <div>
            <CategoryHeader>{props.name}</CategoryHeader>
            <CategoryExerciseList>
                {props.exercises.map((ex, i) => {
                    return <CategoryExerciseListItem key={i}>
                        {ex.name}<button onClick={removeExerciseId(ex.id)}>remove</button>
                    </CategoryExerciseListItem>
                })}
            </CategoryExerciseList>
        </div>
    )
}

const ManageExercises = () => {
    const dispatch = useDispatch()
    const exercises = useSelector(selectExercises)

    const back = () => {
        dispatch(moveToMainPage())
    }

    const addExercise = () => {
        dispatch(moveToAddExercise())
    }

    const sortedExercises = {}
    exercises.categories.forEach(cat => {
        sortedExercises[cat] = exercises.exercises.filter(e => e.category === cat)
    })

    return (
        <div>
            <button onClick={back}>back</button>
            <PageTitle>Manage Exercises</PageTitle>

            {Object.keys(sortedExercises).map((cat, i) => <Category key={i} name={cat} exercises={sortedExercises[cat]}/>)}

            <AddExercise onClick={addExercise}>Add Exercise</AddExercise>
        </div>
    )
}

export default ManageExercises