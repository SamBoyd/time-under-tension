import React from 'react'
import {StyleSheet, View} from "react-native"
import {Overlay} from "@rneui/base";
import {TextBold, TextNormal} from "./styled/text";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';

import theme, {standardHorizontalPadding, standardVerticalPadding} from '../theme';
import {FlexColumnView, FlexRowView} from "./styled/view";
import {useDispatch} from "react-redux";
import {Button} from "./styled/button";


const _ = require('lodash')


const EditWarmupSetOverlay = props => {
    const dispatch = useDispatch()

    const styles = StyleSheet.create({
        container: {
            width: wp(80),
            paddingHorizontal: standardHorizontalPadding,
            borderWidth: 1,
            borderColor: theme.colors.grey1,
            borderRadius: theme.borderRadius,
        },

        title: {
            container: {
                height: hp(10),
                justifyContent: 'center',
                borderBottomWidth: 1,
                borderBottomColor: theme.colors.grey1,
            },

            wrapper: {
                justifyContent: 'space-between',
                alignItems: 'center',
            }
        },

        bottomButton: {
            marginVertical: standardVerticalPadding,
        }
    })

    const backdropPress = () => {
        props.toggleShowEditSet()
    }

    const removeSetPress = () => {
        props.fireRemoveSet(props.id)
        props.toggleShowEditSet()
    }

    return <Overlay
        overlayStyle={styles.container}
        isVisible={props.visible}
        onBackdropPress={backdropPress}
    >
        <View style={styles.title.container}>
            <FlexRowView viewStyle={styles.title.wrapper}>
                <FlexColumnView>
                    <TextBold>{props.workName}</TextBold>
                    <TextNormal>Warm-up set #{props.setIndex}</TextNormal>
                </FlexColumnView>
                {/*<Button*/}
                {/*    onPress={backdropPress}*/}
                {/*    title="Close"*/}
                {/*    containerStyle={styles.saveButton}*/}
                {/*/>*/}
            </FlexRowView>
        </View>

        <Button
            title="Remove warm-up set"
            containerStyle={styles.bottomButton}
            onPress={removeSetPress}
        />

    </Overlay>
}

export default EditWarmupSetOverlay
