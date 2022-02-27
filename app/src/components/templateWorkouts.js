import React from 'react'
import {useDispatch, useSelector} from "react-redux";

import {moveToCreateTemplate} from "../reducers/uiStateReducer";
import {selectTemplateWorkout} from "../reducers/templateWorkoutReducer";
import TemplateWorkoutTile from "./TemplateWorkoutTile";
import styled from "styled-components";


const Wrapper = styled.div `
 margin-top: 10px;
`
const TemplatesWrapper = styled.div` 
    display: flex;
    flex-direction: column;
    row-gap: 10px;

    margin-top: 10px;
    margin-bottom: 10px;
`

const TemplateWorkouts = () => {
    const dispatch = useDispatch()
    const templateWorkouts = useSelector(selectTemplateWorkout)

    const createTemplate = () => {
        dispatch(moveToCreateTemplate())
    }

    return (
        <Wrapper>
            <label>Template workouts</label>
            <TemplatesWrapper>
                {templateWorkouts.templates.map((template, index) => {
                    return <TemplateWorkoutTile key={index} template={template} />
                })}
            </TemplatesWrapper>
            <div>
                <button onClick={createTemplate}>Create new template</button>
            </div>
        </Wrapper>
    )
}

export default TemplateWorkouts
