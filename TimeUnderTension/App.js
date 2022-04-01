import React from 'react';
import type {Node} from 'react';
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {
    useColorScheme, View,
} from 'react-native';

import {SafeAreaProvider} from "react-native-safe-area-context/src/SafeAreaContext";

import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';

import MainApp from './src/App'
import store, {persistor} from "./src/store";
import theme from './src/theme'
import {ThemeProvider} from "@rneui/themed";

const App = () => {
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    return (
        <React.StrictMode>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <SafeAreaProvider>
                        <ThemeProvider theme={theme}>
                            <MainApp/>
                        </ThemeProvider>
                    </SafeAreaProvider>
                </PersistGate>
            </Provider>
        </React.StrictMode>
    );
};

export default App;
