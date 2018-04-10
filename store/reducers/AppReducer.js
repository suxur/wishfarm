import {
    LOADING_TRUE,
    LOADING_FALSE,
    AUTH_CHANGE,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    RESET
} from "../actions/types";

const INITIAL_STATE = {
    user: null,
    error: "",
    loading: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case AUTH_CHANGE:
            return { ...state, user: action.user };
        case LOADING_FALSE:
            return { ...state, loading: false };
        case LOADING_TRUE:
            return { ...state, loading: true };
        case LOGIN_SUCCESS:
            return { ...state, loading: false, user: action.user };
        case LOGIN_ERROR:
            return { ...state, loading: false, error: action.error };
        case RESET:
            return INITIAL_STATE;
        default:
            return state;
    }
};
