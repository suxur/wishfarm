import firebase from "firebase";
import {
    LOADING_TRUE,
    LOADING_FALSE,
    WISH_UPDATE,
    WISHES_FETCH_SUCCESS
} from "./types";

export const WishAdd = name => {
    const { currentUser } = firebase.auth();
    return () => {
        let data = {
            uid: currentUser.uid,
            name,
            harvested: false,
            purchased: false,
            created_at: new Date()
        };

        // Get a key for a new Post.
        let key = firebase
            .database()
            .ref()
            .child("wishes")
            .push().key;

        // Write the new post's data simultaneously in the posts list and the user's post list.
        let updates = {};
        updates[`/wishes/${key}`] = data;
        updates[`/user-wishes/${currentUser.uid}/${key}`] = data;

        firebase
            .database()
            .ref()
            .update(updates);
    };
};

export const WishesFetch = () => {
    const { currentUser } = firebase.auth();

    return dispatch => {
        dispatch({ type: LOADING_TRUE });
        firebase
            .database()
            .ref(`user-wishes/${currentUser.uid}`)
            .orderByChild("created_at")
            .on("value", snapshot => {
                dispatch({ type: WISHES_FETCH_SUCCESS, payload: snapshot });
                dispatch({ type: LOADING_FALSE });
            });
    };
};

export const WishSave = wish => {
    const { currentUser } = firebase.auth();

    return () => {
        let { name, harvested, purchased, created_at, _key } = wish;
        let data = {
            uid: currentUser.uid,
            name,
            harvested,
            purchased,
            created_at
        };

        // Write the new post's data simultaneously in the posts list and the user's post list.
        let updates = {};
        updates[`/wishes/${_key}`] = data;
        updates[`/user-wishes/${currentUser.uid}/${_key}`] = data;

        firebase
            .database()
            .ref()
            .update(updates);
    };
};

export const WishDestroy = key => {
    const { currentUser } = firebase.auth();

    return () => {
        firebase
            .database()
            .ref(`/wishes/${key}`)
            .remove();
        firebase
            .database()
            .ref(`/user-wishes/${currentUser.uid}/${key}`)
            .remove();
    };
};
