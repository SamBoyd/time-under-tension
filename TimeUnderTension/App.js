import React from 'react';
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {SafeAreaView, useColorScheme} from 'react-native';

import {Colors,} from 'react-native/Libraries/NewAppScreen';

import MainApp from './src/App'
import store, {persistor} from "./src/store";
import {NavigationContainer} from "@react-navigation/native";
import {SelectProvider} from "@mobile-reality/react-native-select-pro/src/components/select-provider";
import Payments from "./src/payments";
import type {Node} from 'react';

const App = () => {
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    return (
        <React.StrictMode>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Payments>
                        <NavigationContainer>
                            <SelectProvider>
                                <SafeAreaView style={{flex: 1}}>
                                    <MainApp/>
                                </SafeAreaView>
                            </SelectProvider>
                        </NavigationContainer>
                    </Payments>
                </PersistGate>
            </Provider>
        </React.StrictMode>
    );
};

export default App;
