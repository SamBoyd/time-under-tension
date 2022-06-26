import React, {useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {Pressable, StyleSheet, View} from "react-native";

import {deleteHistory as deleteHistoryAction, selectHistory} from "../reducers/workoutHistoryReducer";
import {loadWorkByIds} from "../utils/stateUtils";

import dateFormat from "dateformat";
import {TextH1, TextLighter, TextNormal} from "../components/styled/text";
import {FlexRowView} from "../components/styled/view";
import theme, {standardHorizontalPadding, standardVerticalPadding} from "../theme";
import {selectWork} from "../reducers/workReducer";
import BasePage from "../components/basePage";
import {Overlay} from "react-native-elements";
import {Button} from "../components/styled/button";
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    wrapper: {
        paddingVertical: standardVerticalPadding,
    },

    row: {
        flexDirection: "row",
    },

    tile: {
        marginTop: standardVerticalPadding,
        // marginBottom: standardVerticalPadding,
        backgroundColor: theme.colors.grey0,
        borderRadius: theme.borderRadius,
        padding: theme.internalPadding,
    },

    historyOverlay: {
        container: {
            backgroundColor: theme.colors.tertiary,
            paddingHorizontal: standardHorizontalPadding,
            borderWidth: 1,
            borderColor: theme.colors.grey1,
            borderRadius: theme.borderRadius,
        },

        backdropStyle: {
            backgroundColor: 'rgba(20, 14, 8, 0.8)',
        },

        deleteButtonContainer: {
            marginTop: hp(3),
        }
    }
});

const HistoryTile = props => {
    const workState = useSelector(selectWork)
    const dispatch = useDispatch()
    const [overlayVisible, setOverlayVisible] = useState(false)
    const work = loadWorkByIds(props.work, workState)

    const toggleOverlay = () => setOverlayVisible(!overlayVisible)
    const deleteHistory = () => {
        dispatch(deleteHistoryAction({id: props.id}))
        toggleOverlay()
    }

    return (
        <>
            <Pressable
                onPress={toggleOverlay}>
                <View style={styles.tile}>
                    <FlexRowView>
                        <TextNormal>{props.name}</TextNormal>
                        <TextLighter className="date"> - {dateFormat(props.finished_at, 'ddd, dS mmmm yyyyr')}</TextLighter>
                    </FlexRowView>
                    {work.map((w, i) =>
                        <TextLighter key={i}>{w.exercise.name} - {w.sets.length} sets</TextLighter>
                    )}
                </View>
            </Pressable>
            <Overlay isVisible={overlayVisible}
                     overlayStyle={styles.historyOverlay.container}
                     backdropStyle={styles.historyOverlay.backdropStyle}
                     onBackdropPress={toggleOverlay}
            >
                <View style={styles.tile}>
                    <FlexRowView>
                        <TextNormal>{props.name}</TextNormal>
                        <TextLighter className="date"> - {dateFormat(props.finished_at, 'ddd, dS mmmm yyyyr')}</TextLighter>
                    </FlexRowView>
                    {work.map((w, i) =>
                        <TextLighter key={i}>{w.exercise.name} - {w.sets.length} sets</TextLighter>
                    )}
                </View>
                <Button
                    onPress={deleteHistory}
                    containerStyle={styles.historyOverlay.deleteButtonContainer}
                    title="Delete"
                />
            </Overlay>
        </>
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
