import React from 'react';
import {DrawerNavigator} from 'react-navigation';

import SideBar from '../Components/Sidebar';
import List from './List';

const Drawer = DrawerNavigator(
    {
        List: {screen: List}
    },
    {
        initialRouteName: 'List',
        contentOptions: {
            activeTintColor: "#e91e63"
        },
        contentComponent: props => <SideBar {...props} />,
        drawerOpenRoute: 'DrawerOpen',
        drawerCloseRoute: 'DrawerClose',
        drawerToggleRoute: 'DrawerToggle'
    }
);

export default Drawer;
