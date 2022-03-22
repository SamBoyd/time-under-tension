import React from 'react'

import {useDispatch, useSelector} from "react-redux";
import {removeExercise, selectExercises} from "../reducers/exercisesReducer";
import {moveToAddExercise, moveToMainPage} from "../reducers/uiStateReducer";
import {FlatList, ScrollView, View, StyleSheet, Dimensions} from "react-native";
import {TextBold, TextH1, TextNormal} from "../components/styled/text";
import {Button} from "../components/styled/button";
import {Divider, Icon} from "react-native-elements";
import {FlexRowView} from "../components/styled/view";
import Header from "../components/header";

import theme from '../theme'
import {capitalizeFirstLetter} from "../utils/textUtils";
import SafeAreaView from "react-native/Libraries/Components/SafeAreaView/SafeAreaView";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const ManageExercises = () => {
    const dispatch = useDispatch()
    const exercises = useSelector(selectExercises)

    const goBack = () => {
        dispatch(moveToMainPage())
    }

    const addExercise = () => {
        dispatch(moveToAddExercise())
    }

    const removeExerciseId = exerciseId => () => {
        dispatch(removeExercise({id: exerciseId}))
    }

    const styles = StyleSheet.create({
        wrapperView: {
            width: windowWidth,
            // height: windowHeight,
            flex: 1,
        },
        header: {
            title: {
                color: theme.colors.tertiary
            }
        },

        scrollWrapper: {
            flex:1,
            paddingLeft: 20,
            paddingTop: 10,
            paddingRight: 20,
            backgroundColor: theme.colors.tertiary
        },
        containerView: {
            containerStyle: {
            },
            containerContentStyle: {
            },
        },

        subsection: {
            marginTop: 10,
            marginBottom: 10,
            header: {
                marginBottom: 5,
            },
        },

        item: {
            marginTop: 5,
            marginLeft: 10,
            alignItems: "center",
            icon: {
                position: "absolute",
                right: 40,
                size: 14
            }
        },

        addButton: {
            marginTop: 20,
            justifyContent: "center",
            marginBottom: 100,
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
        <SafeAreaView style={styles.wrapperView}>
            <Header
                leftComponent={<Button onPress={goBack} title="back" containerStyle={styles.backButton}/>}
                centerComponent={<TextH1 style={styles.header.title}>Managing Exercises</TextH1>}
            />

            <View style={styles.scrollWrapper}>
                <ScrollView
                    style={styles.containerView.containerStyle}
                    contentContainerStyle={styles.containerView.containerContentStyle}
                >
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
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default ManageExercises
