import React from "react";
import { StackNavigator } from "react-navigation";
import Login from "../screens/LoginScreen";
import Register from "../screens/RegisterScreen";

const AuthStackNavigator = StackNavigator(
    {
        Login: {
            screen: Login
        },
        Register: {
            screen: Register
        }
    },
    {
        headerMode: "none",
        mode: "modal"
    }
);

export default AuthStackNavigator;
