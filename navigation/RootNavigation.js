import React, { Component } from "react";
import { connect } from "react-redux";
import { addNavigationHelpers, SwitchNavigator } from "react-navigation";
import {
    createReactNavigationReduxMiddleware,
    createReduxBoundAddListener
} from "react-navigation-redux-helpers";
import AuthNavigator from "./AuthNavigation";
import SidebarNavigation from "./SidebarNavigation";
import { LoadingScreen } from "../screens";

const RootStackNavigator = SwitchNavigator({
    LoadingScreen: {
        screen: LoadingScreen
    },
    AuthNav: {
        screen: AuthNavigator
    },
    AppNav: {
        screen: SidebarNavigation,
        navigationOptions: {
            gesturesEnabled: false
        }
    }
});

const INITIAL_STATE = null;

export const RootNavigationReducer = (state = INITIAL_STATE, action) => {
    const nextState = RootStackNavigator.router.getStateForAction(
        action,
        state
    );
    // Simply return the original `state` if `nextState` is null or undefined.
    return nextState || state;
};

export const RootNavigationMiddleware = createReactNavigationReduxMiddleware(
    "root",
    state => state.nav
);

const addListener = createReduxBoundAddListener("root");

class RootNavigator extends Component {
    render() {
        return (
            <RootStackNavigator
                navigation={addNavigationHelpers({
                    dispatch: this.props.dispatch,
                    state: this.props.nav,
                    addListener
                })}
            />
        );
    }
}

const mapStateToProps = state => ({
    nav: state.nav
});

export default connect(mapStateToProps)(RootNavigator);
