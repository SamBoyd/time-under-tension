import React from 'react'

import {useDispatch, useSelector} from "react-redux";
import {removeExercise, selectExercises} from "../reducers/exercisesReducer";
import {moveToAddExercise, moveToMainPage} from "../reducers/uiStateReducer";
import {Button, FlatList, ScrollView, Text, View} from "react-native";

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
        return <View>
            <Text>{name}</Text>
            <Button onPress={removeExerciseId(id)} title="remove"/>
        </View>
    }

    return (
        <ScrollView nestedScrollEnabled>
            <Button onPress={back} title="back"/>
            <Text>Manage Exercises</Text>

            {sortedExercises.map(({title, data}) => {
                return <View>
                    <Text>{title}</Text>
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
