import React from 'react';
import {DrawerNavigator} from 'react-navigation';

import SideBar from '../Components/Sidebar';
import ListNavigation from './ListNavigation';
import SettingsScreen from '../screens/SettingsScreen';

const DrawerNavigation = DrawerNavigator(
    {
        List: {screen: ({navigation}) => <ListNavigation screenProps={{rootNavigation: navigation}}/>},
        Settings: {screen: SettingsScreen},
    },
    {
        contentComponent: props => <SideBar {...props} />,
        drawerOpenRoute: 'DrawerOpen',
        drawerCloseRoute: 'DrawerClose',
        drawerToggleRoute: 'DrawerToggle'
    }
);

export default DrawerNavigation;
