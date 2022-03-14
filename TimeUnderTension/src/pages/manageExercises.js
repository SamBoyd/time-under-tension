import React from 'react'

import {useDispatch, useSelector} from "react-redux";
import {removeExercise, selectExercises} from "../reducers/exercisesReducer";
import {moveToAddExercise, moveToMainPage} from "../reducers/uiStateReducer";
import {FlatList, ScrollView, View} from "react-native";
import {TextBold, TextNormal} from "../components/styled/text";
import {Button} from "../components/styled/button";
import {Icon} from "react-native-elements";
import {FlexRowView} from "../components/styled/view";

const ManageExercises = () => {
    const dispatch = useDispatch()
    const exercises = useSelector(selectExercises)

    const back = () => {
        dispatch(moveToMainPage())
    }

    const addExercise = () => {
        dispatch(moveToAddExercise())
    }

    const removeExerciseId = exerciseId => () => {
        dispatch(removeExercise({id: exerciseId}))
    }

    const sortedExercises = []
    exercises.categories.forEach(cat => {
        sortedExercises.push({'title': cat, 'data': exercises.exercises.filter(e => e.category === cat)})
    })

    const Item = ({id, name, category}) => {
        return <FlexRowView>
            <TextNormal>{name}</TextNormal>
            <Icon name='delete' onPress={removeExerciseId(id)} title="remove"/>
        </FlexRowView>
    }

    return (
        <ScrollView nestedScrollEnabled>
            <Button onPress={back} title="back"/>
            <TextBold>Manage Exercises</TextBold>

            {sortedExercises.map(({title, data}) => {
                return <View>
                    <TextBold>{title}</TextBold>
                    <FlatList
                    nestedScrollEnabled
                    data={data}
                    renderItem={({item}) => <Item id={item.id} name={item.name} category={item.category}/>}
                    keyExtractor={item => item.id}
                />
                </View>
            })}

            <Button onPress={addExercise} title="Add Exercise"/>
        </ScrollView>
    )
}

export default ManageExercises
