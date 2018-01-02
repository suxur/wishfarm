import React from 'react';
import {StackNavigator} from 'react-navigation';
import List from '../screens/ListScreen';
import AddWish from '../screens/AddWishScreen';

const ListStackNavigator = StackNavigator(
    {
        List: {
            screen: List,
        },
        AddWish: {
            screen: AddWish,
        },
    },
    {
        headerMode: 'none'
    }
);

export default ListStackNavigator;
