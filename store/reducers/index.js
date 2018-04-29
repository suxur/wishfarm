import { combineReducers } from "redux";
import app from "./AppReducer";
import wishes from "./WishReducer";
import settings from "./SettingsReducer";
import { RootNavigationReducer } from "../../navigation/RootNavigation";

export default combineReducers({
    nav: RootNavigationReducer,
    app,
    settings,
    wishes
});
