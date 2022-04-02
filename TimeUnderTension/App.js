import React from 'react';
import type {Node} from 'react';
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {
    useColorScheme, SafeAreaView
} from 'react-native';

import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';

import MainApp from './src/App'
import store, {persistor} from "./src/store";
import {NavigationContainer} from "@react-navigation/native";

const App = () => {
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    return (
        <React.StrictMode>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <NavigationContainer>
                        <SafeAreaView style={{flex: 1}}>
                            <MainApp/>
                        </SafeAreaView>
                    </NavigationContainer>
                </PersistGate>
            </Provider>
        </React.StrictMode>
    );
};

export default App;
