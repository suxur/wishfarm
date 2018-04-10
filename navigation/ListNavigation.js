import React, { Component } from "react";
import { StackNavigator } from "react-navigation";
import { Icon } from "native-base";
import { ListScreen } from "../screens";
import AddWish from "../screens/AddWishScreen";
import ShowWishScreen from "../screens/ShowWishScreen";
import EditWishScreen from "../screens/EditWishScreen";

const ListStackNavigator = StackNavigator(
    {
        List: {
            screen: ListScreen
        },
        AddWish: {
            screen: AddWish
        },
        ShowWishScreen: {
            path: "wishes/:wish",
            screen: ShowWishScreen
        },
        EditWishScreen: {
            path: "wishes/:wish",
            screen: EditWishScreen
        }
    },
    {
        headerMode: "none",
        navigationOptions: () => ({
            title: "Your Farm",
            drawerIcon: <Icon name="leaf" active={true} style={{color: "#fffbfa"}}/>,
        })
    }
);

export default ListStackNavigator;
