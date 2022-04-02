import React from 'react'
import {useSelector} from "react-redux";

import {PAGE} from './constants';
import Workout from "./pages/workout";
import PickExercise from "./pages/pickExercise";
import MainPage from "./pages/mainPage";
import CreateTemplateWorkout from "./pages/createTemplateWorkout";
import ManageExercises from "./pages/manageExercises";
import AddExercise from "./pages/addExercise";
import {SafeAreaView, View} from "react-native";
import {createNativeTabNavigator} from "@react-navigation/native-stack";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {Icon} from "react-native-elements";
import {standardVerticalPadding} from "./theme";
import {StyleSheet} from "react-native";
import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs";
import theme from './theme'
import Ionicons from "react-native-vector-icons/Ionicons";

import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

const styles = StyleSheet.create({
    nav: {
        activeColor: theme.colors.white,
        inactiveColor: theme.colors.grey1,

        bar: {
            backgroundColor: theme.colors.grey0,
        }
    },
    icon: {
        color: theme.colors.white,
        size: 20.
    }
})

function App() {
    const Tab = createMaterialBottomTabNavigator();

    const HeaderOption = (page, name, component) => {
        return <Tab.Screen
            name={page}
            component={component}
            options={{
                title: name,
                tabBarIcon: ({focused, color, size}) => {
                    let icon
                    switch (name) {
                        case 'Home':
                            icon = <Icon name="home" type="feather" color={color} size={size}/>
                            break;
                        case 'Workout':
                            icon = <Icon name="stopwatch" type="entypo" color={color} size={size}/>
                            break;
                        case 'New template':
                            icon = <Icon name="clipboard-notes" type="foundation" color={color} size={size}/>
                            break;
                        case 'Exercises':
                            icon = <FontAwesome5Icon name="dumbbell" color={color} size={size}/>
                            break;
                    }
                    return icon
                },
            }}
        />
    }
    return (
        <Tab.Navigator
            activeColor={styles.nav.activeColor}
            inactiveColor={styles.nav.inactiveColor}
            barStyle={styles.nav.bar}
            screenOptions={{}}
        >
            {HeaderOption(PAGE.main, 'Home', MainPage)}
            {HeaderOption(PAGE.workout, 'Workout', Workout)}
            {HeaderOption(PAGE.createTemplateWorkout, 'New template', CreateTemplateWorkout)}
            {HeaderOption(PAGE.manageExercises, 'Exercises', ManageExercises)}
        </Tab.Navigator>
    )
}

export default App;
