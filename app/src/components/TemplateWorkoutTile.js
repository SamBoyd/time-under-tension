import React from 'react'
import styled from "styled-components";
import {useDispatch} from "react-redux";
import {createWorkoutFromTemplateAndMoveToWorkout, moveToEditTemplate} from "../reducers/actions";


const Tile = styled.div`
    width: 50%;
    margin-left: auto;
    margin-right: auto;
`

const TileHeader = styled.span`
  
`

const WorkList = styled.ul `
    list-style-type: none; /* Remove bullets */
    padding: 0; /* Remove padding */
    margin: 0; /* Remove margins */
`

const Work = styled.li`
    font-weight: lighter;
`

const Edit = styled.label`
    font-weight: lighter;
`

const TemplateWorkoutTile = props => {
    const dispatch = useDispatch()

    const editTemplate = () => {
        moveToEditTemplate(dispatch, props.template.id)
    }

    const startWorkoutFromTemplate = () => {
        createWorkoutFromTemplateAndMoveToWorkout(dispatch, props.template)
    }

    return (
        <Tile>
            <TileHeader><span onClick={startWorkoutFromTemplate}>{props.template.name}</span> <Edit onClick={editTemplate}>edit</Edit></TileHeader>
            <WorkList>
                {props.template.work.map((work, index) => {
                    return <Work key={index}>{work.exercise.name} - {work.sets.length} sets</Work>
                })}
            </WorkList>
        </Tile>
    )
}

export default TemplateWorkoutTile