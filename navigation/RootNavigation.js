import React from 'react';
import {Animated, Easing} from 'react-native';
import {StackNavigator} from 'react-navigation';
import AuthNavigator from './AuthNavigator';
import DrawerNavigation from './DrawerNavigation';

export default createRootStackNavigator = (authenticated = false) => {
    return RootStackNavigator = StackNavigator(
        {
            AuthNavigator: {
                screen: AuthNavigator
            },
            Drawer: {
                screen: ({navigation}) => <DrawerNavigation screenProps={{rootNavigation: navigation}}/>,
                navigationOptions: {
                    gesturesEnabled: false
                }
            }
        },
        {
            headerMode: 'none',
            initialRouteName: authenticated ? 'Drawer' : 'AuthNavigator',
            transitionConfig: () => ({
                transitionSpec: {
                    duration: 0,
                    timing: Animated.timing,
                    easing: Easing.step0
                }
            })
        }
    );
};

