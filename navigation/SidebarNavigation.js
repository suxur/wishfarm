import React from "react";
import { DrawerNavigator } from "react-navigation";
import ListNavigation from "./ListNavigation";
import SideBar from "../screens/SidebarScreen";
import SettingsScreen from "../screens/SettingsScreen";

const SidebarDrawerNavigation = DrawerNavigator(
    {
        List: {
            screen: ListNavigation
        },
        Settings: {
            screen: SettingsScreen
        }
    },
    {
        contentComponent: props => <SideBar {...props} />,
        drawerOpenRoute: "DrawerOpen",
        drawerCloseRoute: "DrawerClose",
        drawerToggleRoute: "DrawerToggle",
        contentOptions: {
            activeTintColor: "#fffbfa",
            activeBackgroundColor: '#3f4468',
            inactiveTintColor: "#fffbfa",
            itemsContainerStyle: {
                marginVertical: 0
            },
            iconContainerStyle: {
                opacity: 1
            }
        }
    }
);

export default SidebarDrawerNavigation;
