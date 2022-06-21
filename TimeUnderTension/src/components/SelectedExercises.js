import React from 'react'
import {FlexColumnView, FlexRowView} from "./styled/view";
import {Pressable, View} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {TextNormal} from "./styled/text";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import theme, {standardVerticalPadding} from "../theme";

const SelectedExercises = props => {

    const styles = {
        container: {
            rowGap: hp(1),
            marginTop: hp(3),
            paddingBottom: standardVerticalPadding,
        },

        row: {
            marginLeft: wp(5),
            // verticalAlign: 'center',
        },

        removeIcon: {
            ...theme.Icon
        },

        iconWrapper: {
            // marginHorizontal: wp(1),
            justifyContent: 'center',
        },

        nameWrapper: {
            paddingHorizontal: wp(3),
            justifyContent: 'center',
        },

        name: {}
    }

    if (props.exercises.length > 0) {
        return <FlexColumnView viewStyle={styles.container} rowGap={styles.container.rowGap}>
            {props.exercises.map((ex, i) =>
                <FlexRowView key={i} viewStyle={styles.row}>
                    <Pressable onPress={props.deselectExercise(ex)}>
                        <View style={styles.iconWrapper}>
                            <MaterialIcons name="highlight-remove" {...styles.removeIcon}/>
                        </View>
                    </Pressable>
                    <View style={styles.nameWrapper}>
                        < TextNormal style={styles.name}>{ex.name}</TextNormal>
                    </View>
                </FlexRowView>
            )}
        </FlexColumnView>
    }

    return <></>
}

export default SelectedExercises