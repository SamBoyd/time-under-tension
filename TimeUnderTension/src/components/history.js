import React from 'react'
import {useSelector, useDispatch} from "react-redux";
import {selectHistory} from "../reducers/historyReducer";
import styled from "styled-components";

import dateFormat, { masks } from "dateformat";
import {StyleSheet, View} from "react-native";
import {Header, Text} from "react-native-elements";
import {TextH1, TextLighter, TextNormal} from "./styled/text";
import {FlexRowView} from "./styled/view";

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: 20,
    },

    row: {
        flexDirection: "row",
    },

    tile: {
        paddingLeft: 10,
        paddingTop: 5,
        paddingBottom: 5,
    }
});

const HistoryTile = props => {
    return (
        <View style={styles.tile}>
            <FlexRowView>
                <TextNormal>{props.name}</TextNormal>
                <TextLighter className="date"> - {dateFormat(props.created_at, 'ddd, dS mmmm yyyy')}</TextLighter>
            </FlexRowView>
            {props.work.map((work, i) =>
                <TextLighter key={i}>{work.exercise.name} - {work.sets.length} sets</TextLighter>
            )}
        </View>
    )
}

const History = () => {
    const history = useSelector(selectHistory)

    return (
        <View style={styles.wrapper}>
            <TextH1>History</TextH1>

            {history.map((workout, i) => <HistoryTile key={i} {...workout}/>)}
        </View>
    )
}

export default History
