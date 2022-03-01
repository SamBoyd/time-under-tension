import React from 'react'
import {useSelector, useDispatch} from "react-redux";
import {selectHistory} from "../reducers/historyReducer";
import styled from "styled-components";

import dateFormat, { masks } from "dateformat";


const HistoryTileWrapper = styled.div`
    margin-top: 10px;
  
    .date {
      font-weight: lighter;
    }
  
    .work {
      font-weight: lighter;
    }
`

const HistoryTile = props => {
    return (
        <HistoryTileWrapper>
            <label>{props.name}</label>
            <label className="date"> - {dateFormat(props.created_at, 'ddd, dS mmmm yyyy')}</label>
            {props.work.map((work, i) =>
                <div key={i} className="work">{work.exercise.name} - {work.sets.length} sets</div>
            )}
        </HistoryTileWrapper>
    )
}

const HistoryWrapper = styled.div`
    display: flex;
    flex-direction: column;
  
    row-gap: 10px;
  
    margin-top: 50px;
`

const HistoryTitle = styled.label`
    
`

const History = () => {
    const history = useSelector(selectHistory)

    return (
        <HistoryWrapper>
            <HistoryTitle>History</HistoryTitle>
            {history.map((workout, i) => <HistoryTile key={i} {...workout}/>)}
        </HistoryWrapper>
    )
}

export default History
