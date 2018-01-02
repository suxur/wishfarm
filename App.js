import React from 'react';
import {AsyncStorage} from 'react-native';
import {Root, StyleProvider} from 'native-base';
import firebase from 'firebase';

import getTheme from './native-base-theme/components'
import createRootNavigation from './navigation/RootNavigation';

let config = {
    apiKey: "AIzaSyBsrVjEUIkEKvnVlF0gZvIKp9Dn75-b3os",
    authDomain: "wishfarm-63f4a.firebaseapp.com",
    databaseURL: "https://wishfarm-63f4a.firebaseio.com",
    projectId: "wishfarm-63f4a",
    storageBucket: "wishfarm-63f4a.appspot.com",
    messagingSenderId: "33131528376"
};

firebase.initializeApp(config);

export default class App extends React.Component {

    state = {
        fontLoaded: false,
        authenticated: false
    };

    async componentWillMount() {
        let vm = this;
        await Promise.all([
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    vm.setState({authenticated: true});
                }
            }),
            Expo.Font.loadAsync({
                'Roboto': require('native-base/Fonts/Roboto.ttf'),
                'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
                'PatrickHand': require('./assets/fonts/PatrickHandSC-Regular.ttf'),
                'Raleway': require('./assets/fonts/Raleway-Bold.ttf')
            }),
            Expo.Asset.loadAsync([
                require('./assets/images/background-day.png'),
                require('./assets/images/background-night.png'),
                require('./assets/logo.png')
            ])
        ]);

        this.setState({fontLoaded: true});
    }

    render() {
        let RootNavigation = createRootNavigation(this.state.authenticated);

        return (
            <StyleProvider style={getTheme()}>
                <Root>
                    {this.state.fontLoaded ? (
                        <RootNavigation/>
                    ) : null}
                </Root>
            </StyleProvider>
        );
    }
}