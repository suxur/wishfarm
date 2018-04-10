import moment from "moment";
import { WISHES_FETCH_SUCCESS, RESET } from "../actions/types";

const INITIAL_STATE = {
    growing: [],
    harvest: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case WISHES_FETCH_SUCCESS:
            let growing = [];
            let harvest = [];

            action.payload.forEach(child => {
                let { name, harvested, purchased, created_at } = child.val();
                let now = moment();
                let created = moment(created_at);

                let wish = {
                    name,
                    harvested,
                    purchased,
                    created_at,
                    days: now.diff(created, "days"),
                    _key: child.key
                };

                if (harvested) {
                    harvest.push(wish);
                } else {
                    growing.push(wish);
                }
            });

            return { harvest, growing };
        case RESET:
            return INITIAL_STATE;
        default:
            return state;
    }
};
