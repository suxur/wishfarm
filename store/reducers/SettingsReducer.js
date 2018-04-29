import {
    RESET,
    TOGGLE_PUSH_NOTIFICATIONS,
    UPDATE_DAYS
} from "../actions/types";

const INITIAL_STATE = {
    days: "30",
    push_notifications: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UPDATE_DAYS: {
            let days = action.days.replace(/[^0-9]/g, "");
            days = days || "30";

            return { ...state, days };
        }
        case TOGGLE_PUSH_NOTIFICATIONS:
            return { ...state, push_notifications: action.status };
        case RESET:
            return INITIAL_STATE;
        default:
            return state;
    }
};
