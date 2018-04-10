import firebase from "firebase";
import { NavigationActions } from "react-navigation";
import {
    AUTH_CHANGE,
    LOADING_TRUE,
    LOADING_FALSE,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    NAV_LOGIN,
    NAV_LOGOUT,
    SIDEBAR_OPEN,
    SIDEBAR_CLOSE
} from "./types";
import { navigation } from "../../App";
import Notification from "../../components/Notification";

const navigate = route => {
    return NavigationActions.navigate({
        routeName: route
    });
};

export const LoadingTrue = () => {
    return { type: LOADING_TRUE };
};

export const LoadingFalse = () => {
    return { type: LOADING_FALSE };
};

export const Route = route => {
    return dispatch => {
        dispatch(navigate(route));
    };
};

export const Login = (email, password) => {
    return dispatch => {
        dispatch({ type: LOADING_TRUE });
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(function(user) {
                // set user and navigate
                dispatch({ type: LOGIN_SUCCESS, user });
                dispatch(navigate("AppNav"));
            })
            .catch(function(error) {
                // set error
                dispatch({ type: LOGIN_ERROR, error: error.message });
            });
    };
};

export const Logout = () => {
    return dispatch => {
        firebase
            .auth()
            .signOut()
            .then(function() {
                dispatch({ type: NAV_LOGOUT });
            });
    };
};

export const Register = (email, password, password_confirmation) => {
    return dispatch => {
        if (!email) {
            Notification.show("Email cannot be empty!");
        } else if (!password) {
            Notification.show("Password cannot be empty!");
        } else if (password !== password_confirmation) {
            Notification.show("Passwords do not match!");
        } else {
            dispatch({ type: LOADING_TRUE });
            firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then(function(user) {
                    // set user and navigate
                    dispatch({ type: LOGIN_SUCCESS, user });
                    dispatch({ type: NAV_LOGIN });
                })
                .catch(function(error) {
                    // set error
                    dispatch({ type: LOADING_FALSE });
                    Notification.show(error.message);
                });
        }
    };
};


export const Init = () => {
    return dispatch => {
        firebase.auth().onAuthStateChanged(user => {
            dispatch({ type: AUTH_CHANGE, user });
        });
    };
};
