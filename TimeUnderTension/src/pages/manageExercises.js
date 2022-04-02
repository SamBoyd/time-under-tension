import React, {useCallback} from 'react'

import {useDispatch, useSelector} from "react-redux";
import {removeExercise, selectExercises} from "../reducers/exercisesReducer";
import {Dimensions, FlatList, StyleSheet, View} from "react-native";
import {TextBold, TextH1, TextNormal} from "../components/styled/text";
import {Button} from "../components/styled/button";
import {Divider, Icon, ThemeProvider} from "react-native-elements";
import {FlexRowView} from "../components/styled/view";

import theme, {standardHorizontalPadding, standardVerticalPadding} from '../theme'
import {capitalizeFirstLetter} from "../utils/textUtils";
import BasePage from "../components/basePage";

import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {PAGE} from "../constants";
import PickExercise from "./pickExercise";
import AddExercise from "./addExercise";
import {useFocusEffect, useScrollToTop} from '@react-navigation/native';


const ManageExercises = ({navigation}) => {
    const dispatch = useDispatch()
    const exercises = useSelector(selectExercises)

    const goBack = () => {
        navigation.goBack()
    }

    const addExercise = () => {
        navigation.push(PAGE.addExercise)
    }

    const removeExerciseId = exerciseId => () => {
        dispatch(removeExercise({id: exerciseId}))
    }

    const styles = StyleSheet.create({
        wrapperView: {
            width: wp(100),
            flex: 1,
        },

        subsection: {
            marginTop: standardVerticalPadding,
            marginBottom: standardVerticalPadding,
            header: {
                marginBottom: hp(1),
            },
        },

        item: {
            marginTop: hp(1),
            marginLeft: standardHorizontalPadding,
            alignItems: "center",
            icon: {
                position: "absolute",
                right: 40,
                size: 14
            }
        },

        addButton: {
            marginTop: standardVerticalPadding,
            justifyContent: "center",
            marginBottom: 200,
        }
    })

    const sortedExercises = []
    exercises.categories.forEach(cat => {
        sortedExercises.push({'title': cat, 'data': exercises.exercises.filter(e => e.category === cat)})
    })

    const Item = ({id, name, category}) => {
        return <FlexRowView viewStyle={styles.item}>
            <TextNormal>{name}</TextNormal>
            <Icon name='delete' onPress={removeExerciseId(id)} title="remove" size={styles.item.icon.size}
                  containerStyle={styles.item.icon}/>
        </FlexRowView>
    }

    return (
        <ThemeProvider theme={theme}>
            <BasePage>
                {sortedExercises.map(({title, data}) => {
                    return (
                        <>
                            <View style={styles.subsection}>
                                <View style={styles.subsection.header}>
                                    <TextBold>{capitalizeFirstLetter(title)}</TextBold>
                                </View>
                                <FlatList
                                    nestedScrollEnabled
                                    data={data}
                                    renderItem={({item}) => <Item id={item.id} name={item.name}
                                                                  category={item.category}/>}
                                    keyExtractor={item => item.id}
                                />
                            </View>
                            <Divider/>
                        </>
                    )
                })}

                <Button
                    onPress={addExercise}
                    title="Add"
                    containerStyle={styles.addButton}
                />
            </BasePage>
        </ThemeProvider>
    )
}


const ManageExercisesNav = ({navigation}) => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                animation: "slide_from_bottom",
            }}
        >
            <Stack.Screen name={PAGE.manageExercises} component={ManageExercises}/>
            <Stack.Screen name={PAGE.addExercise} component={AddExercise}/>
        </Stack.Navigator>
    )
}

export default ManageExercisesNav
