import React from 'react';
import type {Node} from 'react';
import {Provider} from "react-redux";
import {
    useColorScheme, View,
} from 'react-native';

import {SafeAreaProvider} from "react-native-safe-area-context/src/SafeAreaContext";
import {ThemeProvider} from "react-native-elements";
import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';

import MainApp from './src/App'
import store from "./src/store";
import theme from './src/theme'

const App = () => {
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    return (
        <React.StrictMode>
            <Provider store={store}>
                <SafeAreaProvider>
                    <ThemeProvider theme={theme}>
                        <MainApp/>
                    </ThemeProvider>
                </SafeAreaProvider>
            </Provider>
        </React.StrictMode>
    );
};

export default App;
