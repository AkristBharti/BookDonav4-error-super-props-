import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import BookRequestScreen from '../screens/BookRequestScreen';
import DonateBookScreen from '../screens/DonateBookScreen';
import { AppStackNavigator } from './AppStackNavigator';

export const AppTabNavigator = createBottomTabNavigator({

    DonateBooks : {screen : AppStackNavigator, navigationOptions : {tabBarLabel : 'Donate'}},
    BookRequest : {screen : BookRequestScreen, navigationOptions : {tabBarLabel : 'Request'}},

})

