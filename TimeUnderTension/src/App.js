import React from 'react'

import {PAGE} from './constants';
import MainPage from "./pages/mainPage";
import {StyleSheet} from "react-native";
import {Icon} from "react-native-elements";
import theme from "./theme";
import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'

import Octicons from "react-native-vector-icons/Octicons";
import Settings from "./pages/Settings";
import Analytics from "./pages/analytics";
import History from './pages/history';

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
                        case 'Settings':
                            icon = <Ionicons name="ios-settings-outline" color={color} size={size}/>
                            break;
                        case 'Analytics':
                            icon = <MaterialCommunityIcon name="google-analytics" color={color} size={size}/>
                            break;
                        case 'History':
                            icon = <Octicons name="checklist" color={color} size={size}/>
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
            {HeaderOption(PAGE.settings, 'Settings', Settings)}
            {HeaderOption(PAGE.analytics, 'Analytics', Analytics)}
            {HeaderOption(PAGE.main, 'Home', MainPage)}
            {HeaderOption(PAGE.history, 'History', History)}
        </Tab.Navigator>
    )
}

export default App;
