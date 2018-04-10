import React, { Component } from "react";
import { Provider } from "react-redux";
import firebase from "firebase";
import { Root, StyleProvider } from "native-base";
import { AppLoading, Asset, Font } from "expo";
import { PersistGate } from "redux-persist/integration/react";
import getTheme from "./native-base-theme/components";
import RootNavigation from "./navigation/RootNavigation";
import { persistor, store } from "./store";
import NavigationService from "./navigation/NavigationService";

const config = {
    apiKey: "AIzaSyBsrVjEUIkEKvnVlF0gZvIKp9Dn75-b3os",
    authDomain: "wishfarm-63f4a.firebaseapp.com",
    databaseURL: "https://wishfarm-63f4a.firebaseio.com",
    projectId: "wishfarm-63f4a",
    storageBucket: "wishfarm-63f4a.appspot.com",
    messagingSenderId: "33131528376"
};

firebase.initializeApp(config);

function cacheImages(images) {
    return images.map(image => {
        return Asset.fromModule(image).downloadAsync();
    });
}

function cacheFonts(fonts) {
    return fonts.map(font => Font.loadAsync(font));
}

export let navigation;

class App extends Component {
    state = { isReady: false };

    componentDidMount() {
        navigation = this.navigator;
    }

    async _loadAssetsAsync() {
        const imageAssets = cacheImages([
            require("./assets/images/background-day.png"),
            require("./assets/images/background-night.png"),
            require("./assets/images/logo.png"),
            require("./assets/images/barn.png"),
            require("./assets/images/corn.png")
        ]);

        const fontAssets = cacheFonts([
            {
                PatrickHand: require("./assets/fonts/PatrickHandSC-Regular.ttf")
            },
            { Raleway: require("./assets/fonts/Oxygen-Bold.ttf") }
        ]);

        await Promise.all([...imageAssets, ...fontAssets]);
    }

    render() {
        if (!this.state.isReady) {
            return (
                <AppLoading
                    startAsync={this._loadAssetsAsync}
                    onFinish={() => {
                        this.setState({ isReady: true });
                    }}
                />
            );
        } else {
            return (
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                        <StyleProvider style={getTheme()}>
                            <Root>
                                <RootNavigation
                                    ref={navigatorRef => {
                                        NavigationService.setTopLevelNavigator(
                                            navigatorRef
                                        );
                                    }}
                                />
                            </Root>
                        </StyleProvider>
                    </PersistGate>
                </Provider>
            );
        }
    }
}

export default App;
