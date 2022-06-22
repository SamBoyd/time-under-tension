import React from 'react'
import {useSelector} from "react-redux";
import {StyleSheet, View} from "react-native";

import {selectHistory} from "../reducers/workoutHistoryReducer";
import {loadWorkByIds} from "../utils/stateUtils";

import dateFormat from "dateformat";
import {TextH1, TextLighter, TextNormal} from "../components/styled/text";
import {FlexRowView} from "../components/styled/view";
import theme, {standardVerticalPadding} from "../theme";
import {selectWork} from "../reducers/workReducer";
import BasePage from "../components/basePage";

const styles = StyleSheet.create({
    wrapper: {
        paddingVertical: standardVerticalPadding,
    },

    row: {
        flexDirection: "row",
    },

    tile: {
        marginTop: standardVerticalPadding,
        backgroundColor: theme.colors.grey0,
        borderRadius: theme.borderRadius,
        padding: theme.internalPadding,
    }
});

const HistoryTile = props => {
    const workState = useSelector(selectWork)

    const work = loadWorkByIds(props.work, workState)
    return (
        <View style={styles.tile}>
            <FlexRowView>
                <TextNormal>{props.name}</TextNormal>
                <TextLighter className="date"> - {dateFormat(props.finished_at, 'ddd, dS mmmm yyyyr')}</TextLighter>
            </FlexRowView>
            {work.map((w, i) =>
                <TextLighter key={i}>{w.exercise.name} - {w.sets.length} sets</TextLighter>
            )}
        </View>
    )
}

const NoHistoryTile = <View style={styles.tile}>
    <FlexRowView>
        <TextNormal>There is no history</TextNormal>
    </FlexRowView>
</View>

const History = () => {
    const history = useSelector(selectHistory)

    const sortedHistory = [...history].sort((a, b) => new Date(a.finished_at) > new Date(b.finished_at)).reverse()

    return (
        <BasePage>
            <View style={styles.wrapper}>
                <TextH1>History</TextH1>

                {history.length > 0 && (
                    sortedHistory.map((workout, i) => <HistoryTile key={i} {...workout}/>)
                ) || (
                    NoHistoryTile
                )}
            </View>
        </BasePage>
    )
}

export default History
