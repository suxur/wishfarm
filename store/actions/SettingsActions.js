import firebase from "firebase";
import { TOGGLE_PUSH_NOTIFICATIONS, UPDATE_DAYS } from "./types";
import registerForPushNotificationsAsync from "../../api/registerForPushNotificationsAsync";

export const TogglePushNotifications = status => {
    return { type: TOGGLE_PUSH_NOTIFICATIONS, status };
};

export const UpdateDays = days => {
    return { type: UPDATE_DAYS, days };
};

export const SaveDays = days => {
    return dispatch => {
        dispatch(UpdateDays(days));
        update({ days });
    };
};

export const EnablePushNotifications = () => {
    return async dispatch => {
        dispatch(TogglePushNotifications(true));

        let token = await registerForPushNotificationsAsync();

        if (token) {
            update({
                push_notifications: true,
                token
            });
            return true;
        } else {
            dispatch(TogglePushNotifications(false));
            return false;
        }
    };
};

export const DisablePushNotifications = () => {
    return dispatch => {
        dispatch(TogglePushNotifications(false));

        update({
            push_notifications: false,
            token: null
        });
    };
};

const update = data => {
    const { uid } = firebase.auth().currentUser;

    data["updated_at"] = new Date();

    const ref = firebase.database().ref(`users/${uid}`);

    ref.child("settings").update(data);
};
