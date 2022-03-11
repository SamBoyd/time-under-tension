import React from 'react'
import {useSelector, useDispatch} from "react-redux";
import {selectHistory} from "../reducers/historyReducer";
import styled from "styled-components";

import dateFormat, { masks } from "dateformat";
import {View} from "react-native";
import {Text} from "react-native-elements";


const HistoryTile = props => {
    return (
        <View>
            <Text>{props.name}</Text>
            <Text className="date"> - {dateFormat(props.created_at, 'ddd, dS mmmm yyyy')}</Text>
            {props.work.map((work, i) =>
                <Text key={i}>{work.exercise.name} - {work.sets.length} sets</Text>
            )}
        </View>
    )
}

const History = () => {
    const history = useSelector(selectHistory)

    return (
        <View>
            <Text>History</Text>
            {history.map((workout, i) => <HistoryTile key={i} {...workout}/>)}
        </View>
    )
}

export default History
